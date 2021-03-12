import React from 'react';
import GlobalStyle from 'src/features/App/GlobalStyle';
import { Meta, Story } from '@storybook/react/types-6-0';
import Checkbox, { Props } from 'src/components/Checkbox';

export default {
  title: 'GUI/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<Props> = args => (
  <>
    <GlobalStyle />
    <Checkbox {...args}>My label</Checkbox>
  </>
);

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  required: false,
};
