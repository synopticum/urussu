import React, { ChangeEventHandler, forwardRef } from 'react';
import styled from 'styled-components';
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
  image: File;
  onChange: ChangeEventHandler<HTMLInputElement>;
  accept: string;
  disabled?: boolean;
  required?: boolean;
};

const FileInput = forwardRef<HTMLInputElement, Props>(({ image, accept, onChange, disabled, required }, ref) => {
  const filePath = image && image.name;

  const change: ChangeEventHandler<HTMLInputElement> = e => {
    onChange(e);
  };

  return (
    <StyledFileInput>
      <SelectButton onClick={(): void => {}} icon="upload">
        Выбрать изображение
        <NativeFileInput type="file" accept={accept} onChange={change} disabled={disabled} ref={ref} />
      </SelectButton>
      {filePath && <FilePath>{filePath}</FilePath>}
    </StyledFileInput>
  );
});

export default FileInput;
