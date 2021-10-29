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
  background-color: ${theme.colors.white.a};
`;

export const Wrapper = styled.div`
  position: relative;
  flex: 1;
  --inner-border: 10px;
`;

const Screen: React.FC = ({ children }) => {
  return (
    <StyledScreen>
      <Wrapper>{children}</Wrapper>
    </StyledScreen>
  );
};

export default Screen;
