import { useState } from "react";
import classNames from "classnames";

import StarSvg from "../../assets/svgs/iconmonstr-star-3.svg";
import style from "./StarRating.module.css";

export interface StarRatingComponentProps {
  onStarClick?: (starIndex: number) => void;
  className?: string;
  value: number;
  disabled?: boolean;
}

function StarRatingComponent(props: StarRatingComponentProps) {
  const [starRatting, setStarRatting] = useState(0);

  function handleStarHover(starIndex: number) {
    if (props.disabled) return;
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
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;

        return (
          <img
            key={index}
            src={StarSvg}
            alt={`Star ${starIndex}`}
            className={classNames({
              [style.starActivate]: props.value >= starIndex,
              [style.starHover]: starRatting >= starIndex,
              [style.star]: !props.disabled,
            })}
            onMouseEnter={() => handleStarHover(starIndex)}
            onClick={() => handleStarClick(starIndex)}
          />
        );
      })}
    </div>
  );
}

export default StarRatingComponent;
