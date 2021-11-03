import React from 'react';
import { RouteComponentProps } from '@reach/router';
import Screen from 'src/features/App/Layout/Screen';
import Controls from 'src/features/Page/Controls';
import { Fallback, Image, Message } from 'src/features/App/Layout/ContentFallback';

const Error404: React.FC<RouteComponentProps> = () => {
  return (
    <Screen>
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
    </Screen>
  );
};

export default Error404;
