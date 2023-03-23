import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { UserFromBackend, UserSubmitFormType } from '../../../types/userTypes';

export const checkUserActionThunk = createAsyncThunk<UserFromBackend>('user/check', async () =>
  axios<UserFromBackend>('/api/auth/check')
    .then((res) => res.data)
    .catch(() => Promise.reject(new Error('Server error'))),
);

export const signUpUserActionThunk = createAsyncThunk<UserFromBackend, UserSubmitFormType>(
  'user/signup',
  async (data) =>
    axios
      .post<UserFromBackend>('/api/auth/signin', data)
      .then((res) => res.data)
      .catch(() => Promise.reject(new Error('Server error'))),
);

export const logouUserActionThunk = createAsyncThunk('user/logout', async () =>
  axios
    .post('/api/auth/logout')
    .then(() => null)
    .catch(() => Promise.reject(new Error('Server error'))),
);
