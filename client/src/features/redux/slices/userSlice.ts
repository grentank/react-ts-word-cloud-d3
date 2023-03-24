import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserType } from '../../../types/userTypes';
import { AUTHORIZED, GUEST, LOADING } from '../../../types/userTypes';
import {
  checkUserActionThunk,
  logouUserActionThunk,
  signUpUserActionThunk,
} from '../asyncThunks/userThunks';
import type { WordType } from '../../../types/wordTypes';

const initialState: UserType = {
  status: LOADING,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserType,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => action.payload,
    logoutUser: (state) => ({ status: GUEST, answers: [] }),
    addUserAnswer: (state, action: PayloadAction<WordType['text']>) => {
      if (state.status === GUEST) state.answers.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkUserActionThunk.fulfilled, (state, action) => {
        if (action.payload.guest) {
          return {
            status: GUEST,
            answers: action.payload.answers,
          };
          // state.status = GUEST;
          // state.answers = action.payload.answers;
        }
        return {
          status: AUTHORIZED,
          email: action.payload.email,
          id: action.payload.id,
        };
      })
      .addCase(checkUserActionThunk.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(logouUserActionThunk.fulfilled, (state) => {
        state.status = LOADING;
      })
      .addCase(signUpUserActionThunk.fulfilled, (state, action) => {
        if (action.payload.guest) {
          return {
            status: GUEST,
            answers: action.payload.answers,
          };
          // state.status = GUEST;
          // state.answers = action.payload.answers;
        }
        return {
          status: AUTHORIZED,
          email: action.payload.email,
          id: action.payload.id,
        };
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
