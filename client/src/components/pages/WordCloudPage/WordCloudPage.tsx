import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import StartIcon from '@mui/icons-material/Start';
import { useAppDispatch, useAppSelector } from '../../../features/redux/hooks';
import WordCloud from '../../WordCloud/WordCloud';
import { setCurrentQuestion } from '../../../features/redux/slices/wordsSlice';

export default function WordCloudPage(): JSX.Element {
  const { displayedWords, allQuestions, currentQuestion } = useAppSelector((store) => store.words);
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Typography variant="h2" component="div">
        {allQuestions[currentQuestion].question}
      </Typography>
      {currentQuestion < allQuestions.length - 1 && (
        <Button
          variant="outlined"
          onClick={() => dispatch(setCurrentQuestion(currentQuestion + 1))}
        >
          <StartIcon />
        </Button>
      )}
      <WordCloud words={displayedWords} />
    </Container>
  );
}
