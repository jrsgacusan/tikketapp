import React from 'react';
import classes from './NavBar.module.css';
import { Row } from 'react-bootstrap';
import { useAuth } from '../context/AuthProvider';
import { NavLink, useHistory } from 'react-router-dom';

const NavBar = ({ children }) => {
  const history = useHistory();

  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      history.push('/sign-in');
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
              TIKETAPP DASHBOARD
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
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    activeClassName="nav-item active"
                    className="nav-link"
                    to="/unsettled"
                  >
                    Unsettled
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/paid">
                    Paid
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link">
                    Logout
                  </a>
                </li>
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
