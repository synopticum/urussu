import React from 'react';
import GlobalStyle from 'src/features/GlobalStyle';
import TextInput, { Props } from 'src/components/TextInput/index';
import { Meta, Story } from '@storybook/react/types-6-0';

export default {
  title: 'GUI/TextInput',
  component: TextInput,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;

const Template: Story<Props> = args => (
  <>
    <GlobalStyle />
    <TextInput {...args} />
  </>
);

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
};
