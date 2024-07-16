import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import Otto from "./../Otto/Otto";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Footer from "../Footer/Footer";

export default function Layout({t}) {
  return (
    <>
      <Navbar t={t} />
      <ProtectedRoute>
        <Otto />
      </ProtectedRoute>
      <Outlet />
      <Footer />
    </>
  );
}
