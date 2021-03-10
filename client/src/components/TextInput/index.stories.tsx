import React from 'react';
import { storiesOf } from '@storybook/react';
import GlobalStyle from 'src/features/GlobalStyle';
import TextInput from 'src/components/TextInput/index';

storiesOf('GUI', module).add('TextInput', () => (
  <>
    <GlobalStyle />
    <TextInput primary />
  </>
));
