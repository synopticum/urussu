import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { globalStore } from 'src/stores';
import Timer from './Timer';
import { observer } from 'mobx-react-lite';

type Props = {} & RouteComponentProps;

const HomePage: React.FC<Props> = observer(() => {
  const { isFetching, error, data } = globalStore.apiData;
  const content = isFetching ? <div>Fetching...</div> : error ? <div>Error: {error}</div> : <div>{data}</div>;

  return (
    <div>
      <h1>Trulala trulala 2!</h1>
      <div>{globalStore.title}</div>
      <div>{content}</div>
      <div>
        <button onClick={(): Promise<void> => globalStore.fetchData()}>test async</button>
      </div>
      <Timer />
    </div>
  );
});

export default HomePage;
