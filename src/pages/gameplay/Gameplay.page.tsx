import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import WordButton from "../../components/WordButton.component";
import { RESULT_ROUTE, USERSCORE_STORAGE } from "../../config";
import data from "../../data.json";

import "./Gameplay.styles.scss";

export interface IGameData {
  question: string;
  all_words: string[];
  good_words: string[];
}

const CORRECT_MULTIPLIER = 2;

const Gameplay: React.FC = () => {
  const { push } = useHistory();

  const [{ question, all_words: allWords, good_words: goodWords }] =
    useState<IGameData>(data[Math.floor(Math.random() * data.length)]);
  const [selectedWords, setSelectedWords] = useState<IGameData["all_words"]>(
    []
  );
  const [isResultChecked, setIsResultChecked] = useState(false);

  const handleWordClick = useCallback(
    (item: string) => {
      selectedWords.includes(item)
        ? setSelectedWords(
            selectedWords.filter((toggledItem) => toggledItem !== item)
          )
        : setSelectedWords([...selectedWords, item]);
    },
    [selectedWords]
  );

  const countPlayerPoints = useCallback(() => {
    let correctAnswers = 0;
    let wrongAnswers = 0;

    selectedWords.forEach((item) =>
      goodWords.includes(item) ? correctAnswers++ : wrongAnswers++
    );

    return (
      correctAnswers * CORRECT_MULTIPLIER -
      (wrongAnswers + goodWords.length - correctAnswers)
    );
  }, [goodWords, selectedWords]);

  const handleAnswersCheck = useCallback(() => {
    if (isResultChecked) {
      push(RESULT_ROUTE);
    } else {
      setIsResultChecked((is) => !is);
      localStorage.setItem(USERSCORE_STORAGE, `${countPlayerPoints()}`);
    }
  }, [countPlayerPoints, isResultChecked, push]);

  return (
    <div className="page">
      <div className="page--content">
        <h1 className="common-header">{question}</h1>
        <div className="gameplay__container">
          {allWords.map((item, index) => (
            <WordButton
              className="gameplay__container__word"
              handleClick={handleWordClick}
              isSelected={selectedWords.includes(item)}
              isCorrect={goodWords.includes(item)}
              isChecked={isResultChecked}
              item={item}
              key={index}
            />
          ))}
        </div>
        <button
          onClick={handleAnswersCheck}
          className="common-button"
          type="button"
        >
          {isResultChecked ? "finish game" : "check answers"}
        </button>
      </div>
    </div>
  );
};

export default Gameplay;
