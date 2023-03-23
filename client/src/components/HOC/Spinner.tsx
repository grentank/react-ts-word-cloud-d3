import { CircularProgress } from '@mui/material';
import React from 'react';

type SpinnerProps = {
  children: JSX.Element;
  spinning: boolean;
};

export default function Spinner({ children, spinning }: SpinnerProps): JSX.Element {

  return spinning ? <CircularProgress /> : children;
}
