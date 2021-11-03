import styled from 'styled-components';
import React from 'react';
import Screen from 'src/features/App/Layout/Screen';
import theme from 'src/features/App/GlobalStyle/theme';

export const Fallback = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white.a};
`;

export const Image = styled.img`
  width: 328px;
  height: 272px;
  margin-left: -40px;
`;

export const Message = styled.div`
  text-align: center;
  line-height: 1.4;
`;

const ContentFallback: React.FC = () => {
  const reload = (): void => window.location.reload();

  return (
    <Screen>
      <div>
        <Fallback>
          {/*<Controls />*/}
          <Message>
            <Image src="/images/common/spinner.gif" />
            <br />
            Произошла неизвестная ошибка.
            <br />
            Пожалуйста, <a href="/">перезагрузите страницу</a>.
          </Message>
        </Fallback>
      </div>
    </Screen>
  );
};

export default ContentFallback;
