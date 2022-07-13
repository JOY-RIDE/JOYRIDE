import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import styles from './Layout.module.scss';

const Layout = () => (
  <>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default Layout;
