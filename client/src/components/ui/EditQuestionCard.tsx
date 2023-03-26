import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { useAppDispatch } from '../../features/redux/hooks';
import { setCurrentQuestion, setQuestionTitle } from '../../features/redux/slices/wordsSlice';
import type { QuestionType } from '../../types/wordTypes';

type EditQuestionCardProps = {
  question: QuestionType;
  index: number;
};

export default function EditQuestionCard({ question, index }: EditQuestionCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Question {index}, total answers: {question.answers.length}
        </Typography>
        <TextField
          fullWidth
          value={question.question}
          onChange={(e) => dispatch(setQuestionTitle({ question: e.currentTarget.value, index }))}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => dispatch(setCurrentQuestion(index))}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
