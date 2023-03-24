/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { wsSendAnswer } from '../../../features/actions/wsActions';
import { logouUserActionThunk } from '../../../features/redux/asyncThunks/userThunks';
import { useAppDispatch, useAppSelector } from '../../../features/redux/hooks';
import { logoutUser } from '../../../features/redux/slices/userSlice';
import { GUEST } from '../../../types/userTypes';

export default function AnswersPage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  if (user.status !== GUEST) return <div>Error</div>;
  const [answers, setAnswers] = useState(
    new Array(3).fill('').map((el, index) => user.answers[index] || ''),
  );
  const [disabledAnswers, setDisabledAnswers] = useState(
    new Array(3).fill(false).map((el, index) => !!user.answers[index]),
  );
  const dispatch = useAppDispatch();
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <TextField
              label="1 answer"
              size="small"
              value={answers[0]}
              onChange={(e) =>
                setAnswers((prev) => {
                  const copy = [...prev];
                  copy[0] = e.target.value;
                  return copy;
                })
              }
              fullWidth
              disabled={disabledAnswers[0]}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(wsSendAnswer(answers[0]));
                setDisabledAnswers((prev) => {
                  const copy = [...prev];
                  copy[0] = true;
                  return copy;
                });
              }}
              disabled={disabledAnswers[0]}
            >
              Send!
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <TextField
              label="2 answer"
              size="small"
              value={answers[1]}
              onChange={(e) =>
                setAnswers((prev) => {
                  const copy = [...prev];
                  copy[1] = e.target.value;
                  return copy;
                })
              }
              fullWidth
              disabled={disabledAnswers[1]}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(wsSendAnswer(answers[1]));
                setDisabledAnswers((prev) => {
                  const copy = [...prev];
                  copy[1] = true;
                  return copy;
                });
              }}
              disabled={disabledAnswers[1]}
            >
              Send!
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <TextField
              label="3 answer"
              size="small"
              value={answers[2]}
              onChange={(e) =>
                setAnswers((prev) => {
                  const copy = [...prev];
                  copy[2] = e.target.value;
                  return copy;
                })
              }
              fullWidth
              disabled={disabledAnswers[2]}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(wsSendAnswer(answers[2]));
                setDisabledAnswers((prev) => {
                  const copy = [...prev];
                  copy[2] = true;
                  return copy;
                });
              }}
              disabled={disabledAnswers[2]}
            >
              Send!
            </Button>
          </Grid>
        </Grid>
        <Grid
          sx={{ marginTop: 3 }}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => void dispatch(logouUserActionThunk())}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
