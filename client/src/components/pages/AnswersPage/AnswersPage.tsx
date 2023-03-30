/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { wsSendAnswer } from '../../../features/actions/wsActions';
import { logouUserActionThunk } from '../../../features/redux/asyncThunks/userThunks';
import { useAppDispatch, useAppSelector } from '../../../features/redux/hooks';
import { logoutUser } from '../../../features/redux/slices/userSlice';
import { GUEST } from '../../../types/userTypes';
import EnterAnswerCard from '../../ui/EnterAnswerCard';

export default function AnswersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user);
  if (user.status !== GUEST) return <div>Error</div>;
  const relevantAnswers = user.answers.filter(
    (answer) => answer.questionIndex === user.currentQuestion,
  );
  const [answers, setAnswers] = useState(
    new Array(3)
      .fill('')
      .map(
        (el, index) => relevantAnswers[index] || { questionIndex: user.currentQuestion, text: '' },
      ),
  );
  const [disabledAnswers, setDisabledAnswers] = useState(
    new Array(3).fill(false).map((el, index) => !!relevantAnswers[index]),
  );
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number): void => {
      setAnswers((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], text: e.target.value };
        return copy;
      });
    },
    [],
  );
  const sendAnswerHandler = useCallback(
    (index: number): void => {
      if (answers[index].text === '') return;
      dispatch(wsSendAnswer(answers[index]));
      setDisabledAnswers((prev) => {
        const copy = [...prev];
        copy[index] = true;
        return copy;
      });
    },
    [answers],
  );
  console.log('answers:', answers);
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
        {answers.map((answer, index) => (
          <EnterAnswerCard
            key={index}
            answer={answer}
            index={index}
            disabled={disabledAnswers[index]}
            changeHandler={changeHandler}
            sendAnswerHandler={sendAnswerHandler}
          />
        ))}
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
