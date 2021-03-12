import React from 'react';
import GlobalStyle from 'src/features/App/GlobalStyle';
import { Meta, Story } from '@storybook/react/types-6-0';
import UploadImage, { Props } from 'src/components/UploadImage';

export default {
  title: 'GUI/UploadImage',
  component: UploadImage,
} as Meta;

const Template: Story<Props> = args => (
  <>
    <GlobalStyle />
    <UploadImage {...args} />
  </>
);

export const Default = Template.bind({});

Default.args = {
  entityType: 'object',
  entityId: '1234',
  onUploadCompleted: (): void => {
    alert(123);
  },
  selectedImageId: '123',
};
