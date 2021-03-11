import React from 'react';
import Layout from 'src/features/App/Layout';
import './mobxConfig';
import ErrorBoundary from 'src/features/ErrorBoundary';
import GlobalStyle from 'src/features/App/GlobalStyle';

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
