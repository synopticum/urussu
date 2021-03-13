import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from 'src/components/Button';
import State from './state';
import { observer } from 'mobx-react-lite';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { v4 as uuidv4 } from 'uuid';
import FileInput from 'src/components/FileInput';
import Checkbox from 'src/components/Checkbox';
import TextInput from 'src/components/TextInput';

const StyledUploadImage = styled.div`
  width: 100%;
`;

const SelectImage = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const SelectYear = styled(TextInput)`
  width: 120px;
`;

const Join = styled.div`
  margin: 10px 0 5px 0;
`;

const Upload = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

export type Props = {
  onUploadComplete?: () => void;
  disabled?: boolean;
  required?: boolean;
};

const UploadImage: React.FC<Props> = observer(({ onUploadComplete, disabled, required }) => {
  const [state] = useState(new State());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return (): void => {
      state.resetData();
    };
  }, []);

  const changeImage = (): void => {
    state.changeImage(inputRef);
  };

  const changeYear: ChangeEventHandler<HTMLInputElement> = e => {
    state.changeYear(e.target.value);
  };

  const toggleIsJoined = (): void => {
    state.toggleIsJoined();
  };

  const upload = (): void => {
    state.upload(onUploadComplete);
  };

  return (
    <StyledUploadImage>
      <SelectImage>
        <SelectYear
          type="number"
          min={state.minYear}
          max={state.maxYear}
          onInput={changeYear}
          label="Год съемки"
          disabled={disabled || !state.isImageSelected}
        />
        <FileInput accept="image/png, image/jpeg" onChange={changeImage} disabled={disabled} ref={inputRef} />
      </SelectImage>

      <Join>
        <Checkbox
          onChange={toggleIsJoined}
          checked={state.isJoined}
          disabled={disabled || !state.isImageSelected || !state.canBeJoined}
        >
          Пересъемка
        </Checkbox>
      </Join>

      <Upload>
        <Button onClick={upload} disabled={disabled || !state.isValid}>
          Загрузить
        </Button>
      </Upload>
    </StyledUploadImage>
  );
});

export default UploadImage;
