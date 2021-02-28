import styled from 'styled-components';

const Container = styled.div<{ currentZoom: number }>`
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

  .leaflet-marker-icon {
    cursor: default !important;
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
    opacity: 0.5;
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
    /*opacity: .75;*/
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
    /*opacity: .75;*/
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
`;

export default Container;
