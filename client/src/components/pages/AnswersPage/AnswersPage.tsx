/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { wsSendAnswer } from '../../../features/actions/wsActions';
import { useAppDispatch, useAppSelector } from '../../../features/redux/hooks';
import { GUEST } from '../../../types/userTypes';

export default function AnswersPage(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  if (user.status !== GUEST) return <div>Error</div>;
  const [answers, setAnswers] = useState(user.answers);
  const dispatch = useAppDispatch();
  return (
    <Container maxWidth="xs">
      {answers.map((answer, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid container key={index}>
          <Grid item xs={9}>
            <TextField value={answer} onChange={(e) => setAnswers((prev) => {
                const copy = [...prev];
                copy[index] = e.target.value;
                return copy;
            })} fullWidth />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => dispatch(wsSendAnswer(answer))}>Send!</Button>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
}
