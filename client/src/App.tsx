import React, { useEffect, useState } from 'react';
import WordCloud from './components/WordCloud/WordCloud';
import type { WordType } from './types/wordTypes';
import words from './words';

type BadWord = { key: string; value: number };

const mapWords = (wordsFrom: BadWord[]): WordType[] =>
  wordsFrom.map((word) => ({ text: word.key, size: word.value * 15 }));

function App(): JSX.Element {
  // const [timer, setTimer] = useState(2);
  // mapWords(words)
  const [dataWords, setDataWords] = useState<WordType[]>([]);

  // console.log(dataWords);

  const [value, setValue] = useState('');

  return (
    <div className="App" id="app">
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        type="button"
        onClick={() => {
          setDataWords((prev) => [
            { text: value, size: Math.floor(Math.random() * 40) + 10 },
            ...prev,
          ]);
          setValue('');
        }}
      >
        add
      </button>
      <WordCloud words={dataWords} />
    </div>
  );
}

export default App;
