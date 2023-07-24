import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ticketReducer from "../features/ticket/ticketSlice";

export const store = configureStore({
  reducer: {
    ticket: ticketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
