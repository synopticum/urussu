import React from 'react';
import GlobalStyle from 'src/features/App/GlobalStyle';
import { Meta, Story } from '@storybook/react/types-6-0';
import FileInput, { Props } from 'src/components/FileInput';

export default {
  title: 'GUI/FileInput',
  component: FileInput,
} as Meta;

const Template: Story<Props> = args => (
  <>
    <GlobalStyle />
    <FileInput {...args} />
  </>
);

export const Default = Template.bind({});

Default.args = {
  accept: 'image/png, image/jpeg',
  onChange: (): void => {
    alert(1);
  },
};
