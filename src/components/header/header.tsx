// styles
import styles from "./header.module.scss";
import cn from "classnames";
// routing
import { NavLink, useLocation } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
// components
import { Cart, Logo } from "../../assets/icons";
// store
import { useAppSelector } from "../../store";
import { authSelector, cartSelector } from "../../store/selectors/selectors";

export const Header = () => {
  const location = useLocation();
  const { cart } = useAppSelector(cartSelector);
  const { user } = useAppSelector(authSelector);

  return (
    <header className={styles.header}>
      <nav className={cn(styles.nav, "container")}>
        <NavLink to="/" className="logo" aria-label="Логотип">
          {Logo}
        </NavLink>
        {location.pathname !== "/login" && (
          <>
            <Link className={styles.link} to="/#catalog">
              Catalog
            </Link>
            <Link className={styles.link} to="/#faq">
              FAQ
            </Link>
            <NavLink className={styles.link} to="/cart">
              <div className={styles.card}>
                Cart
                <div className={styles.icon}>
                  {Cart}
                  {cart && (
                    <span className={styles.item_counter}>
                      {cart.totalProducts}
                    </span>
                  )}
                </div>
              </div>
            </NavLink>
            <span className={styles.name}>
              {user?.firstName} {user?.lastName}
            </span>
          </>
        )}
      </nav>
    </header>
  );
};
