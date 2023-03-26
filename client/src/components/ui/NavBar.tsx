import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../features/redux/hooks';
import { AUTHORIZED, GUEST } from '../../types/userTypes';

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Word Cloud
        </Typography>

        <Button color="inherit" component={Link} to="/">
          <HomeIcon />
          Home
        </Button>
        {/* <Button color="inherit" component={Link} to="/signup">
          <AccountCircleIcon />
          Sign in
        </Button> */}
        {user.status === AUTHORIZED && (
          <>
            <Button color="inherit" component={Link} to="/wordcloud">
              <SettingsIcon />
              Cloud
            </Button>
            <Button color="inherit" component={Link} to="/edit">
              <SettingsIcon />
              Edit
            </Button>
          </>
        )}
        {user.status === GUEST && (
          <Button color="inherit" component={Link} to="/answers">
            <SettingsIcon />
            Answers
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
