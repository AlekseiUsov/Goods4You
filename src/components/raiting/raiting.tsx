// styles
import styles from "./raiting.module.scss";
import cn from "classnames";
// react
import { FC } from "react";
// components
import { Star } from "../../assets/icons";
// utils
import { setRaiting } from "../../utils/setRaiting";

interface IProps {
  raiting: number;
}

export const Raiting: FC<IProps> = ({ raiting }) => {
  const starsClasses = setRaiting(raiting);
  return (
    <div className={styles.rate}>
      {starsClasses.map((el, index) => (
        <div
          key={index}
          className={cn({
            [styles.highlighted]: el === "highlighted",
          })}
        >
          {Star}
        </div>
      ))}
    </div>
  );
};
