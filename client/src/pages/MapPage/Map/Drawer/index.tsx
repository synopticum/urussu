import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { mapStore } from 'src/stores/MapStore';
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { objectsStore } from 'src/stores/MapStore/ObjectsStore';

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

          drawError: {
            color: '#e1e100',
            message: "<strong>Oh snap!<strong> you can't draw that!",
          },

          shapeOptions: {
            color: '#97009c',
          },
        },
        polyline: {
          shapeOptions: {
            color: '#f357a1',
            weight: 10,
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
          objectsStore.addObject(coordinates);
        }
        break;

      case types.path:
        {
          const coordinates = layer.editing.latlngs[0];
          // this.addPathToMap(coordinates);
        }
        break;

      case types.circle:
        {
          const radius = layer._mRadius;
          const latlng = layer._latlng;
          // this.addCircleToMap(latlng, radius);
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

  return <>Hello</>;
});

export default Drawer;
