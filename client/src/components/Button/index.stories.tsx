import React from 'react';
import GlobalStyle from 'src/features/App/GlobalStyle';
import { Meta, Story } from '@storybook/react/types-6-0';
import Button, { Props } from 'src/components/Button';

export default {
  title: 'GUI/Button',
  component: Button,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;

const Template: Story<Props> = args => (
  <>
    <GlobalStyle />
    <Button {...args}>Submit me</Button>
  </>
);

export const Default = Template.bind({});

Default.args = {
  disabled: false,
  required: false,
};
