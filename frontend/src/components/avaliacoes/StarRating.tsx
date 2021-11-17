import { useState } from "react";
import classNames from "classnames";

import StarSvg from "../../assets/svgs/iconmonstr-star-3.svg";
import style from "./StarRating.module.css";

export interface StarRatingComponentProps {
  onStarClick?: (starIndex: number) => void;
}

function StarRatingComponent(props: StarRatingComponentProps) {
  const [starRatting, setStarRatting] = useState(0);
  const [starRattingClicked, setStarRattingClicked] = useState(false);

  function handleStarHover(starIndex: number) {
    if (starRattingClicked) return;
    setStarRatting(starIndex);
  }

  function handleMouseExit() {
    if (starRattingClicked) return;
    setStarRatting(0);
  }

  function handleStarClick(starIndex: number) {
    setStarRattingClicked(true);
    setStarRatting(starIndex);
    props.onStarClick && props.onStarClick(starIndex);
  }

  return (
    <div className={`flex ${style.starMenu}`} onMouseLeave={handleMouseExit}>
      <img
        src={StarSvg}
        alt="Star 1"
        className={classNames({
          [style.starActivate]: starRatting >= 1,
        })}
        onMouseEnter={() => handleStarHover(1)}
        onClick={() => handleStarClick(1)}
      />
      <img
        src={StarSvg}
        alt="Star 2"
        className={classNames({
          [style.starActivate]: starRatting >= 2,
        })}
        onMouseEnter={() => handleStarHover(2)}
        onClick={() => handleStarClick(2)}
      />
      <img
        src={StarSvg}
        alt="Star 3"
        className={classNames({
          [style.starActivate]: starRatting >= 3,
        })}
        onMouseEnter={() => handleStarHover(3)}
        onClick={() => handleStarClick(3)}
      />
      <img
        src={StarSvg}
        alt="Star 4"
        className={classNames({
          [style.starActivate]: starRatting >= 4,
        })}
        onMouseEnter={() => handleStarHover(4)}
        onClick={() => handleStarClick(4)}
      />
      <img
        src={StarSvg}
        alt="Star 5"
        className={classNames({
          [style.starActivate]: starRatting === 5,
        })}
        onMouseEnter={() => handleStarHover(5)}
        onClick={() => handleStarClick(5)}
      />
    </div>
  );
}

export default StarRatingComponent;
