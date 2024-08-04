// styles
import styles from "./catalog-item.module.scss";
import cn from "classnames";
// react
import { FC, useState } from "react";
// routing
import { NavLink } from "react-router-dom";
// react
import { useDebouncedCallback } from "use-debounce";
// components
import { Cart } from "../../assets/icons";
import { Button, ItemCounter } from "../index";
// types
import { ICartItem } from "../../types/common";
// redux
import { useSelector } from "react-redux";
// store
import { useAppDispatch } from "../../store";
// selectors
import { authSelector, cartSelector } from "../../store/selectors/selectors";
// slices
import { updateCart } from "../../store/slices/cart-slice";

export const CatalogItem: FC<ICartItem> = ({
  thumbnail,
  title,
  price,
  id,
  quantity,
  discountPercentage,
  stock,
}) => {
  const { user } = useSelector(authSelector);
  const { cart, updateError, updatedProduct, isUpdateLoading } =
    useSelector(cartSelector);
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(quantity);
  const discountPrice = (price * (1 - discountPercentage / 100)).toFixed(2);

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

  const loading = updatedProduct === id && isUpdateLoading;
  const error = updateError && updatedProduct === id;

  return (
    <li className={styles.catalog_item}>
      <NavLink to={`product/${id}`}>
        <div className={styles.layer}>Show details</div>
        <picture className={styles.image}>
          <img
            src={thumbnail}
            alt={`item ${title}`}
            width="300px"
            height="300px"
          />
        </picture>
      </NavLink>
      <div className={styles.block}>
        <NavLink to={`product/${id}`}>
          <div className={styles.inner}>
            <span
              className={cn(styles.name, {
                [styles.half]: quantity,
              })}
            >
              {title}
            </span>
            <span className={styles.price}>{discountPrice} $</span>
          </div>
        </NavLink>
        {!count ? (
          <Button
            variant="icon"
            ariaLabel={`добавить ${title} в корзину`}
            isLoading={loading}
            isError={error}
            type="icon"
            onClick={() => {
              setCount(count + 1);
              itemCounter();
            }}
          >
            {Cart}
          </Button>
        ) : (
          <ItemCounter
            setCount={setCount}
            size="small"
            disabled={count === stock}
            isLoading={loading}
            fetchData={itemCounter}
            isError={error}
            additionalClass={styles.counter}
            count={count}
          />
        )}
      </div>
    </li>
  );
};
