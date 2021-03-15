import React from 'react';
import styled from 'styled-components';

const StyledValidationState = styled.ul`
  margin: 0;
  padding: 0;
`;

const Error = styled.li`
  white-space: nowrap;
`;

export type ValidationState = { [key: string]: boolean };

export type Props = {
  state: ValidationState;
};

export const isValid = (state: ValidationState): boolean => {
  return !Object.keys(Object.entries(state).filter(([message, isValid]) => isValid)).length;
};

const ValidationState: React.FC<Props> = ({ state }) => {
  const errors = Object.entries(state)
    .filter(([message, isValid]) => isValid)
    .map(([message]) => message);

  return (
    <StyledValidationState>
      {errors.map(error => (
        <Error key={error}>{error}</Error>
      ))}
    </StyledValidationState>
  );
};

export default ValidationState;
