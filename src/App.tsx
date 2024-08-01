import { useEffect } from "react";
// components
import { Footer, Header } from "./components";
// routing
import { Router } from "./router";
// helmet
import { HelmetProvider } from "react-helmet-async";
// store
import { useAppDispatch, useAppSelector } from "./store";
import { authSelector } from "./store/selectors/selectors";
// slice
import { fetchCart } from "./store/slices/cart-slice";

function App() {
  const { user } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, user]);

  return (
    <HelmetProvider>
      {user && <Header />}
      <main>
        <Router />
      </main>
      {user && <Footer />}
    </HelmetProvider>
  );
}

export default App;
