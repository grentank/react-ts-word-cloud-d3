import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import type { AnswerType } from '../../types/wordTypes';

type EnterAnswerCardProps = {
  answer: AnswerType;
  index: number;
  disabled: boolean;
  changeHandler: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) => void;
  sendAnswerHandler: (index: number) => void;
};

export default function EnterAnswerCard({
  answer,
  index,
  disabled,
  changeHandler,
  sendAnswerHandler,
}: EnterAnswerCardProps): JSX.Element {
  return (
    <Grid container spacing={4}>
      <Grid item xs={9}>
        <TextField
          label="1 answer"
          size="small"
          value={answer.text}
          onChange={(e) => changeHandler(e, index)}
          fullWidth
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" onClick={() => sendAnswerHandler(index)} disabled={disabled}>
          Send!
        </Button>
      </Grid>
    </Grid>
  );
}
