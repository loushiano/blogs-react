import React, { Component } from "react";
import ActiveLink from "./ActiveLink";

class NavOne extends Component {
  constructor() {
    super();
    this.state = {
      sticky: false
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    //Mobile Menu
    this.mobileMenu();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
     
    if (window.scrollY > 70) {
      this.setState({      
        sticky: true
      });
    } else if (window.scrollY < 70) {
      this.setState({
        sticky: false
      });
    }
  };

  mobileMenu = () => {
    //Mobile Menu Toggle
    let mainNavToggler = document.querySelector(".menu-toggler");
    let mainNav = document.querySelector(".main-navigation");

    mainNavToggler.addEventListener("click", function() {
      mainNav.style.display =
        mainNav.style.display != "block" ? "block" : "none";
    });
  };

  render() {
    return (
      <header className="site-header site-header__header-one nice-font">
        <nav
          className={`navbar navbar-expand-lg navbar-light header-navigation stricky ${
            this.state.sticky ? "stricked-menu stricky-fixed" : ""
          }`}
        >
          <div className="container clearfix">
            <div className="logo-box clearfix">
              <div href="/">
                <a className="navbar-brand">
                  <img
                    src="https://smg-aw.com/wp-content/uploads/2020/09/smg-logo-.svg"
                    className="main-logo"
                    width="128"
                    alt="Awesome Image"
                  />
                </a>
              </div>
              <div className="header__social">
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <button className="menu-toggler">
                <span className="kipso-icon-menu"></span>
              </button>
            </div>
            <div
              className="main-navigation"
              style={{ width: "100%" }}
              onClick={() =>
                this.setState({
                  sticky: this.state.sticky
                })
              }
            >
              <ul className=" navigation-box">
                <li>
                  <ActiveLink
                    href="/"
                    text="Blogs"
                    className={window.location.pathname == "/" ? "active" : ""}
                  />
                </li>
                <li>
                  <ActiveLink
                    href="/about"
                    text="About Us"
                    className={
                      window.location.pathname == "/about" ? "active" : ""
                    }
                  />
                </li>
                <li>
                  <ActiveLink
                    href="/contact"
                    text="Contact Us"
                    className={
                      window.location.pathname == "/contact" ? "active" : ""
                    }
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="site-header__decor">
          <div className="site-header__decor-row">
            <div className="site-header__decor-single">
              <div className="site-header__decor-inner-1"></div>
            </div>
            <div className="site-header__decor-single">
              <div className="site-header__decor-inner-2"></div>
            </div>
            <div className="site-header__decor-single">
              <div className="site-header__decor-inner-3"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default NavOne;
