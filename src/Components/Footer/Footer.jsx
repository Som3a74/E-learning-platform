import React from "react";
import style from "./Footer.module.css";

function Footer() {
  return (
    <div className={style.footerBody}>
      <footer className={style.footer}>
        <div className={`${style.container} ${style.grid} ${style.gridFooter}`}>
          <div className={style.logoCol}>
            <a href="/#" className={style.footerLogo}>
              <img
                className={style.logo}
                alt=" logo"
                src={require("../../Img/Logo.png")}
              />
            </a>

            <ul className={style.socialLinks}>
              <li>
                <a className={style.footerLink} href="/#">
                  <i
                    className={`${style.socialIcon} fa-brands fa-facebook-f`}
                  ></i>
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  <i className={`${style.socialIcon} fa-brands fa-twitter`}></i>
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  <i
                    className={`${style.socialIcon} fa-brands fa-linkedin`}
                  ></i>
                </a>
              </li>
            </ul>

            <p className={style.copyright}>
              Copyright &copy; <span className={style.year}>2024</span>
              SELP.com
            </p>
          </div>
          <nav className={style.navCol}>
            <p className={style.footerHeading}>Company</p>
            <ul className={style.footerNav}>
              <li>
                <a className={style.footerLink} href="/#">
                  About Us
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  How to work?
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  Populer Course
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  Service
                </a>
              </li>
            </ul>
          </nav>

          <nav className={style.navCol}>
            <p className={style.footerHeading}>courses</p>
            <ul className={style.footerNav}>
              <li>
                <a className={style.footerLink} href="/#">
                  Categories
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  Ofline Course
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  Vidio Course
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  live Course
                </a>
              </li>
            </ul>
          </nav>

          <nav className={style.navCol}>
            <p className={style.footerHeading}>Support</p>
            <ul className={style.footerNav}>
              <li>
                <a className={style.footerLink} href="/#">
                  FAQ
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  Help Center
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  Career
                </a>
              </li>
              <li>
                <a className={style.footerLink} href="/#">
                  Privacy
                </a>
              </li>
            </ul>
          </nav>
          <div className={style.addressCol}>
            <p className={style.footerHeading}>Contac Info</p>
            <address className={style.contacts}>
              <p className={style.address}>
                623 Harrison St., 2nd Floor, San Francisco, CA 94107
              </p>
              <p>
                <a className={style.footerLink} href="tel:415-201-6370">
                  415-201-6370
                </a>
                <br />
                <a
                  className={style.footerLink}
                  href="mailto:elizabeth@jourrapide.com"
                >
                  elizabeth@jourrapide.com
                </a>
              </p>
            </address>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
