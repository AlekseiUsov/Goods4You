import styles from "./login.module.scss";
// components
import { Button, Input } from "../../components";
// hooks
import { useForm } from "../../hooks/useForm";
// store
import { userApi } from "../../store/api";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/slices/auth-slice";
import { useState } from "react";

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const { formValues, handleInputsChange } = useForm({
    username: "",
    password: "",
  });
  const [fetchUser] = userApi.useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    setLoading(true);
    try {
      if (formValues.username && formValues.password) {
        const user = await fetchUser(formValues).unwrap();
        localStorage.setItem("token", user.token);
        setLoading(false);
        dispatch(setUser(user));
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className={styles.login}>
      <h1>Sign in</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          name="username"
          value={formValues.username}
          onChange={(e) => handleInputsChange(e)}
          placeholder={"Login"}
        />
        <Input
          type="password"
          name="password"
          value={formValues.password}
          onChange={(e) => handleInputsChange(e)}
          placeholder={"Password"}
        />
        <Button variant="text" type="submit" isLoading={loading}>
          Sign in
        </Button>
        {error && <span className={styles.error}>sorry, we got an error</span>}
      </form>
    </div>
  );
};
