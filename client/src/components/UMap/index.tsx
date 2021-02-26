import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { map, tileLayer, GridLayer, LatLngBounds } from 'leaflet';
import styled from 'styled-components';

const width = 10000;
const height = 6250;
const minZoom = 4;
const maxZoom = 6;
const maxBounds = [
  [39.5, -180],
  [100, 39.5],
];

const doesBrowserSupportWebP = (): boolean => {
  const elem = document.createElement('canvas');

  if (!!(elem.getContext && elem.getContext('2d'))) {
    // was able or not to get WebP representation
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // very old browser like IE 8, canvas not supported
  return false;
};

type Props = {};

const MapContainer = styled.div`
  cursor: grab;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  pointer-events: all;

  &:active {
    cursor: grabbing;
  }

  &::before,
  &::after {
    content: '';
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 500;
  }

  /* shadow */
  &::before {
    box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.9);
  }

  /* overlay */
  &::after {
    opacity: 0.05;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAADAQMAAABs5if8AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAA5JREFUCNdjeMDQwNAAAAZmAeFpNQSMAAAAAElFTkSuQmCC');
  }
`;

const UMap: React.FC<Props> = props => {
  const mapRef = useRef(null);

  const createMapInstance = (): void => {
    mapRef.current = map('map', {});
    mapRef.current.doubleClickZoom.disable();
  };

  const apply1pxGapFix = (): void => {
    if (window.navigator.userAgent.indexOf('Chrome') > -1) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const originalInitTile = GridLayer.prototype._initTile;
      GridLayer.include({
        _initTile: function (tile: { style: { width: string; height: string } }) {
          originalInitTile.call(this, tile);
          // eslint-disable-next-line react/no-this-in-sfc
          const tileSize = this.getTileSize();
          tile.style.width = tileSize.x + 1 + 'px';
          tile.style.height = tileSize.y + 1 + 'px';
        },
      });
    }
  };

  const setDefaultSettings = (): void => {
    let lat = 69.65;
    let lng = -20.25;
    let zoom = 5;

    if (location.search) {
      const params = new URLSearchParams(location.search);
      lat = parseInt(params.get('lat'));
      lng = parseInt(params.get('lng'));
      zoom = parseInt(params.get('zoom'));
    } else {
      const url = `?lat=${lat.toFixed(2)}&lng=${lng.toFixed(2)}&zoom=${zoom}`;
      window.history.replaceState({}, '', url);
    }

    mapRef.current.setView([lat, lng], zoom);
  };

  const setMaxBounds = (): void => {
    mapRef.current.setMaxBounds(maxBounds);
  };

  const initializeTiles = (): void => {
    const bounds = new LatLngBounds(
      mapRef.current.unproject([0, height], maxZoom),
      mapRef.current.unproject([width, 0], maxZoom),
    );
    const tileExtension = doesBrowserSupportWebP() ? 'png.webp' : 'png';

    tileLayer(`/images/tiles/{z}/{x}/{y}.${tileExtension}`, {
      minZoom: minZoom,
      maxZoom: maxZoom,
      bounds,
      noWrap: true,
    }).addTo(mapRef.current);
  };

  const _drawMap = (): void => {
    createMapInstance();
    apply1pxGapFix();
    setDefaultSettings();
    setMaxBounds();
    initializeTiles();
  };

  useEffect(() => {
    _drawMap();
  }, []);

  return <MapContainer id="map" ref={mapRef} />;
};

export default UMap;
