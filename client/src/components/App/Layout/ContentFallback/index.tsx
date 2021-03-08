import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';
import React from 'react';
import Aside from 'src/components/Page/Aside';
import Content, { Link } from 'src/components/App/Layout/Content';

const Fallback = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${color('white-1')};
`;

const Image = styled.img`
  width: 328px;
  height: 272px;
  margin-left: -40px;
`;

const Message = styled.div`
  text-align: center;
  line-height: 1.4;
`;

const ContentFallback: React.FC = () => {
  return (
    <Content>
      <div>
        <Fallback>
          <Aside />
          <Message>
            <Image src="/images/common/spinner.gif" />
            <br />
            Произошла неизвестная ошибка.
            <br />
            Пожалуйста, <Link onClick={(): void => window.location.reload()}>перезагрузите страницу</Link>.
          </Message>
        </Fallback>
      </div>
    </Content>
  );
};

export default ContentFallback;
