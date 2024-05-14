import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  token: string | null;
}

const initialState: UserState = {
  username: '',
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ username: string; token: string }>) {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    clearUser(state) {
      state.username = '';
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
