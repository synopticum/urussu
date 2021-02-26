import React from 'react';
import { RouteComponentProps } from '@reach/router';

type Props = {
  id?: string;
} & RouteComponentProps;

const ChunkedPage: React.FC<Props> = ({ id }) => <div>chunked page {id}</div>;

export default ChunkedPage;
