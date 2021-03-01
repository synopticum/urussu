import React from 'react';
import { Link, Router } from '@reach/router';
import styled from 'styled-components';
import loadable from '@loadable/component';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import ErrorBoundary from '../../ErrorBoundary';
import Error404 from 'src/pages/Error404Page';
import { color } from 'src/components/GlobalStyle/theme';

const Home = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/HomePage'));
const Map = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/MapPage'));
const ContactUs = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/ContactUsPage'));
const ChunkedPage = loadable(() => import(/* webpackPrefetch: true */ '../../../pages/ChunkedPage'));

const Content = styled.div`
  display: flex;
  flex: 1 1 0;

  & > div {
    position: relative;
    flex: 1;
    background-color: ${color('black-1')};
    --inner-border: 15px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      pointer-events: none;
    }

    &::after {
      left: 65px;
      top: var(--inner-border);
      width: calc(100% - 65px - var(--inner-border));
      height: calc(100% - var(--inner-border) * 2);
      z-index: 495;
      box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.9);
    }

    &::before {
      left: 65px;
      top: 0;
      z-index: 500;
      width: calc(100% - 50px - var(--inner-border) * 2);
      height: calc(100% - 30px);
      margin: 15px 15px 15px 0;
      box-sizing: border-box;
      background: transparent;
      border-radius: 10px;
      box-shadow: rgb(17 17 17) 0 0 0 10px;
      outline: var(--inner-border) solid ${color('black-1')};
    }
  }
`;

type Props = {};

const Layout: React.FC<Props> = () => {
  return (
    <>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      <ErrorBoundary>
        <Content>
          <Router primary={false}>
            <Home path="/" />
            <Map path="/map/" />
            <ContactUs path="/contact-us/" />
            <ChunkedPage path="/chunked-page/:id" />
            <Error404 default />
          </Router>
        </Content>
      </ErrorBoundary>

      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default Layout;
