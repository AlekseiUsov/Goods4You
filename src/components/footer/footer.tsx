// styles
import styles from "./footer.module.scss";
import cn from "classnames";
// routing
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
// components
import { Logo } from "../../assets/icons";

export const Footer = () => {
  return (
    <footer className={cn(styles.footer, "container")}>
      <nav className={styles.nav}>
        <NavLink to="/catalog" className={cn(styles.logo, "logo")}>
          {Logo}
        </NavLink>
        <Link className={styles.link} to="/#catalog">
          Catalog
        </Link>
        <Link className={styles.link} to="/#faq">
          FAQ
        </Link>
      </nav>
    </footer>
  );
};
