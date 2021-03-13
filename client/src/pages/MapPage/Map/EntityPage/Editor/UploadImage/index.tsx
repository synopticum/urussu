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

const StyledUploadImage = styled.div``;

const SelectImage = styled.div`
  display: flex;
`;

const Join = styled.div`
  margin: 5px 0;
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
      state.upload(entityType, entityId, selectedImageYear, onUploadComplete);
    };

    return (
      <StyledUploadImage>
        <SelectImage>
          <FileInput accept="image/png, image/jpeg" onChange={changeImage} disabled={disabled} ref={inputRef} />
          <TextInput type="number" min="1940" max="2021" onInput={changeYear} label="Год съемки" />
        </SelectImage>

        <Join>
          <Checkbox onChange={toggleIsJoined} checked={state.isJoined} disabled={disabled}>
            Совместить с текущим
          </Checkbox>
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
