import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, pseudo: null, nom: null, prenom: null, password: null, email: null, preference: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.pseudo = action.payload.pseudo;
      state.value.nom = action.payload.nom;
      state.value.prenom = action.payload.prenom;
      state.value.password = action.payload.password;
      state.value.email = action.payload.email;
      state.value.preference = action.payload.preference;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.pseudo = null;
      state.value.nom = null;
      state.value.prenom = null;
      state.value.password = null;
      state.value.email = null;
      state.value.preference = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;