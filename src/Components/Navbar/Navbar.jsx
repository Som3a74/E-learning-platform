import React, { useEffect, useState } from "react";
import styleNavbar from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, getToken } from "../../Redux/sliceToken";
import { handelTrantion } from "../../Redux/SliceTransition";

export default function Navbar({ t }) {
  const [color, setcolor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 50) {
      setcolor(true);
    } else {
      setcolor(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  const { userToken } = useSelector((state) => state.ApisliceToken);
  const { Lang } = useSelector((state) => state.ApiSliceTransition);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToken());
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-md fixed-top w-100 ${color ? "glass__Navbar" : ""}`}
      >
        <div className="container-sm">
          <Link className="navbar-brand animation__FedeIn" to="/">
            <img className={styleNavbar.logoWidth} loading="lazy" src={require("../../Img/Logo.png")} alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end vh-100" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Offcanvas
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
            </div>
            <div className="offcanvas-body overflow-y-visible">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 animation__FedeIn align-items-center">
                <li className="nav-item">
                  <Link className="nav-link active fw-semibold" aria-current="page" to="/" >
                    {t("Home")}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold"  to="/AvailableCources">
                    {/* to="/Courses" */}
                    {t("Courses")}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/ChatCommunity">
                    {t("Community")}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/TestBank">
                    {t("Test Bank")}
                  </Link>
                </li>



                {userToken == null ? (
                  <>
                    <li className="me-2 px-2 bgMain rounded mb-1">
                      <Link className="nav-link fw-bold text-white text-center " to="/Login" >
                        Login
                      </Link>
                    </li>
                    <li className="me-2 me-md-0 px-2 bgMain rounded mb-1">
                      <Link className="nav-link fw-bold text-white text-center" to="/Register">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <>


                    <div className="dropdown mx-2">
                      <li className="nav-link text-black fw-semibold cursorPointer" data-bs-toggle="dropdown" aria-expanded="false">
                        <i style={{ color: '#000000a6', fontSize: "22px" }} className="fa-solid fa-user"></i>
                      </li>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item text-black" to="/Profile">Profile</Link></li>
                        <li><Link className="dropdown-item text-black" to="/ResetPassword">Reset Password</Link></li>
                        <li onClick={() => dispatch(handelTrantion())} className="nav-item nav-link fw-semibold cursorPointer">
                          {t("Translate")} {Lang}
                        </li>
                      </ul>
                    </div>


                    <li className="me-2 px-2 bgMain rounded mb-1">
                      <Link onClick={() => dispatch(clearToken())} className="nav-link fw-bold text-white text-center " to="/Login"   >
                        logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}