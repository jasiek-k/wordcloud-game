import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import {
  USERNAME_STORAGE,
  USERSCORE_STORAGE,
  WELCOME_ROUTE,
  GAMEPLAY_ROUTE,
} from "../../config";

import "./Result.styles.scss";

const Result: React.FC = () => {
  const { push } = useHistory();

  const userName = localStorage.getItem(USERNAME_STORAGE);
  const userScore = localStorage.getItem(USERSCORE_STORAGE);

  const navigateToGame = useCallback(() => push(GAMEPLAY_ROUTE), [push]);

  useEffect(() => {
    if (!(userName || userScore)) {
      push(WELCOME_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <div className="page--content">
        <h1 className="common-header">{`Congratulations, ${userName}!`}</h1>
        <h2 className="result__subheader">Your score:</h2>
        <span className="result__points-caption">{userScore} points</span>
        <button
          onClick={navigateToGame}
          className="common-button"
          type="submit"
        >
          play again
        </button>
      </div>
    </div>
  );
};

export default Result;
