import React, { ChangeEventHandler, forwardRef, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from 'src/components/Button';
import Tooltip from 'src/components/Tooltip';

const ExtendedTooltip = styled(Tooltip)`
  z-index: 100;
`;

const StyledFileInput = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;

  ${ExtendedTooltip} {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    font-size: 0;
  }

  &:hover {
    ${ExtendedTooltip} {
      opacity: 1;
      pointer-events: all;
    }
  }
`;

const SelectButton = styled(Button)`
  position: relative;
`;

const Preview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 7px 0;
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
  const imageRef = useRef(null);

  const change: ChangeEventHandler<HTMLInputElement> = e => {
    onChange(e);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();

      reader.onloadend = function (): void {
        imageRef.current.src = reader.result;
      };

      reader.readAsDataURL(image);
    }
  }, [image]);

  return (
    <StyledFileInput>
      <SelectButton onClick={(): void => {}} icon="upload">
        Выбрать фото
        <NativeFileInput type="file" accept={accept} onChange={change} disabled={disabled} ref={ref} />
      </SelectButton>

      {image && (
        <ExtendedTooltip isVisible direction="top">
          <Preview alt="" ref={imageRef} />
        </ExtendedTooltip>
      )}
    </StyledFileInput>
  );
});

export default FileInput;
