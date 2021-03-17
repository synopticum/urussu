import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import Page from 'src/features/Page';
import Controls from 'src/features/Page/Controls';
import Content from 'src/features/Page/Content';

const StyledContactUsPage = styled(Page)``;

const ContactUs: React.FC<RouteComponentProps> = () => (
  <StyledContactUsPage>
    <Controls>zz</Controls>
    <Content>contact us</Content>
  </StyledContactUsPage>
);

export default ContactUs;
