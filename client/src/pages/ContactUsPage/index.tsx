import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import Page from 'src/components/Page';
import Aside from 'src/components/Page/Aside';
import Content from 'src/components/Page/Content';

type Props = {} & RouteComponentProps;

const StyledContactUsPage = styled(Page)``;

const ContactUs: React.FC<Props> = () => (
  <StyledContactUsPage>
    <Aside>zz</Aside>
    <Content>contact us</Content>
  </StyledContactUsPage>
);

export default ContactUs;
