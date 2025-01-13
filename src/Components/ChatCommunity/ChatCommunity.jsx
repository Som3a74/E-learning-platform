import React, { useRef, useState } from 'react';
import './ChatCommunity.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { Link, useNavigate } from 'react-router-dom';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2XSg536nW3A4-gR06o7n1XoulppbzDsM",
  authDomain: "chat-e81bd.firebaseapp.com",
  projectId: "chat-e81bd",
  storageBucket: "chat-e81bd.appspot.com",
  messagingSenderId: "393444831636",
  appId: "1:393444831636:web:6ea4d3ee7d7e111b6e9f81",
  measurementId: "G-Q1RPL0TZ1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

function ChatCommunity() {
  const [user] = useAuthState(auth);

  return (
    <main className='bodyChat'>
      <div className="AppChat">
        <header>
          <h3> <Link className='text-decoration-none text-black ms-2' to={'/'}> {'<<'}Back   </Link></h3>
          <SignOut />
        </header>

        <section>
          {user ? <ChatRoom /> : <SignIn />}
        </section>
      </div>
    </main>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  }

  return (
    <>
      <button className="sign-in buttonChat" onClick={signInWithGoogle}>Sign in with Google</button>
      <p className='pChat text-center mx-auto mt-4'>Welcome to Scratch Chat Community Please login With google</p>
    </>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out buttonChat" onClick={() => signOut(auth)}>Sign Out</button>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = collection(db, 'messages');
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }


  return (
    <>
      <main className='mainChat'>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form className='formChat' onSubmit={sendMessage}>
        <input className='inputChat' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type="submit buttonChat" disabled={!formValue}><i className='fa-regular fa-paper-plane text-white cursorPointer ms-3 me-4'></i></button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img className='imgChat' src={photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiZfk_mBRRAnMVpDjIrMbiU5DUxjWeZ5nqRQ&s'} alt="Avatar" />
      <p className='pChat'>{text}</p>
    </div>
  );
}

export default ChatCommunity;