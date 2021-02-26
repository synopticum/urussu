import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary/';
import GlobalStyle from 'src/components/GlobalStyle';

export type Props = {};

const Providers: React.FC<Props> = ({ children }) => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <GlobalStyle />
        {children}
      </ErrorBoundary>
    </React.StrictMode>
  );
};

export default Providers;
