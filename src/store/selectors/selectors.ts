import { RootState } from "..";

export const cartSelector = (store: RootState) => store.cart;
export const authSelector = (store: RootState) => store.auth;
