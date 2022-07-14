import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'routes/Layout';
import Home from 'routes/Home';
import Roads from 'routes/Roads';
import Road from 'routes/Road';
import Meetups from 'routes/Meetups';
import Meetup from 'routes/Meetup';
// import ErrorBoundary from 'components/ErrorBoundary';

const Search = lazy(() => import('routes/Search'));
const Login = lazy(() => import('routes/Login'));
const Signup = lazy(() => import('routes/Signup'));
const Mypage = lazy(() => import('routes/Mypage'));
const Error = lazy(() => import('routes/Error'));

const App = () => (
  // <ErrorBoundary>
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
  // </ErrorBoundary>
);

export default App;
