import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userIDState } from 'states/auth';
import { authAPI } from 'apis/authAPI';
import Layout from 'routes/Layout';
import Home from 'routes/Home';
import Roads from 'routes/Roads';
import Road from 'routes/Road';
import Meetups from 'routes/Meetups';
import Meetup from 'routes/Meetup';
import Login from 'routes/Login';
import Toast from 'components/common/Toast';
import PublicRoute from 'components/common/PublicRoute';
// import ErrorBoundary from 'components/ErrorBoundary';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { MAIN_COLOR } from 'utils/constants';
import { Theme as MuiTheme } from '@mui/material/styles';
import PrivateRoute from 'components/common/PrivateRoute';
import Search from 'routes/Search';

const Signup = lazy(() => import('routes/Signup'));
const FindEmail = lazy(() => import('routes/FindEmail'));
const ResetPassword = lazy(() => import('routes/ResetPassword'));
const Mypage = lazy(() => import('routes/Mypage'));
const Error = lazy(() => import('routes/Error'));

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
}

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily:
      'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },

  palette: {
    primary: {
      main: MAIN_COLOR,
    },
  },
});

const App = () => {
  const setUserID = useSetRecoilState(userIDState);
  const { silentRefresh } = authAPI;
  useEffect(() => {
    silentRefresh(setUserID);
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

            <Route element={<PrivateRoute />}>
              <Route path="mypage" element={<Mypage />} />
            </Route>

            <Route element={<PublicRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="find_email" element={<FindEmail />} />
              <Route path="reset_password" element={<ResetPassword />} />
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
