import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import Drawer from './Drawer';
import { observer } from 'mobx-react-lite';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

type Props = {
  some?: string;
};

const Background: React.FC<Props> = observer(() => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [drawer] = useState<Drawer>(new Drawer());
  const { offsetWidth: width, offsetHeight: height } = document.querySelector('body');

  useEffect(() => {
    if (ref.current && !drawer.isReady) {
      drawer.initialize(ref.current);
    }
  }, [ref.current]);

  const mouseMove = (e: MouseEvent<HTMLCanvasElement>): void => drawer.mouseMove(e);

  return <Canvas width={width} height={height} ref={ref} onMouseMove={mouseMove} />;
});

export default Background;
