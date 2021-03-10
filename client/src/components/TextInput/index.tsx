import React from 'react';
import styled from 'styled-components';

const StyledTextInput = styled.div`
  color: #ff0000;
  height: 100px;
  width: 100px;
  background: url('/images/common/close.svg');
  background-size: 100%;
`;

type Props = {
  primary: boolean;
};

const TextInput: React.FC<Props> = ({ primary }) => {
  return <StyledTextInput>Hello {primary}</StyledTextInput>;
};

export default TextInput;
