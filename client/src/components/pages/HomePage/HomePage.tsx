import { Box, Typography } from '@mui/material';
import React from 'react';

export default function HomePage(): JSX.Element {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      mt: 3,
    }}
    >
      <Typography>
        Welcome to CatSpace!
      </Typography>
    </Box>
  );
}
