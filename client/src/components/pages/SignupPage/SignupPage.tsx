import React, { FormEvent, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch } from '../../../features/redux/hooks';
import { signUpUserActionThunk } from '../../../features/redux/asyncThunks/userThunks';
import type { UserSubmitFormType } from '../../../types/userTypes';

const theme = createTheme();

export default function SignupPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    void dispatch(signUpUserActionThunk(data as UserSubmitFormType));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter the secret passphrase to login as admin
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="secret"
              label="Secret passphrase"
              name="secret"
              autoFocus
            />
            <LoadingButton type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Enter
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
