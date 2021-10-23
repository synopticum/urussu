import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { observer } from 'mobx-react-lite';
import Controls from './Controls';
import SplashScreen from './SplashScreen';
// import InfoScreen from './InfoScreen';
import loadable from '@loadable/component';
import { globalStore } from 'src/stores/GlobalStore';

const MapScreen = loadable(() => import(/* webpackPrefetch: true */ './MapScreen'));

const HomePage: React.FC<RouteComponentProps> = observer(() => {
  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0 }), 300);
  }, []);

  return (
    <>
      <Controls />

      <SplashScreen />
      {/*<InfoScreen isVisible={globalStore.currentScreen === 'info'} />*/}
      <MapScreen isVisible={globalStore.currentScreen === 'map'} />
    </>
  );
});

export default HomePage;
