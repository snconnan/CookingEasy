import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: [],
};

export const recetteSlice = createSlice({
 name: 'recette',

  initialState,
 reducers: {
   addRecette: (state, action) => {
      state.value.push(action.payload);
  },
  }
});

export const { addRecette } = recetteSlice.actions;
export default recetteSlice.reducer;