import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import { Page, Aside, Content } from 'src/components/Page';

type Props = {} & RouteComponentProps;

const StyledContactUsPage = styled(Page)``;

const ContactUs: React.FC<Props> = () => (
  <StyledContactUsPage>
    <Aside>zz</Aside>
    <Content>contact us</Content>
  </StyledContactUsPage>
);

export default ContactUs;
