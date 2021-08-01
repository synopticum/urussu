import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import loadable from '@loadable/component';
import Header from 'src/features/Header';
import Footer from 'src/features/Footer';
import ErrorBoundary from '../../ErrorBoundary';
import Error404 from 'src/pages/Error404Page';
import LoginPage from 'src/pages/Login/LoginPage';
import { observer } from 'mobx-react-lite';
import { authStore } from 'src/stores/AuthStore';
import { userStore } from 'src/stores/UserStore';
import ContentFallback from 'src/features/App/Layout/ContentFallback';
import Content from 'src/features/App/Layout/Content';

const Home = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/HomePage'));
const Map = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/MapPage'));
const ContactUs = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/ContactUsPage'));
const ChunkedPage = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/ChunkedPage'));

const Layout: React.FC = observer(() => {
  const { isLogged } = authStore;

  useEffect(() => {
    authStore.login();
  }, []);

  useEffect(() => {
    if (isLogged) userStore.fetchApiData();
  }, [isLogged]);

  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      <ErrorBoundary fallback={ContentFallback}>
        <Content>
          <Router primary={false}>
            <Map path="/" />
            {/*<Home path="/" />*/}
            {/*<Map path="/map/" />*/}
            {/*<ContactUs path="/contact-us/" />*/}
            {/*<ChunkedPage path="/chunked-page/:id" />*/}
            <LoginPage path="/login" />
            <Error404 default />
          </Router>
        </Content>
      </ErrorBoundary>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
});

export default Layout;
