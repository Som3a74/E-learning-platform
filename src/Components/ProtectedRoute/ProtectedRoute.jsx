import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { getToken } from '../../Redux/sliceToken';



export default function ProtectedRoute(props) {

  const {userToken} = useSelector((state)=> state.ApisliceToken);

  useEffect(() => {
    dispatch(getToken())
  }, [])

  const dispatch = useDispatch();

  if (userToken == null && localStorage.getItem('userToken') == null )  {
    console.log('not login');
    return <Navigate to={'/Login' }/>;
  } else {
    // console.log('login');
    // console.log(props.children.type.name)
    return props.children;
  }
}
