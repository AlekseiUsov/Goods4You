// styles
import styles from "./error.module.scss";
import cn from "classnames";
// react
import { FC } from "react";

interface IError {
  errorMessage?: string;
}

export const Error: FC<IError> = ({ errorMessage }) => {
  return (
    <div data-testid="testiderror" className={cn(styles.error, "error")}>
      {errorMessage ?? "Sorry, you have got a error"}
    </div>
  );
};
