import React, { useState } from 'react';
import heroImg from '../assets/hero-image.png';
import classes from './Home.module.css';
import { Link } from 'react-router-dom';
import QandA from '../components/QandA';

import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

const Home = () => {
  const [isACardOpen, setisACardOpen] = useState(false);

  const toggleOtherCards = () => {
    setisACardOpen(!isACardOpen);
  };

  return (
    <>
      <MainNav></MainNav>
      <section className={classes.hero}>
        <div className="container">
          <div className={classes.leftContent}>
            <p>Welcome to Tiketap Dashboard</p>
            <h1>DASHBOARD FOR MANAGING APPREHENSIONS WITHIN BAGUIO CITY</h1>
            <Link to="/sign-in">
              <button className={classes.button}>SIGN IN NOW</button>
            </Link>
          </div>

          <img src={heroImg} alt="Hero Image" />
        </div>
      </section>

      <section className={classes.faq}>
        <h1>Q&amp;A</h1>
        <div className="container">
          <ul>
            <li>
              <QandA
                question="What is TiketApp?"
                answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              ></QandA>
            </li>
            <li>
              <QandA
                question="What is TiketApp?"
                answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              ></QandA>
            </li>
            <li>
              <QandA
                question="What is TiketApp?"
                answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              ></QandA>
            </li>
            <li>
              <QandA
                question="What is TiketApp?"
                answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              ></QandA>
            </li>
            <li>
              <QandA
                question="What is TiketApp?"
                answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              ></QandA>
            </li>
            <li>
              <QandA
                question="What is TiketApp?"
                answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              ></QandA>
            </li>
          </ul>
        </div>
      </section>

      <section className={classes.modes}>
        <div className="container">
          <h2>Users</h2>
        </div>
        <div className="container">
          <div className={classes.modesLeft}>
            <h1>Enforcers</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
          <div className={classes.verticalLine}></div>
          <div className={classes.modesRight}>
            <h1>LTO Admins</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
};

export default Home;
