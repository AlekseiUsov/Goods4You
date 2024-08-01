// styles
import styles from "./item-counter.module.scss";
import cn from "classnames";
// react
import { FC } from "react";
// components
import { Minus, Plus } from "../../assets/icons";
import { Button } from "../button/button";

interface IProps {
  additionalClass?: string;
  size?: "small" | "medium";
  count: number;
  setCount: (count: number) => void;
  fetchData?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: string | boolean;
}

export const ItemCounter: FC<IProps> = ({
  additionalClass,
  size = "small",
  count,
  setCount,
  fetchData,
  disabled,
  isLoading,
  isError,
}) => {
  const description = count === 1 ? "item" : "items";

  return (
    <div className={cn(styles.counter, additionalClass)}>
      <Button
        variant="icon"
        iconSize={size}
        onClick={() => {
          setCount(count - 1);
          fetchData ? fetchData() : null;
        }}
      >
        {Minus}
      </Button>
      <div className={styles.inner}>
        {isLoading && <span>Loading</span>}
        {!isLoading && (
          <span>
            {count} {description}
          </span>
        )}
        {isError && <span className={styles.error}>Error</span>}
      </div>
      <Button
        disabled={disabled}
        variant="icon"
        type="icon"
        iconSize={size}
        onClick={() => {
          setCount(count + 1);
          fetchData ? fetchData() : null;
        }}
      >
        {Plus}
      </Button>
    </div>
  );
};
