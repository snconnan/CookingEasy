import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const ingredientSlice = createSlice({
 name: 'ingredient',

  initialState,
 reducers: {
   addIngredientToStore: (state, action) => {
     state.value.push(action.payload);
   },
   removeIngredientFromStore: (state, action) => {
    state.value = state.value.filter(ingredient => ingredient !== action.payload);
  },
 },
});

export const { addIngredientToStore, removeIngredientFromStore } = ingredientSlice.actions;
export default ingredientSlice.reducer;