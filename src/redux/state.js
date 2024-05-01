import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cards: JSON.parse(localStorage.getItem("cards")) ?? [],
  cards: [],
};
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const { setCards } = todosSlice.actions;
export default todosSlice.reducer;
