import React, { forwardRef } from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledFileInput = styled.div`
  display: inline-flex;
`;

const TargetFileInput = styled.input``;

export type Props = {
  onChange: () => void;
  accept: string;
  disabled?: boolean;
};

const FileInput = forwardRef<HTMLInputElement, Props>(({ accept, disabled, onChange }, ref) => {
  return (
    <StyledFileInput>
      <TargetFileInput type="file" accept={accept} onChange={onChange} disabled={disabled} ref={ref} />
    </StyledFileInput>
  );
});

export default FileInput;
