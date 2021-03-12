import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from 'src/components/Button';
import State from './state';
import { observer } from 'mobx-react-lite';
import { EntityId, EntityInstanceType, ImageId } from 'src/contracts/entities';
import { v4 as uuidv4 } from 'uuid';
import FileInput from 'src/components/FileInput';

const StyledUploadImage = styled.div``;

const Select = styled.select``;

const Option = styled.option``;

const Join = styled.div`
  margin: 10px 0;

  input {
    border: 1px solid red;
  }

  label {
    color: #ff0000;
  }
`;

const Upload = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export type Props = {
  entityType: EntityInstanceType;
  entityId: EntityId;
  selectedImageYear: string;
  selectedImageId: ImageId;
  onUploadComplete?: () => void;
  disabled?: boolean;
  required?: boolean;
};

const UploadImage: React.FC<Props> = observer(
  ({ entityType, entityId, selectedImageYear, selectedImageId, onUploadComplete, disabled, required }) => {
    const [state] = useState(new State());
    const inputRef = useRef<HTMLInputElement>(null);
    const checkboxId = uuidv4();

    useEffect(() => {
      return (): void => {
        state.resetData();
      };
    }, []);

    const changeImage = (): void => {
      state.changeImage(inputRef);
    };

    const changeYear: ChangeEventHandler<HTMLSelectElement> = e => {
      state.changeYear(e.target.value);
    };

    const toggleIsJoined = (): void => {
      state.toggleIsJoined();
    };

    const upload = (): void => {
      state.upload(entityType, entityId, selectedImageYear, onUploadComplete);
    };

    return (
      <StyledUploadImage>
        <FileInput accept="image/png, image/jpeg" onChange={changeImage} disabled={disabled} ref={inputRef} />

        <Select onChange={changeYear}>
          <Option selected disabled>
            Select year
          </Option>
          <Option value="1981">1981</Option>
          <Option value="1982">1982</Option>
          <Option value="1983">1983</Option>
        </Select>

        <Join>
          <input
            id={checkboxId}
            type="checkbox"
            onChange={toggleIsJoined}
            checked={state.isJoined}
            disabled={disabled}
          />
          <label htmlFor={checkboxId}>Совместить с текущим</label>
        </Join>

        <Upload>
          <Button onClick={upload} disabled={disabled || !state.isFileSelected || !state.isYearSelected}>
            Загрузить
          </Button>
        </Upload>
      </StyledUploadImage>
    );
  },
);

export default UploadImage;
