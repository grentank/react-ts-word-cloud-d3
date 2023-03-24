import type { layout } from 'd3';
import type { Word } from 'd3-cloud';
import cloud from 'd3-cloud';
import type { WordCloudProps } from './WordCloud';

export default function prepareLayout({
  words: dataWords,
  size = [500, 500],
  rotate = () => Math.floor(Math.random() * 2) * 90,
  font = 'Impact',
  fontSize = (word) => Math.sqrt(word.size * 10) * 8 || 1, // Здесь можно использовать log2
}: WordCloudProps): layout.Cloud<Word> {
  return (
    cloud()
      .size(size)
      .words(dataWords)
      // .padding(5)
      .rotate(rotate)
      .font(font)
      .fontSize(fontSize)
  );
}
