import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from 'src/components/Button';
import UploadImageState from './state';
import { observer } from 'mobx-react-lite';
import ImageFileInput from 'src/components/ImageFileInput';
import Checkbox from 'src/components/Checkbox';
import TextInput from 'src/components/TextInput';
import ValidationState, { isValid } from 'src/components/ValidationState';

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
  const [state] = useState(new UploadImageState());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return (): void => {
      state.resetData();
    };
  }, []);

  useEffect(() => {
    if (!state.image) {
      inputRef.current.value = '';
    }
  }, [state.image]);

  const changeImage: ChangeEventHandler<HTMLInputElement> = (e): void => {
    state.changeImage(e.target.files[0]);
  };

  const changeYear: ChangeEventHandler<HTMLInputElement> = e => {
    state.changeYear(e.target.value);
  };

  const toggleIsJoined = (): void => {
    state.toggleIsJoined();
  };

  const submit = (): void => {
    state.submit(onUploadComplete);
  };

  const { validation } = state;

  return (
    <StyledUploadImage>
      <SelectImage>
        <SelectYear
          type="number"
          min={state.minYear}
          max={state.maxYear}
          onInput={changeYear}
          value={state.year}
          label="Год съемки"
          disabled={disabled || !isValid(validation.selectYear)}
          tooltipContent={!isValid(validation.selectYear) && <ValidationState state={validation.selectYear} />}
          tooltipDirection="right"
        />
        <ImageFileInput onChange={changeImage} image={state.image} disabled={disabled} ref={inputRef} />
      </SelectImage>

      <Join>
        <Checkbox
          onChange={toggleIsJoined}
          checked={state.isJoined}
          disabled={disabled || !isValid(validation.join)}
          tooltipContent={!isValid(validation.join) && <ValidationState state={validation.join} />}
          tooltipDirection="bottom"
        >
          Пересъемка выбранного фото
        </Checkbox>
      </Join>

      <Upload>
        <Button
          onClick={submit}
          disabled={disabled || !isValid(state.validation.submit)}
          tooltipContent={!isValid(validation.submit) && <ValidationState state={validation.submit} />}
          tooltipDirection="left"
        >
          Загрузить
        </Button>
      </Upload>
    </StyledUploadImage>
  );
});

export default UploadImage;
