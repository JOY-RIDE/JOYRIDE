import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header';
import Container from 'components/common/Container';
import Footer from 'components/layout/Footer';

const Layout = () => (
  <>
    <Header />
    <main>
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
  </>
);

export default Layout;
