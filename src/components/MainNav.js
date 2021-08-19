import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNav.module.css';
import menu from '../assets/menu.svg';

const MainNav = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={classes.navbar}>
      <div className="container">
        <Link to="/">
          <h1>
            Tiket<span>Ap</span>
          </h1>
        </Link>
        <img
          src={menu}
          alt="Menu icon"
          onClick={() => setIsClicked(!isClicked)}
        />

        <nav className={isClicked ? classes.dropDownNav : ''}>
          <ul>
            <li>
              <Link to="/sign-in" class={classes.cta}>
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainNav;
