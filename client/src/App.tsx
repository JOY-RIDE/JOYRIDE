import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authAPIState, loggedInState } from 'states/atoms';
import Layout from 'routes/Layout';
import Home from 'routes/Home';
import Roads from 'routes/Roads';
import Road from 'routes/Road';
import Meetups from 'routes/Meetups';
import Meetup from 'routes/Meetup';
import Login from 'routes/Login';
import AuthRoute from 'components/common/AuthRoute';
import Toast from 'components/common/Toast';
// import ErrorBoundary from 'components/ErrorBoundary';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { mainColor } from 'utils/constants';

const Search = lazy(() => import('routes/Search'));
const Signup = lazy(() => import('routes/Signup'));
const Mypage = lazy(() => import('routes/Mypage'));
const Error = lazy(() => import('routes/Error'));

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily:
      'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },

  palette: {
    primary: {
      main: mainColor,
    },
  },
});

const App = () => {
  const authAPI = useRecoilValue(authAPIState);
  const setLoggedIn = useSetRecoilState(loggedInState);

  useEffect(() => {
    authAPI.silentRefresh(setLoggedIn);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/*<ErrorBoundary> */}
      {/* TODO: Suspense 배치 */}
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="roads" element={<Roads />} />
            <Route path="roads/:roadId" element={<Road />} />
            <Route path="meetups" element={<Meetups />} />
            <Route path="meetups/:meetupId" element={<Meetup />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route element={<AuthRoute />}>
              <Route path="mypage" element={<Mypage />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Toast />
      </Suspense>
      {/* </ErrorBoundary> */}
    </ThemeProvider>
  );
};

export default App;
