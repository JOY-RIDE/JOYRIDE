import { Outlet } from 'react-router-dom';
import Header from 'components/layout/Header';
import Container from 'components/common/Container';
import Footer from 'components/layout/Footer';
import styles from './Layout.module.scss';

const Layout = () => (
  <>
    <Header />
    <main className={styles.main}>
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
  </>
);

export default Layout;
