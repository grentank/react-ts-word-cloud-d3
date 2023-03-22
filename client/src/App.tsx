import React, { useState } from 'react';
import WordCloud from './components/WordCloud/WordCloud';
import type { WordType } from './types/wordTypes';

function App(): JSX.Element {
  const [dataWords, setDataWords] = useState<WordType[]>([]);

  const [value, setValue] = useState('');

  return (
    <div className="App">
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
