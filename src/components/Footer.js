import classes from './Footer.module.css';
import React from 'react';
import twitter from '../assets/twitter.svg';
import fb from '../assets/facebook.svg';
import ig from '../assets/instagram.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.leftContent}>
          <h1>
            Tiket<span>Ap</span>
          </h1>
          <h2>&copy;TiketAp Ltd. 2021</h2>
        </div>
        <div className={classes.rightContent}>
          <Link to="#">
            <img src={twitter} alt="" />
          </Link>
          <Link to="#">
            <img src={ig} alt="" />
          </Link>
          <Link to="#">
            <img src={fb} alt="" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
