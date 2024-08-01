// styles
import styles from "./cart-item.module.scss";
import cn from "classnames";
// react
import { FC, useState } from "react";
// router
import { NavLink } from "react-router-dom";
// debaunce
import { useDebouncedCallback } from "use-debounce";
// components
import { Button, ItemCounter } from "../index";
import { Cart } from "../../assets/icons";
// types
import { ICartItem } from "../../types/common";
// store
import { useAppDispatch, useAppSelector } from "../../store";
// slices
import { updateCart } from "../../store/slices/cart-slice";
// selectors
import { authSelector, cartSelector } from "../../store/selectors/selectors";

export const CartItem: FC<ICartItem> = ({
  id,
  quantity,
  thumbnail,
  title,
  price,
}) => {
  const { updateError, updatedProduct, isUpdateLoading } =
    useAppSelector(cartSelector);
  const { cart } = useAppSelector(cartSelector);
  const { user } = useAppSelector(authSelector);
  const [count, setCount] = useState(quantity);

  const loading = updatedProduct === id && isUpdateLoading;
  const error = updateError && updatedProduct === id;

  const dispatch = useAppDispatch();

  const itemCounter = useDebouncedCallback(() => {
    if (cart && user) {
      dispatch(
        updateCart({
          userId: user.id,
          productId: id,
          quantity: count,
          products: cart.products,
        })
      );
    }
  }, 1000);

  return (
    <li className={styles.item}>
      <NavLink to={`/product/${id}`} className={styles.link}>
        <picture
          className={cn(styles.image, {
            [styles.transparent]: !count,
          })}
        >
          <img
            src={thumbnail}
            alt={`item ${title}`}
            width="100px"
            height="100px"
          />
        </picture>
        <div
          className={cn(styles.inner, {
            [styles.transparent]: !count,
          })}
        >
          <span className={styles.name}>{title}</span>
          <span className={styles.price}>
            {price}
            {"\u00A0"}$
          </span>
        </div>
      </NavLink>
      {count > 0 ? (
        <>
          <ItemCounter
            isLoading={loading}
            isError={error}
            count={count}
            setCount={setCount}
            fetchData={itemCounter}
            size="small"
            additionalClass={styles.count}
          />
          <button
            className={styles.button}
            onClick={() => {
              setCount(0);
              itemCounter();
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <>
          <Button
            variant="icon"
            isLoading={loading}
            additionalClass={styles.iconRight}
            onClick={() => {
              setCount(1);
              itemCounter();
            }}
          >
            {Cart}
          </Button>
        </>
      )}
    </li>
  );
};
