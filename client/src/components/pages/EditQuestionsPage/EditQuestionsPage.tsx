import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '../../../features/redux/hooks';
import EditQuestionCard from '../../ui/EditQuestionCard';
import { addEmptyQuestion, removeLastQuestion } from '../../../features/redux/slices/wordsSlice';

export default function EditQuestionsPage(): JSX.Element {
  const { allQuestions, currentQuestion, displayedWords } = useAppSelector((store) => store.words);
  const dispatch = useAppDispatch();
  return (
    <Grid container>
      <Grid item xs={8}>
        <Grid container>
          {allQuestions.map((question, index) => (
            <Grid item xs={12} key={index}>
              <EditQuestionCard question={question} index={index} />
            </Grid>
          ))}
        </Grid>
        <Button variant="outlined" onClick={() => dispatch(addEmptyQuestion())}>
          <AddCircleOutlineIcon color="success" />
        </Button>
        <Button variant="outlined" onClick={() => dispatch(removeLastQuestion())}>
          <CancelIcon color="error" />
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Typography> Current question: {currentQuestion}</Typography>
        <Typography> Displayed answers: {displayedWords.length}</Typography>
      </Grid>
    </Grid>
  );
}
