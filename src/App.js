import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import Courses from "./Components/Courses/Courses";
import Profile from "./Components/Profile/Profile";
import Quiz from "./Components/Quiz/Quiz";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CourseContent from "./Components/CourseContent/CourseContent";
import Result from "./Components/Quiz/Result";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ConfirmResetPass from "./Components/ConfirmResetPass/ConfirmResetPass";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import TestBank from "./Components/TestBank/TestBank";
import ChatCommunity from "./Components/ChatCommunity/ChatCommunity";
import CreateContent from "./Components/CreateContent/CreateContent";
import { useTranslation } from 'react-i18next';
import { getTrantion } from "./Redux/SliceTransition";
import CreateSubject from "./Components/CreateSubject/CreateSubject";
import AvailableCources from "./Components/AvailableCources/AvailableCources";
import CourseDetails from "./Components/CourseDetails/CourseDetails";
import CreateQuiz from './Components/CreateQuiz/CreateQuiz';

export default function App() {

  const { Lang } = useSelector((state) => state.ApiSliceTransition);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(`${Lang}`)
  }, [Lang])


  const router = createBrowserRouter([
    {
      path: '', element: <Layout t={t} />, children: [
        { index: true, element: <Home t={t} /> },
        { path: '/Login', element: <Login /> },
        { path: '/Register', element: <Register /> },
        { path: '/Courses/:SubjectId', element: <ProtectedRoute><Courses /></ProtectedRoute> },
        { path: '/TestBank', element: <ProtectedRoute><TestBank /></ProtectedRoute> },
        { path: 'Courses/CourseContent/:SubjectId', element: <ProtectedRoute><CourseContent /></ProtectedRoute> },
        { path: '/Profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: '/ResetPassword', element: <ProtectedRoute><ResetPassword /></ProtectedRoute> },
        { path: '/ConfirmResetPass', element: <ProtectedRoute><ConfirmResetPass /></ProtectedRoute> },
        { path: '/ChangePassword', element: <ProtectedRoute><ChangePassword /></ProtectedRoute> },
        { path: '/Result/:correctAnswers/:wrongAnswers', element: <ProtectedRoute><Result /></ProtectedRoute> },
        { path: '/CreateSubject', element: <ProtectedRoute><CreateSubject /></ProtectedRoute> },
        { path: '/CreateContent', element: <ProtectedRoute><CreateContent /></ProtectedRoute> },
        { path: '/AvailableCources', element: <ProtectedRoute><AvailableCources /></ProtectedRoute> },
        { path: 'Courses/CourseContent/CourseDetails/:SubjectId', element: <ProtectedRoute><CourseDetails /></ProtectedRoute> },
        { path: 'Courses/CourseContent/CourseDetails/CreateQuiz/:SubjectId', element: <ProtectedRoute><CreateQuiz /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    },
    { path: '/ChatCommunity', element: <ProtectedRoute><ChatCommunity /></ProtectedRoute> },
    { path: '/Quiz/:contentID', element: <ProtectedRoute><Quiz /></ProtectedRoute> },
  ])

  return (
    <>
      <main style={{ direction: Lang === 'ar' ? "rtl" : "ltr" }}>
        <RouterProvider router={router} />
      </main >
    </>
  );
}
