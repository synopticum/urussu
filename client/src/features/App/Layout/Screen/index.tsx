import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import React from 'react';
import ReactDOM from 'react-dom';

export const StyledScreen = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex: 1 1 0;
  background-color: ${theme.colors.black.a};
`;

export const Wrapper = styled.div`
  position: relative;
  flex: 1;
  --inner-border: 10px;

  &::before {
    ${theme.chunks.innerBorder()}
    display: none;

    @media only screen and (min-width: 1000px) {
      display: block;
    }
  }

  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 495;
    box-shadow: inset 0 0 200px rgba(0, 0, 0, 0.9);
  }
`;

const Screen: React.FC = ({ children }) => {
  return (
    <StyledScreen>
      <Wrapper>{children}</Wrapper>
    </StyledScreen>
  );
};

export default Screen;
