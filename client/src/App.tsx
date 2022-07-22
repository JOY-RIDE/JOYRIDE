import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'routes/Layout';
import Home from 'routes/Home';
import Roads from 'routes/Roads';
import Road from 'routes/Road';
import Meetups from 'routes/Meetups';
import Meetup from 'routes/Meetup';
import Login from 'routes/Login';
// import ErrorBoundary from 'components/ErrorBoundary';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const Search = lazy(() => import('routes/Search'));
const Signup = lazy(() => import('routes/Signup'));
const Mypage = lazy(() => import('routes/Mypage'));
const Error = lazy(() => import('routes/Error'));

const mainColor = '#22b573';
const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },

  palette: {
    primary: {
      main: mainColor,
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    {/*<ErrorBoundary> */}
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
          <Route path="mypage" element={<Mypage />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
    {/* </ErrorBoundary> */}
  </ThemeProvider>
);

export default App;
