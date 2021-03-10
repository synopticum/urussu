import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import Page from 'src/features/Page';
import Aside from 'src/features/Page/Aside';
import Content from 'src/features/Page/Content';

type Props = {} & RouteComponentProps;

const StyledContactUsPage = styled(Page)``;

const ContactUs: React.FC<Props> = () => (
  <StyledContactUsPage>
    <Aside>zz</Aside>
    <Content>contact us</Content>
  </StyledContactUsPage>
);

export default ContactUs;
