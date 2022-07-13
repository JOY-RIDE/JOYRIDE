import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'routes/Layout';
import Home from 'routes/Home';
import Roads from 'routes/Roads';
import Road from 'routes/Road';
import MeetUps from 'routes/MeetUps';
import MeetUp from 'routes/MeetUp';
import Search from 'routes/Search';
// import ErrorBoundary from 'components/ErrorBoundary';

const MyPage = lazy(() => import('routes/MyPage'));
const Error = lazy(() => import('routes/Error'));

const App = () => (
  // <ErrorBoundary>
  <Suspense fallback={<div />}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="roads" element={<Roads />} />
        <Route path="roads/:roadId" element={<Road />} />
        <Route path="meetups" element={<MeetUps />} />
        <Route path="meetups/:meetupId" element={<MeetUp />} />
        <Route path="search" element={<Search />} />
        <Route path="mypage" element={<MyPage />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </Suspense>
  // </ErrorBoundary>
);

export default App;
