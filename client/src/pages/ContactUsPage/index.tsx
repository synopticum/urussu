import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import Aside from 'src/components/Aside';
import Content from 'src/components/Content';

type Props = {} & RouteComponentProps;

const StyledContactUsPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ContactUs: React.FC<Props> = () => (
  <StyledContactUsPage>
    <Aside>zz</Aside>
    <Content>contact us</Content>
  </StyledContactUsPage>
);

export default ContactUs;
