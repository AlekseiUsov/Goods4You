// styles
import styles from "./catalog.module.scss";
import cn from "classnames";
//react
import { ChangeEvent, useEffect, useState } from "react";
// debaunce
import { useDebounce } from "use-debounce";
// helmet
import { Helmet } from "react-helmet-async";
// data
import { faq } from "./data";
// routing
import { HashLink as Link } from "react-router-hash-link";
// store
import { useAppDispatch, useAppSelector } from "../../store";
import { cartSelector } from "../../store/selectors/selectors";
import { resetUser } from "../../store/slices/auth-slice";
// components
import {
  Button,
  CatalogItem,
  DropDownText,
  Error,
  Input,
  Loader,
} from "../../components";
// api
import { catalogApi } from "../../store/api";
// types
import { ICartItem } from "../../types/common";
// utils
import { getItemsQuantity } from "../../utils/getItemsQuantity";

export const Catalog = () => {
  // input
  const [searchText, setSearchText] = useState("");
  const [value] = useDebounce(searchText, 700);
  //button
  const [isVisibleBotton, setIsVisibleBotton] = useState(true);
  // items
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<Array<ICartItem>>([]);
  // data
  const { data, isLoading, error } = catalogApi.useFetchProductsQuery({
    search: value,
    count: count,
  });
  const [
    fetchProducts,
    { isLoading: loadingNewItems, isError: isErrorNewItems },
  ] = catalogApi.useLazyFetchProductsQuery();
  // store
  const { cart } = useAppSelector(cartSelector);

  const dispatch = useAppDispatch();

  const addItems = async () => {
    try {
      const data = await fetchProducts({
        search: value,
        count: count + 1,
      }).unwrap();
      if (cart) {
        const adaptedData = getItemsQuantity(data.products, cart.products);
        setItems([...items, ...adaptedData]);
        if (data.total <= items.length + 12) {
          setIsVisibleBotton(false);
        }
      }
    } catch (error) {
      // ошибку здесь не обрабатываем
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setCount(0);
  };

  useEffect(() => {
    if (count === 0 && data && cart) {
      const { products } = data;
      const adaptedData = getItemsQuantity(products, cart.products);
      setItems(adaptedData);
    }
    if (error && "status" in error && error.status === 401) {
      dispatch(catalogApi.util.resetApiState());
      dispatch(resetUser());
    }
  }, [dispatch, error, data, count, cart, value]);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="“Any products from famous brands with worldwide delivery”"
        />
        <title data-rh="true">Catalog | Goods4you</title>
      </Helmet>
      <section className={styles.banner}>
        <div className="container">
          <p className={styles.title}>
            Any products from famous brands
            <br /> with worldwide delivery
          </p>
          <p className={styles.description}>
            We sell smartphones, laptops, clothes, shoes
            <br /> and many other products at low prices
          </p>
          <div className={styles.background}>Goods4you</div>
          <Link to="/#catalog" className={cn("button", styles.link)}>
            Go to shopping
          </Link>
        </div>
      </section>
      {error && <Error />}
      {!error && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <section className={styles.catalog} id="catalog">
              <div className={styles.block}>
                <div className="container">
                  <h1>Catalog</h1>
                  <Input placeholder="Search by title" onChange={handleInput} />
                  {!isLoading && items.length > 0 ? (
                    <ul className={styles.list}>
                      {items.map((el: ICartItem) => (
                        <CatalogItem {...el} key={el.id} />
                      ))}
                    </ul>
                  ) : (
                    <div className="noItems">No items</div>
                  )}
                </div>
                {isVisibleBotton && items.length && (
                  <Button
                    variant="text"
                    isLoading={loadingNewItems}
                    isError={isErrorNewItems}
                    additionalClass={styles.button}
                    onClick={() => {
                      setCount((prev) => prev + 1);
                      addItems();
                    }}
                  >
                    Show more
                  </Button>
                )}
              </div>
            </section>
          )}
        </>
      )}
      <section className={styles.faq} id="faq">
        <div className="container">
          <h2>FAQ</h2>
          <ul className={styles.list}>
            {faq.map((el, index) => (
              <DropDownText {...el} key={index} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
