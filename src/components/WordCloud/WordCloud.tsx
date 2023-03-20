import type { Word } from 'd3-cloud';
import React, { useEffect } from 'react';
import type { LayoutWordType, WordType } from '../../types/wordTypes';
import clear from './clear';
import draw from './draw';
import prepareLayout from './prepareLayout';

export type WordCloudProps = {
  words: WordType[];
  size?: [number, number];
  rotate?: (arg0: Word, index: number) => number;
  font?: 'Impact';
  fontSize?: (arg0: Word) => number;
};

export default function WordCloud({ words, ...rest }: WordCloudProps): JSX.Element {
  useEffect(() => {
    const layout = prepareLayout({ words, ...rest });
    const readyLayout = layout.on('end', (layoutWords: LayoutWordType[]) =>
      draw(layoutWords, layout),
    );
    readyLayout.start();

    return clear;
  }, [words]);

  return <div id="wordcloud" />;
}
