import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { mapStore } from 'src/stores/MapStore';
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { objectsStore } from 'src/stores/MapStore/ObjectsStore';
import { pathsStore } from 'src/stores/MapStore/PathsStore';

const drawTools = (map: L.Map): void => {
  const editableLayers = new L.FeatureGroup();
  const types = {
    object: 'polygon',
    path: 'polyline',
    circle: 'circle',
  };

  map.addLayer(editableLayers);

  map.addControl(
    new L.Control.Draw({
      position: 'topleft',
      draw: {
        polygon: {
          allowIntersection: false,
          shapeOptions: {
            color: 'transparent',
          },
        },
        polyline: {
          shapeOptions: {
            color: 'transparent',
          },
        },
        circle: {},
        rectangle: false,
        marker: false,
        circlemarker: false,
      },
    }),
  );

  map.on('draw:created', e => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const type = e.layerType;
    const layer = e.layer;

    switch (type) {
      case types.object:
        {
          const coordinates = layer.editing.latlngs[0];
          objectsStore.add('object', coordinates);
        }
        break;

      case types.path:
        {
          const coordinates = layer.editing.latlngs[0];
          pathsStore.add(coordinates);
        }
        break;

      case types.circle:
        {
          const coordinates = layer._latlng;
          const radius = layer._mRadius;
          objectsStore.add('circle', coordinates, radius);
        }
        break;
    }

    editableLayers.addLayer(layer);
  });
};

const Drawer: React.FC = observer(() => {
  useEffect(() => {
    if (mapStore.map) drawTools(mapStore.map);
  }, [mapStore.map]);

  useEffect(() => {
    return (): void => {
      // clean up
    };
  }, []);

  return null;
});

export default Drawer;
