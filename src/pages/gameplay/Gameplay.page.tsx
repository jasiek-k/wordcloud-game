import React from "react";

import WordButton from "../../components/WordButton.component";
import useGameplay from "../../hooks/useGameplay";

import "./Gameplay.styles.scss";

const Gameplay: React.FC = () => {
  const {
    question,
    goodWords,
    allWords,
    handleAnswersCheck,
    isResultChecked,
    handleWordClick,
    selectedWords,
  } = useGameplay();

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
