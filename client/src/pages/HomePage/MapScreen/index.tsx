import React from 'react';
import Map from 'src/pages/MapPage/Map';
import Controls from 'src/features/Page/Controls';
import Screen from 'src/features/App/Layout/Screen';

type Props = {
  isVisible: boolean;
};

const MapScreen: React.FC<Props> = ({ isVisible }) => {
  return (
    <Screen>
      {isVisible && (
        <>
          <Map />
          <Controls />
        </>
      )}
    </Screen>
  );
};

export default MapScreen;
