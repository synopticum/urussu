import React from 'react';
import GlobalStyle from 'src/features/App/GlobalStyle';
import { Meta, Story } from '@storybook/react/types-6-0';
import ImageFileInput, { Props } from 'src/components/ImageFileInput';

export default {
  title: 'GUI/FileInput',
  component: ImageFileInput,
} as Meta;

const Template: Story<Props> = args => (
  <>
    <GlobalStyle />
    <ImageFileInput {...args} />
  </>
);

export const Default = Template.bind({});

Default.args = {
  accept: 'image/png, image/jpeg',
  onChange: (): void => {
    alert(1);
  },
};
