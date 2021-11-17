import { useState } from "react";
import classNames from "classnames";

import StarSvg from "../../assets/svgs/iconmonstr-star-3.svg";
import style from "./StarRating.module.css";

export interface StarRatingComponentProps {
  onStarClick?: (starIndex: number) => void;
  className?: string;
  value: number;
}

function StarRatingComponent(props: StarRatingComponentProps) {
  const [starRatting, setStarRatting] = useState(0);

  function handleStarHover(starIndex: number) {
    setStarRatting(starIndex);
  }

  function handleMouseExit() {
    setStarRatting(0);
  }

  function handleStarClick(starIndex: number) {
    props.onStarClick && props.onStarClick(starIndex);
  }

  return (
    <div
      className={`flex ${style.starMenu} ${props.className}`}
      onMouseLeave={handleMouseExit}
    >
      <img
        src={StarSvg}
        alt="Star 1"
        className={classNames({
          [style.starActivate]: props.value >= 1,
          [style.starHover]: starRatting >= 1,
        })}
        onMouseEnter={() => handleStarHover(1)}
        onClick={() => handleStarClick(1)}
      />
      <img
        src={StarSvg}
        alt="Star 2"
        className={classNames({
          [style.starActivate]: props.value >= 2,
          [style.starHover]: starRatting >= 2,
        })}
        onMouseEnter={() => handleStarHover(2)}
        onClick={() => handleStarClick(2)}
      />
      <img
        src={StarSvg}
        alt="Star 3"
        className={classNames({
          [style.starActivate]: props.value >= 3,
          [style.starHover]: starRatting >= 3,
        })}
        onMouseEnter={() => handleStarHover(3)}
        onClick={() => handleStarClick(3)}
      />
      <img
        src={StarSvg}
        alt="Star 4"
        className={classNames({
          [style.starActivate]: props.value >= 4,
          [style.starHover]: starRatting >= 4,
        })}
        onMouseEnter={() => handleStarHover(4)}
        onClick={() => handleStarClick(4)}
      />
      <img
        src={StarSvg}
        alt="Star 5"
        className={classNames({
          [style.starActivate]: props.value === 5,
          [style.starHover]: starRatting === 5,
        })}
        onMouseEnter={() => handleStarHover(5)}
        onClick={() => handleStarClick(5)}
      />
    </div>
  );
}

export default StarRatingComponent;
