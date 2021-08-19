import PropTypes from 'prop-types';
import classes from './QandA.module.css';
import dropDown from '../assets/drop_down.svg';
import arrowUp from '../assets/arrow_up.svg';
import { useState } from 'react';

const QandA = ({ question, answer }) => {
  const [isOpened, setisOpened] = useState(false);

  const openCard = () => {
    setisOpened(!isOpened);
  };

  return (
    <>
      <div className={classes.container} onClick={openCard}>
        <div className={classes.headerContainer}>
          <header>{question}</header>
          <img src={isOpened ? arrowUp : dropDown} alt="" />
        </div>

        {isOpened && <div className={classes.panel}>{answer}</div>}
      </div>
    </>
  );
};
QandA.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

QandA.defaultProps = {
  question: 'Add a question',
  answer: 'Add answer to the question.',
};

export default QandA;
