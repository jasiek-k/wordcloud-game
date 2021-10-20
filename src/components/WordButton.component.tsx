import React from "react";
import clsx from "clsx";

export interface IWordButtonProps {
  handleClick: (item: string) => void;
  className: string;
  isSelected: boolean;
  isChecked: boolean;
  isCorrect: boolean;
  item: string;
}

const WordButton: React.FC<IWordButtonProps> = ({
  handleClick,
  className,
  isSelected,
  isChecked,
  isCorrect,
  item,
}) => (
  <div
    className={clsx(className, {
      "correct-answer": !!(isChecked && isSelected && isCorrect),
      "wrong-answer": !!(isChecked && isSelected && !isCorrect),
    })}
  >
    {!!(isChecked && isSelected) && (
      <span className={clsx(`${className}--subcaption`)}>
        {isCorrect ? "GOOD" : "BAD"}
      </span>
    )}
    <button
      onClick={() => handleClick(item)}
      disabled={isChecked}
      className={clsx(`${className}--item`, {
        isSelected,
        isChecked,
      })}
      type="button"
    >
      {item}
    </button>
  </div>
);

export default WordButton;
