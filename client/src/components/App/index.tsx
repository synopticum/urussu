import React from 'react';
import Layout from 'src/components/App/Layout';
import './mobxConfig';
import ErrorBoundary from 'src/components/ErrorBoundary';
import GlobalStyle from 'src/components/GlobalStyle';

const Providers: React.FC = ({ children }) => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <GlobalStyle />
        {children}
      </ErrorBoundary>
    </React.StrictMode>
  );
};

const App: React.FC = props => {
  return (
    <Providers {...props}>
      <Layout />
      <div id="ssr" />
    </Providers>
  );
};

export default App;
