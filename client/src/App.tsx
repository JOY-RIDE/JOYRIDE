import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userIdState } from 'states/auth';
import { authAPI } from 'apis/authAPI';
import Layout from 'routes/Layout';
import Home from 'routes/Home';
import Roads from 'routes/Roads';
import Road from 'routes/Road';
import MapDetail from 'components/road/MapDetail';
import Meetups from 'routes/Meetups';
import Meetup from 'routes/Meetup';
import Login from 'routes/AuthPage/Login';
import Toast from 'components/common/Toast';
// import ErrorBoundary from 'components/ErrorBoundary';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { MAIN_COLOR } from 'utils/constants';
import { Theme as MuiTheme } from '@mui/material/styles';
import PrivateRoute from 'components/common/PrivateRoute';
import Search from 'routes/Search';
import AuthPage from 'routes/AuthPage';
import PublicOnlyRoute from 'components/common/PublicOnlyRoute';
import Modal from 'components/common/Modal';
import Signup from 'routes/AuthPage/Signup';
import FindEmail from 'routes/AuthPage/FindEmail';
import ResetPassword from 'routes/AuthPage/ResetPassword';
import MyPage from 'routes/Mypage';
import MyMeetups from 'routes/Mypage/MyMeetups';
import JoinedMeetups from 'routes/Mypage/JoinedMeetups';
import BookmarkedMeetups from 'routes/Mypage/BookmarkedMeetups';

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

interface locationProps {
  state: {
    lat: number;
    lng: number;
  };
}

const App = () => {
  const setUserId = useSetRecoilState(userIdState);
  const { silentRefresh } = authAPI;
  useEffect(() => {
    silentRefresh(setUserId);
  }, []);

  const location = useLocation() as locationProps;
  const lat = location.state?.lat;
  const lng = location.state?.lng;

  return (
    <ThemeProvider theme={theme}>
      {/*<ErrorBoundary> */}
      {/* TODO: Suspense 배치 */}
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="roads">
              <Route index element={<Roads />} />
              <Route path=":roadId">
                <Route index element={<Road />} />
                <Route path="map" element={<MapDetail lat={lat} lng={lng} />} />
              </Route>
            </Route>

            <Route path="meetups">
              <Route index element={<Meetups />} />
              <Route path=":meetupId" element={<Meetup />} />
            </Route>

            <Route path="search" element={<Search />} />

            <Route element={<PrivateRoute />}>
              <Route path="mypage">
                <Route index element={<MyPage />} />
                <Route path="meetups/admin" element={<MyMeetups />} />
                <Route path="meetups/join" element={<JoinedMeetups />} />
                <Route path="like/courses" element={<MyPage />} />
                <Route
                  path="bookmark/meetups"
                  element={<BookmarkedMeetups />}
                />
              </Route>
            </Route>

            <Route element={<PublicOnlyRoute />}>
              <Route path="auth" element={<AuthPage />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="find_email" element={<FindEmail />} />
                <Route path="reset_password" element={<ResetPassword />} />
              </Route>
            </Route>

            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <Modal />
        <Toast />
      </Suspense>
      {/* </ErrorBoundary> */}
    </ThemeProvider>
  );
};

export default App;
