import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from './components/HOC/PrivateRouter';
import Spinner from './components/HOC/Spinner';
import HomePage from './components/pages/HomePage/HomePage';
import SignupPage from './components/pages/SignupPage/SignupPage';
import WordCloudPage from './components/pages/WordCloudPage/WordCloudPage';
import NavBar from './components/ui/NavBar';
import { checkUserActionThunk } from './features/redux/asyncThunks/userThunks';
import { useAppDispatch, useAppSelector } from './features/redux/hooks';
import { AUTHORIZED, GUEST, LOADING } from './types/userTypes';
import { wsInitAction } from './features/actions/wsActions';
import AnswersPage from './components/pages/AnswersPage/AnswersPage';
import EditQuestionsPage from './components/pages/EditQuestionsPage/EditQuestionsPage';

function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkUserActionThunk());
  }, []);

  useEffect(() => {
    if (user.status !== LOADING) dispatch(wsInitAction());
  }, [user]);

  return (
    <Spinner spinning={user.status === LOADING}>
      <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <PrivateRouter isAllowed={user.status === GUEST} redirectTo="/wordcloud">
                <SignupPage />
              </PrivateRouter>
            }
          />
          <Route element={<PrivateRouter isAllowed={user.status === AUTHORIZED} redirectTo="/" />}>
            <Route path="/wordcloud" element={<WordCloudPage />} />
            <Route path='/edit' element={<EditQuestionsPage />} />
          </Route>
          <Route
            path="/answers"
            element={
              <PrivateRouter isAllowed={user.status === GUEST} redirectTo="/">
                <AnswersPage />
              </PrivateRouter>
            }
          />
        </Routes>
      </Container>
    </Spinner>
  );

  // <div className="App">
  //   <input value={value} onChange={(e) => setValue(e.target.value)} />
  //   <button
  //     type="button"
  //     onClick={() => {
  //       setDataWords((prev) => [
  //         { text: value, size: Math.floor(Math.random() * 40) + 10 },
  //         ...prev,
  //       ]);
  //       setValue('');
  //     }}
  //   >
  //     add
  //   </button>
  //   <WordCloud words={dataWords} />
  // </div>
}

export default App;
