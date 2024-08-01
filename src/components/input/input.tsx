// styles
import styles from "./input.module.scss";
// react
import { ChangeEvent, FC } from "react";

interface IProps extends Omit<React.HTMLProps<HTMLInputElement>, "onChange"> {
  type?: "password" | "text";
  name?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<IProps> = ({
  placeholder,
  onChange,
  type = "text",
  name,
}) => {
  return (
    <>
      <input
        data-testid="testidinput"
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => onChange(e)}
      ></input>
    </>
  );
};
