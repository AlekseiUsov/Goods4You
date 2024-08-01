// styles
import styles from "./drop-down-text.module.scss";
import cn from "classnames";
// react
import { FC, useState } from "react";
// components
import { Plus } from "../../assets/icons";

interface IProps {
  title: string;
  text: string;
}

export const DropDownText: FC<IProps> = ({ title, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className={styles.dropDownText} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.title}>
        {title}
        <button
          className={cn(styles.button, {
            [styles.open]: isOpen,
          })}
          aria-label="Свернуть/развернуть текст"
        >
          {Plus}
        </button>
      </div>
      {isOpen && <p className={styles.text}>{text}</p>}
    </li>
  );
};
