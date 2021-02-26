import React from 'react';
import { RouteComponentProps } from '@reach/router';
import UMap from 'src/components/UMap';

type Props = {} & RouteComponentProps;

const Map: React.FC<Props> = () => <UMap />;

export default Map;
