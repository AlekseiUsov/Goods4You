// styles
import styles from "./product.module.scss";
import cn from "classnames";
// helmet
import { Helmet } from "react-helmet-async";
// react
import { useEffect, useState } from "react";
// debaunce
import { useDebouncedCallback } from "use-debounce";
// routing
import { useParams } from "react-router-dom";
// store
import { useAppDispatch, useAppSelector } from "../../store";
// selectors
import { authSelector, cartSelector } from "../../store/selectors/selectors";
// slices
import { updateCart } from "../../store/slices/cart-slice";
import { resetUser } from "../../store/slices/auth-slice";
// components
import { Button, Error, ItemCounter, Loader, Raiting } from "../../components";
// api
import { catalogApi } from "../../store/api";

export const Product = () => {
  const { id } = useParams();
  // store
  const { cart, updateError, isUpdateLoading } = useAppSelector(cartSelector);
  const { user } = useAppSelector(authSelector);
  // component State
  const defaultCount = cart?.products.find(
    (cart) => cart.id === Number(id)
  )?.quantity;
  const [activeImage, setActiveImage] = useState(0);
  const [count, setCount] = useState(defaultCount ?? 0);
  // api
  const { data, isLoading, error } = catalogApi.useFetchProductQuery(id);
  // values
  const rating = data && Math.round(data.rating);
  const discountPrice =
    data && (data.price * (1 - data.discountPercentage / 100)).toFixed(2);
  // dispatch
  const dispatch = useAppDispatch();

  const itemCounter = useDebouncedCallback(() => {
    if (cart && user) {
      dispatch(
        updateCart({
          userId: user.id,
          productId: Number(id),
          quantity: count,
          products: cart.products,
        })
      );
    }
  }, 1000);

  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      dispatch(resetUser());
      dispatch(catalogApi.util.resetApiState());
    }
  }, [dispatch, error]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <Error />}
      {data && (
        <div className="container">
          <Helmet>
            <meta
              name="description"
              content="“Any products from famous brands with worldwide delivery”"
            />
            <title data-rh="true">{data.title} | Goods4you</title>
          </Helmet>
          <div className={styles.product}>
            <div className={styles.gallery}>
              <picture className={styles.picture}>
                <source
                  srcSet={data.images[activeImage]}
                  media="(max-width: 450px)"
                  width="300px"
                  height="300px"
                />
                <source
                  srcSet={data.images[activeImage]}
                  media="(max-width: 880px)"
                  width="400px"
                  height="400px"
                />
                <img
                  src={data.images[activeImage]}
                  alt={`item ${data.title}`}
                  width="520px"
                  height="520px"
                />
              </picture>
              <div className={styles.otherImages}>
                {data.images.map((image: string, index: number) => (
                  <button
                    aria-label={`выбрать изображение № ${index}`}
                    onClick={() => setActiveImage(index)}
                    key={index}
                    className={cn({
                      [styles.active]: activeImage === index,
                    })}
                  >
                    <img
                      aria-hidden="true"
                      src={image}
                      alt={`item ${data.title}`}
                      width="100px"
                      height="100px"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.info}>
              <h1>{data.title}</h1>
              <div className={styles.inner}>
                <Raiting raiting={rating} />
                <ul className={styles.categoty}>
                  {data.tags.map((tag: string, index: number) => (
                    <li key={index}>
                      {index !== data.tags.length - 1 ? `${tag},` : `${tag}`}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.availability}>
                {data.availabilityStatus} -{" "}
                {data.stock > 10
                  ? `${data.stock} left!`
                  : `Only ${data.stock} left!`}
              </div>
              <p className={styles.description}>{data.description}</p>
              <div className={styles.delivery}>
                <span>{data.warrantyInformation}</span>
                <span>{data.shippingInformation}</span>
              </div>
              <div className={styles.block}>
                <div className={styles.price}>
                  <span className={styles.total}>{discountPrice}$</span>
                  <span className={styles.discountPrice}>{data.price}$</span>
                </div>
                <div className={styles.discount}>
                  <span className={styles.text}>Your discount:</span>
                  <span className={styles.discountValue}>
                    {data.discountPercentage}%
                  </span>
                </div>
                {count ? (
                  <ItemCounter
                    disabled={count === data.stock}
                    count={count}
                    size="medium"
                    setCount={setCount}
                    fetchData={itemCounter}
                    isLoading={isUpdateLoading}
                    isError={updateError}
                  />
                ) : (
                  <Button
                    variant="text"
                    additionalClass={styles.button}
                    isLoading={isUpdateLoading}
                    onClick={() => {
                      setCount(1);
                      itemCounter();
                    }}
                  >
                    Add to cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
