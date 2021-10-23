import React from 'react';
import Screen from 'src/features/App/Layout/Screen';

type Props = {
  isVisible: boolean;
};

const InfoScreen: React.FC<Props> = ({ isVisible }) => {
  return <Screen>{isVisible && <>text</>}</Screen>;
};

export default InfoScreen;
