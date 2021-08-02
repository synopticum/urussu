import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Content from 'src/features/App/Layout/Content';
import Controls from 'src/features/Page/Controls';
import { Fallback, Message, Image } from 'src/features/App/Layout/ContentFallback';

const Error404: React.FC<RouteComponentProps> = () => {
  return (
    <Content>
      <div>
        <Fallback>
          <Controls />
          <Message>
            <Image src="/images/common/spinner.gif" />
            <br />
            Запрошенной страницы не существует.
            <br />
            Попробуйте <a href="/">перейти на карту</a>.
          </Message>
        </Fallback>
      </div>
    </Content>
  );
};

export default Error404;
