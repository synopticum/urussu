import React from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';
import Aside from 'src/components/Aside';

type Props = {} & RouteComponentProps;

const StyledContactUsPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ContactUs: React.FC<Props> = () => (
  <StyledContactUsPage>
    <Aside>zz</Aside>
    contact us
  </StyledContactUsPage>
);

export default ContactUs;
