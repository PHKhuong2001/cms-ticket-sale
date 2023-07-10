import { createSlice } from "@reduxjs/toolkit";

// interface Ticket {}
const initialState = {
  ticketsList: [],
};
const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default ticketSlice.reducer;
