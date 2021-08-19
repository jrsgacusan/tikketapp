import React from 'react';
import classes from './NavBar.module.css';
import { Row } from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';
import { NavLink, useHistory } from 'react-router-dom';
import { sweetConfirmHandler } from './SweetAlert';
import logo from '../assets/cropped-logo.png';

const NavBar = ({ children }) => {
  const history = useHistory();

  const { signOut } = useAuth();

  const handleLogout = async () => {
    const signout = async (params) => {
      await signOut();
      history.push('/sign-in');
    };
    try {
      sweetConfirmHandler(signout, 'warning', 'Do you want to signout?');
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div className={classes.navbar}>
        <div className={classes.container}>
          <nav className="navbar navbar-expand-lg">
            <NavLink className="navbar-brand" to="/unsettled">
              <h1>
                Tiket<span>Ap</span>
              </h1>
            </NavLink>
            <button
              style={{ color: '#D4F1F4' }}
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={classes.manageThis} id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    activeClassName={classes.active}
                    className="nav-link"
                    to="/unsettled"
                  >
                    Unsettled
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName={classes.active}
                    className="nav-link"
                    to="/paid"
                  >
                    Paid
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    activeClassName={classes.active}
                    className="nav-link"
                    to="/plate-num"
                  >
                    Plate Num
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
              <ul className={classes['cropped-logo']}>
                <img src={logo} alt="cropped-logo"></img>
              </ul>
            </div>
          </nav>
          {children}
        </div>
      </div>
    </>
  );
};

export default NavBar;
