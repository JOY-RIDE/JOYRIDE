import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'routes/Layout/Layout';
import Home from 'routes/Home/Home';
// import ErrorBoundary from 'components/ErrorBoundary';

const Error = lazy(() => import('routes/Error/Error'));

const App = () => (
  // <ErrorBoundary>
  <Suspense fallback={<div />}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </Suspense>
  // </ErrorBoundary>
);

export default App;
