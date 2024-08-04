//RTK
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
// types
import { ICartItem, TCart, TServerResponce } from "../../types/common";
// variables
import { BASE_URL, CART, USER } from "../../variables/variables";
import { resetUser } from "./auth-slice";

export type TFetchCartResponse = {
  carts: Array<TCart>;
} & TServerResponce;

export type TUpdateCartResponse = TCart & TServerResponce;

export const fetchCart = createAsyncThunk<
  TFetchCartResponse,
  number,
  { pendingMeta: unknown }
>("fetchCart", async (id, { rejectWithValue, dispatch }) => {
  const res = await fetch(`${BASE_URL}/auth/${CART}/${USER}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    if (res.statusText === "Unauthorized") {
      dispatch(resetUser());
    }
    return rejectWithValue(res.statusText);
  }
  const data = await res.json();
  return data;
});

export const updateCart = createAsyncThunk<
  TUpdateCartResponse,
  {
    userId: number;
    productId: number;
    quantity: number;
    products: Array<ICartItem>;
  },
  { pendingMeta: unknown }
>(
  "updateCart",
  async (
    { userId, productId, quantity, products },
    { rejectWithValue, dispatch }
  ) => {
    const res = await fetch(`${BASE_URL}/auth/${CART}/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merge: false,
        // здесь передаем всю корзину, т.к. изменения на сервере не происходит и обновления нет
        products: [
          ...products,
          {
            id: productId,
            quantity: quantity,
          },
        ],
      }),
    });
    if (!res.ok) {
      if (res.statusText === "Unauthorized") {
        dispatch(resetUser());
      }
      return rejectWithValue(res.statusText);
    }
    const data = await res.json();
    return data;
  }
);

type TInitialState = {
  cart: TCart | null;
  isUpdateLoading: boolean;
  isLoading: boolean;
  error: undefined | string;
  updateError: undefined | boolean;
  updatedProduct: null | number;
};

const initialState: TInitialState = {
  cart: null,
  isLoading: false,
  isUpdateLoading: false,
  error: undefined,
  updateError: undefined,
  updatedProduct: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TInitialState>): void => {
    // fetch Cart
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
      state.updateError = undefined;
      state.error = undefined;
      state.updateError = undefined;
      state.updatedProduct = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload.carts[0];
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // update Cart
    builder.addCase(updateCart.pending, (state, action) => {
      state.updatedProduct = action.meta.arg.productId;
      state.updateError = undefined;
      state.isUpdateLoading = true;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.updatedProduct = null;
      state.isUpdateLoading = false;
      state.cart = action.payload;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.isUpdateLoading = false;
      state.updateError = true;
    });
  },
});

export default cartSlice;
