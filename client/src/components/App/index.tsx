import React from 'react';
import Layout from 'src/components/App/Layout';
import Providers from 'src/providers';
import './mobxConfig';

type Props = {};

const App: React.FC<Props> = props => {
  return (
    <Providers {...props}>
      <Layout />
      <div id="ssr" />
    </Providers>
  );
};

export default App;
