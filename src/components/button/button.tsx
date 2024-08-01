// styles
import styles from "./button.module.scss";
import cn from "classnames";
// react
import { FC, ReactNode, SyntheticEvent } from "react";

export interface IButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, "onClick"> {
  variant: "text" | "icon";
  iconSize?: "small" | "medium";
  ariaLabel?: string;
  additionalClass?: string;
  children: string | ReactNode;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  isLoading?: boolean;
}

export const Button: FC<IButtonProps> = ({
  variant,
  iconSize = "small",
  children,
  disabled,
  ariaLabel,
  additionalClass,
  onClick,
  isLoading,
}) => {
  return (
    <button
      data-testid="testidbutton"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(styles.button, additionalClass, {
        [styles.mediumIcon]: variant === "icon" && iconSize === "medium",
        [styles.smallIcon]: variant === "icon" && iconSize === "small",
        [styles.hasText]: variant === "text",
        [styles.disabled]: disabled,
      })}
    >
      {isLoading ? "loading" : children}
    </button>
  );
};
