import React from 'react';
import GlobalStyle from 'src/features/App/GlobalStyle';
import { Meta, Story } from '@storybook/react/types-6-0';
import Textarea, { Props } from 'src/components/Textarea';

export default {
  title: 'GUI/Textarea',
  component: Textarea,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;

const Template: Story<Props> = args => (
  <>
    <GlobalStyle />
    <Textarea {...args} />
  </>
);

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Please enter text...',
  disabled: false,
  required: false,
};
