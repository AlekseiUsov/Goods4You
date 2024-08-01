// styles
import styles from "./cart.module.scss";
import cn from "classnames";
// helmet
import { Helmet } from "react-helmet-async";
// components
import { CartItem, Error, Loader } from "../../components";
// types
import { ICartItem } from "../../types/common";
// store
import { useAppSelector } from "../../store";
import { cartSelector } from "../../store/selectors/selectors";

export const Cart = () => {
  const { cart, isLoading, error } = useAppSelector(cartSelector);
  // не корректный данные приходят с бекенда
  const total = cart && cart.total.toFixed(2);
  const totalDiscount = cart && cart.discountedTotal.toFixed(2);

  return (
    <section className={cn(styles.cart, "container")}>
      <Helmet>
        <meta
          name="description"
          content="“Any products from famous brands with worldwide delivery”"
        />
        <title data-rh="true">My cart | Goods4you</title>
      </Helmet>
      {error && <Error />}
      {isLoading && <Loader />}
      {!error && !isLoading && cart && (
        <>
          <h1>My cart</h1>
          <div className={styles.block}>
            <ul className={styles.list}>
              {cart.products.map((el: ICartItem) => (
                <CartItem key={el.id} {...el} />
              ))}
            </ul>
            <div className={styles.info}>
              <div className={cn(styles.countItems, styles.inner)}>
                <span className={styles.description}>Total count</span>
                <span className={styles.value}>{cart.totalQuantity} items</span>
              </div>
              <div className={cn(styles.price, styles.inner)}>
                <span className={styles.description}>
                  Price without discount
                </span>
                <span className={styles.value}>{total}$</span>
              </div>
              <div className={cn(styles.totalPrice, styles.inner)}>
                <span className={styles.description}>Total price</span>
                <span className={styles.value}>{totalDiscount}$</span>
              </div>
            </div>
          </div>
        </>
      )}
      {!isLoading && !cart && !error && <div className="noItems">No items</div>}
    </section>
  );
};
