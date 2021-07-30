import styled from 'styled-components';
import { DotMapped } from 'src/stores/MapStore/EntityStore/DotStore/map';
import { ObjectMapped } from 'src/stores/MapStore/EntityStore/ObjectStore/map';
import { PathMapped } from 'src/stores/MapStore/EntityStore/PathStore/map';
import theme from 'src/features/App/GlobalStyle/theme';
import { Map } from 'leaflet';
import 'leaflet.path.drag';
import { Mode } from 'src/stores/MapStore';

export const removeCurrentEntities = (map: Map, type: 'dots' | 'objects' | 'circles' | 'paths'): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const _layers = map._layers;
  const layers = Object.entries(_layers);

  for (const layer of layers) {
    const [id] = layer;
    const _layer = _layers[id];

    const { color, weight, icon, rotationAngle, radius } = _layer.options;
    const isDot = Boolean(icon && rotationAngle);
    const isObject = color !== 'green' && weight === 2;
    const isCircle = Boolean(radius);
    const isPath = color === 'green' && weight === 8;

    const conditions = {
      dots: isDot,
      objects: isObject,
      circles: isCircle,
      paths: isPath,
    };

    if (_layer._path !== undefined && conditions[type]) {
      map.removeLayer(_layer);
    }
  }
};

export const getClassName = (item: DotMapped | ObjectMapped | PathMapped): string => {
  let className = `id_${item.id}`;

  if (item.images) {
    className += ' leaflet-interactive--has-images';
  }

  return `${className}`;
};

const Container = styled.div<{ mode?: Mode }>`
  cursor: ${({ mode }): string => (mode === 'add' ? 'default !important' : 'grab')};
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.black.a};
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
    z-index: 495;
  }

  /* shadow */
  &::before {
    box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.9);
  }

  /* overlay */
  &::after {
    opacity: 0.05;
    background: url('/images/grid.png');
  }

  .leaflet-marker-icon {
    cursor: pointer !important;
    background: rgb(232, 168, 38);
    border: 2px solid rgb(182, 118, -12);
    border-radius: 50%;
  }

  .leaflet-marker-icon::before {
    pointer-events: none;
    content: '';
    position: absolute;
    transform: rotate(-90deg);
    box-sizing: border-box;
  }

  .leaflet-marker-icon::after {
    pointer-events: none;
    opacity: 0;
    content: '';
    position: absolute;
    left: -5px;
    bottom: -5px;
    width: 20px;
    height: 70px;
    background: rgb(255, 241, 224);
    transform: perspective(25px) rotateX(-40deg);
    transition: opacity 0.3s;
    filter: blur(5px);
  }

  .leaflet-marker-icon:hover::after {
    opacity: 0.3;
  }

  .leaflet-marker-icon:focus {
    outline: none;
  }

  .leaflet-marker-icon__gold {
    background-color: #ffb631;
    border-color: darkgoldenrod;
  }

  .leaflet-marker-icon:hover {
    opacity: 1;
  }

  .leaflet-marker-icon--is-updating {
    cursor: default;
    pointer-events: none;
    opacity: 0.3;
    filter: grayscale(100%);
  }

  path.leaflet-interactive {
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
  }

  path.leaflet-interactive:hover {
    opacity: 1;
  }

  path.leaflet-interactive--error {
    pointer-events: none;
    opacity: 0.75;
    animation-name: disappear;
    animation-duration: 2000ms;
    animation-fill-mode: forwards;
  }

  path.leaflet-interactive--has-images {
    opacity: 0;
  }

  @keyframes disappear {
    0% {
      opacity: 0.75;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      display: none;
      opacity: 0;
    }
  }

  .leaflet-control-attribution {
    margin: 0 20px 20px 0 !important;
    background: none !important;
  }

  .leaflet-control-attribution a {
    color: #fff !important;
    text-decoration: none !important;
    opacity: 0.5;
  }

  .leaflet-control-layers {
    display: none;
  }

  .leaflet-top.leaflet-left {
    left: 58px;
    top: 13px;
  }

  .leaflet-draw-draw-polyline {
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
  }

  .leaflet-draw-draw-circle {
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
  }
`;

export default Container;
