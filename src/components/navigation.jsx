import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navigation = (props) => {

let navigate=useNavigate();

  const username = localStorage.getItem('username');
  function logout(){
    localStorage.clear();
  }


  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/#page-top">
            EasyPay Express
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="/#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="/#services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="/#portfolio" className="page-scroll">Gallery</a>
            </li>
            <li>
              <a href="/#testimonials" className="page-scroll">Testimonials</a>
            </li>

            {username ?
            
            <>   <li>
              <Link to='/SendMoney'>Send Money</Link>
            </li>
            <li>
              <Link to='/Track'>Track a Transfer</Link>
            </li>
            <li>
              <a>
                <div class="dropdown">
                  <button class="dropbtn" style={{textTransform:"uppercase"}}><i class="fa fa-bars" aria-hidden="true" style={{fontSize:"20px"}}></i></button>
                  <div class="dropdown-content">
                    <Link to='/History'>History</Link>
                    <a href="#about" className="page-scroll">About</a>
                    <a href="#portfolio" className="page-scroll">Gallery</a>
                    <a href="#testimonials" className="page-scroll">Testimonials</a>
                    <a href="#team" className="page-scroll">Team</a>
                    <a href="#contact" className="page-scroll">Contact</a>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a>
                <div class="dropdown">
                  <button class="dropbtn" style={{textTransform:"uppercase"}}>{username}</button>
                  <div class="dropdown-content">
                    <Link to='/profile'>Profile</Link>
                    <Link to='/' onClick={logout}>Logout</Link>
                  </div>
                </div>
              </a>
            </li></>
            


              :
              
              <>
                <li>
                  <Link to="/Login" className="page-scroll">Login</Link>
                </li>
                <li>
                  <Link to="/Signup" className="page-scroll">Signup</Link>
                </li>
                </>
              
            }


          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navigation;
