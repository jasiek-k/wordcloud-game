import { useState, useCallback } from "react";

import { useHistory } from "react-router-dom";

import { RESULT_ROUTE, USERSCORE_STORAGE } from "../config";
import data from "../data.json";

export interface IGameData {
  question: string;
  all_words: string[];
  good_words: string[];
}

interface IUseGameplay {
  question: IGameData["question"];
  goodWords: IGameData["good_words"];
  allWords: IGameData["all_words"];
  selectedWords: string[];
  isResultChecked: boolean;
  handleAnswersCheck: () => void;
  handleWordClick: (word: string) => void;
}

const CORRECT_MULTIPLIER = 2;

const useGameplay = (): IUseGameplay => {
  const { push } = useHistory();

  const [{ question, all_words: allWords, good_words: goodWords }] =
    useState<IGameData>(data[Math.floor(Math.random() * data.length)]);
  const [selectedWords, setSelectedWords] = useState<IGameData["all_words"]>(
    []
  );
  const [isResultChecked, setIsResultChecked] = useState(false);

  const handleWordClick = useCallback(
    (word: string) => {
      selectedWords.includes(word)
        ? setSelectedWords(
            selectedWords.filter((toggledItem) => toggledItem !== word)
          )
        : setSelectedWords([...selectedWords, word]);
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

  return {
    question,
    goodWords,
    allWords,
    handleAnswersCheck,
    isResultChecked,
    handleWordClick,
    selectedWords,
  };
};

export default useGameplay;
