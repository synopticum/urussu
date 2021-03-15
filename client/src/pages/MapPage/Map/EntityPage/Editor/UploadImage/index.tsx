import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from 'src/components/Button';
import State from './state';
import { observer } from 'mobx-react-lite';
import FileInput from 'src/components/FileInput';
import Checkbox from 'src/components/Checkbox';
import TextInput from 'src/components/TextInput';
import ValidationState from 'src/components/ValidationState';

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

  useEffect(() => {
    if (!state.image) {
      inputRef.current.value = '';
    }
  }, [state.image]);

  const changeImage = (): void => {
    state.changeImage(inputRef);
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
          disabled={disabled || state.isYearButtonDisabled}
          tooltipContent={state.isYearButtonDisabled && <ValidationState state={state.yearButtonValidationState} />}
          tooltipDirection="right"
        />
        <FileInput
          accept="image/png, image/jpeg"
          onChange={changeImage}
          image={state.image}
          disabled={disabled}
          ref={inputRef}
        />
      </SelectImage>

      <Join>
        <Checkbox
          onChange={toggleIsJoined}
          checked={state.isJoined}
          disabled={disabled || state.isJoinCheckboxDisabled}
          tooltipContent={state.isJoinCheckboxDisabled && <ValidationState state={state.joinCheckboxValidationState} />}
          tooltipDirection="bottom"
        >
          Пересъемка выбранного фото
        </Checkbox>
      </Join>

      <Upload>
        <Button
          onClick={submit}
          disabled={disabled || state.isSubmitButtonDisabled}
          tooltipContent={state.isSubmitButtonDisabled && <ValidationState state={state.submitButtonValidationState} />}
          tooltipDirection="left"
        >
          Загрузить
        </Button>
      </Upload>
    </StyledUploadImage>
  );
});

export default UploadImage;
