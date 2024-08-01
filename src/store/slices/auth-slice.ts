//RTK
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUser = {
  id: number;
  firstName: string;
  lastName: string;
};

const initialState: {
  user: null | TUser;
  loading: boolean;
} = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ id: number; firstName: string; lastName: string }>
    ) => {
      const { id, firstName, lastName } = action.payload;
      state.user = { id, firstName, lastName };
    },
    resetUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export default authSlice;

export const { setUser, resetUser, setLoading } = authSlice.actions;
