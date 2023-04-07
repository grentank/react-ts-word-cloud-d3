import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import StartIcon from '@mui/icons-material/Start';
import { useAppDispatch, useAppSelector } from '../../../features/redux/hooks';
import WordCloud from '../../WordCloud/WordCloud';
import { setCurrentQuestion } from '../../../features/redux/slices/wordsSlice';
import { wsSendCurrentQuestion } from '../../../features/actions/wsActions';

export default function WordCloudPage(): JSX.Element {
  const { displayedWords, allQuestions, currentQuestion } = useAppSelector((store) => store.words);
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Typography variant="h2" component="div">
        {allQuestions[currentQuestion].question}
      </Typography>
      {currentQuestion > 0 && (
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(wsSendCurrentQuestion(currentQuestion - 1));
            dispatch(setCurrentQuestion(currentQuestion - 1));
          }}
        >
          Предыдущий вопрос
        </Button>
      )}
      {currentQuestion < allQuestions.length - 1 && (
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(wsSendCurrentQuestion(currentQuestion + 1));
            dispatch(setCurrentQuestion(currentQuestion + 1));
          }}
        >
          <StartIcon />
          Следующий вопрос
        </Button>
      )}
      <WordCloud words={allQuestions[currentQuestion].answers} />
    </Container>
  );
}
