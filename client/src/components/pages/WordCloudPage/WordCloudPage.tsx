import { Container } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../features/redux/hooks';
import WordCloud from '../../WordCloud/WordCloud';

export default function WordCloudPage(): JSX.Element {
    const displayedWords = useAppSelector((store) => store.words.displayedWords)
  return (<Container>
    <WordCloud words={displayedWords} />
  </Container>);
}
