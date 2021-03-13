import React, { ChangeEventHandler, forwardRef, useState } from 'react';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import icon from './images/icon.svg';
import Button from 'src/components/Button';

const StyledFileInput = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;
`;

const SelectButton = styled(Button)`
  position: relative;
`;

const FilePath = styled.div`
  margin-top: 2px;
  font-size: 14px;
`;

const NativeFileInput = styled.input`
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

export type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  accept: string;
  disabled?: boolean;
  required?: boolean;
};

const FileInput = forwardRef<HTMLInputElement, Props>(({ accept, onChange, disabled, required }, ref) => {
  const [filePath, setFilePath] = useState(null);

  const change: ChangeEventHandler<HTMLInputElement> = e => {
    setFilePath(e.target.files[0].name);
    onChange(e);
  };

  return (
    <StyledFileInput>
      <SelectButton onClick={(): void => {}} icon={icon}>
        Выбрать изображение
        <NativeFileInput type="file" accept={accept} onChange={change} disabled={disabled} ref={ref} />
      </SelectButton>
      {filePath && <FilePath>{filePath}</FilePath>}
    </StyledFileInput>
  );
});

export default FileInput;
