//RKT
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector as selectorHook,
} from "react-redux";
// api
import { catalogApi, userApi } from "./api";
// slices
import cartSlice from "./slices/cart-slice";
import authSlice from "./slices/auth-slice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    [catalogApi.reducerPath]: catalogApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([catalogApi.middleware, userApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;
