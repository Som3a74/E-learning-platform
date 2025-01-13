import React from "react";
import style from "./Footer.module.css";
import logo from "../../Img/Logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "/#", iconClass: "fa-facebook-f", label: "Facebook" },
    { href: "/#", iconClass: "fa-twitter", label: "Twitter" },
    { href: "/#", iconClass: "fa-linkedin", label: "LinkedIn" },
  ];

  const navLinks = [
    {
      heading: "Company",
      links: [
        { href: "/#", text: "About Us" },
        { href: "/#", text: "How to Work?" },
        { href: "/#", text: "Popular Course" },
        { href: "/#", text: "Service" },
      ],
    },
    {
      heading: "Courses",
      links: [
        { href: "/#", text: "Categories" },
        { href: "/#", text: "Offline Course" },
        { href: "/#", text: "Video Course" },
        { href: "/#", text: "Live Course" },
      ],
    },
    {
      heading: "Support",
      links: [
        { href: "/#", text: "FAQ" },
        { href: "/#", text: "Help Center" },
        { href: "/#", text: "Career" },
        { href: "/#", text: "Privacy" },
      ],
    },
  ];

  return (
    <div className={style.footerBody}>
      <footer className={style.footer}>
        <div className={`${style.container} ${style.grid} ${style.gridFooter}`}>
          <div className={style.logoCol}>
            <a href="/#" className={style.footerLogo}>
              <img className={style.logo} alt="Logo" src={logo} />
            </a>

            <ul className={style.socialLinks}>
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    className={style.footerLink}
                    href={link.href}
                    aria-label={link.label}
                  >
                    <i className={`${style.socialIcon} fa-brands ${link.iconClass}`}></i>
                  </a>
                </li>
              ))}
            </ul>

            <p className={style.copyright}>
              Copyright &copy; <span className={style.year}>{currentYear}</span> SELP.com
            </p>
          </div>

          {navLinks.map((nav, index) => (
            <nav key={index} className={style.navCol}>
              <p className={style.footerHeading}>{nav.heading}</p>
              <ul className={style.footerNav}>
                {nav.links.map((link, idx) => (
                  <li key={idx}>
                    <a className={style.footerLink} href={link.href}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={style.addressCol}>
            <p className={style.footerHeading}>Contact Info</p>
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