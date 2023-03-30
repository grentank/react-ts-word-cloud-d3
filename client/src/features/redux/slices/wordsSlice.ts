import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  AnswerType,
  EditQuestionFormType,
  QuestionType,
  WordsSliceType,
  WordType,
} from '../../../types/wordTypes';

const initialState: WordsSliceType = {
  displayedWords: [],
  allQuestions: [{ question: 'Введите первый вопрос', answers: [] }],
  currentQuestion: 0,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWordToDisplayedWords: (state, action: PayloadAction<WordType['text']>) => {
      const foundWord = state.displayedWords.find(
        (word) => word.text.toLowerCase() === action.payload.toLowerCase(),
      );
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
    addWordFromBackend: (state, action: PayloadAction<AnswerType>) => {
      const targetAnswers = state.allQuestions[action.payload.questionIndex].answers;
      const foundWord = targetAnswers.find((word) => word.text === action.payload.text);
      if (foundWord) foundWord.size += 1;
      else targetAnswers.push({ text: action.payload.text, size: 1 });
    },
    addWordAndDisplay: (state, action: PayloadAction<WordType['text']>) => {
      const currentAnswers = state.allQuestions[state.currentQuestion].answers;
      const foundWord = currentAnswers.find((word) => word.text === action.payload);
      if (foundWord) foundWord.size += 1;
      else currentAnswers.push({ text: action.payload, size: 1 });
      state.displayedWords = currentAnswers;
    },
    setQuestionTitle: (state, action: PayloadAction<EditQuestionFormType>) => {
      state.allQuestions[action.payload.index].question = action.payload.question;
    },
    addEmptyQuestion: (state) => {
      state.allQuestions.push({
        question: 'Введи вопрос',
        answers: [],
      });
    },
    removeLastQuestion: (state) => {
      if(state.allQuestions.length <= 1) return;
      if(state.currentQuestion >= state.allQuestions.length - 1) {
        state.currentQuestion = state.allQuestions.length - 2;
      }
      state.allQuestions.pop();
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestion = action.payload;
      state.displayedWords = state.allQuestions[action.payload].answers;
    },
  },
});

export const {
  setDisplayedWords,
  clearDisplayedWords,
  addWordToCurrentQuestion,
  addWordToDisplayedWords,
  addWordAndDisplay,
  setQuestionTitle,
  addEmptyQuestion,
  removeLastQuestion,
  setCurrentQuestion,
  addWordFromBackend
} = wordsSlice.actions;

export default wordsSlice.reducer;
