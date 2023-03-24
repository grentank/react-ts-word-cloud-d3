import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WordsSliceType, WordType } from '../../../types/wordTypes';

const initialState: WordsSliceType = {
  displayedWords: [],
  allQuestions: [],
  currentQuestion: 0,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWordToDisplayedWords: (state, action: PayloadAction<WordType['text']>) => {
      const foundWord = state.displayedWords.find((word) => word.text.toLowerCase() === action.payload.toLowerCase());
      if (foundWord) foundWord.size += 1;
      else state.displayedWords.push({ text: action.payload, size: 1 });
    },
    setDisplayedWords: (state) => {
      state.displayedWords = state.allQuestions[state.currentQuestion].answers;
    },
    clearDisplayedWords: (state) => {
      state.displayedWords = [];
    },
    addWordToCurrentQuestion: (state, action: PayloadAction<WordType['text']>) => {
      const currentAnswers = state.allQuestions[state.currentQuestion].answers;
      const foundWord = currentAnswers.find((word) => word.text === action.payload);
      if (foundWord) foundWord.size += 1;
      else currentAnswers.push({ text: action.payload, size: 1 });
    },
    addWordAndDisplay: (state, action: PayloadAction<WordType['text']>) => {
      const currentAnswers = state.allQuestions[state.currentQuestion].answers;
      const foundWord = currentAnswers.find((word) => word.text === action.payload);
      if (foundWord) foundWord.size += 1;
      else currentAnswers.push({ text: action.payload, size: 1 });
      state.displayedWords = currentAnswers;
    },
  },
});

export const {
  setDisplayedWords,
  clearDisplayedWords,
  addWordToCurrentQuestion,
  addWordToDisplayedWords,
  addWordAndDisplay,
} = wordsSlice.actions;

export default wordsSlice.reducer;
