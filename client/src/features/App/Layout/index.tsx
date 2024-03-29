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
import Screen from 'src/features/App/Layout/Screen';

const Home = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/HomePage'));
const Map = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/MapPage'));
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
      <ErrorBoundary fallback={ContentFallback}>
        <Router primary={false}>
          <Home path="/" />
          <Map path="/map" />
          {/*<ChunkedPage path="/chunked-page/:id" />*/}
          <LoginPage path="/login" />
          <Error404 default />
        </Router>
      </ErrorBoundary>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
});

export default Layout;
