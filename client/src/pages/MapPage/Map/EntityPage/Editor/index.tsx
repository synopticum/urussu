import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import Button from 'src/components/Button';
import { DotState, editorStore, ObjectState } from 'src/stores/MapStore/EntityStore/EditorStore';
import TextInput from 'src/components/TextInput';
import Textarea from 'src/components/Textarea';
import UploadImage from 'src/pages/MapPage/Map/EntityPage/Editor/UploadImage';
import ValidationState, { isValid } from 'src/components/ValidationState';
import ConfirmationTooltip from 'src/components/Tooltip/ConfirmationTooltip';
import { mapStore } from 'src/stores/MapStore';
import Checkbox from 'src/components/Checkbox';

const StyledEditor = styled.div<{ isReady: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 450px;
  padding: 20px 10px 20px 75px;
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white.a};
  box-shadow: ${theme.shadows.b};
  opacity: ${({ isReady }): string => (isReady ? '1' : '0')};
  transition: opacity 0.3s;

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 60px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid ${theme.colors.white.a};
  }
`;

const Title = styled.h1`
  font-size: 24px;
`;

const List = styled.div`
  flex: 1 1 auto;
  height: 0;
  margin: 20px 0;
  padding-right: 10px;
  overflow-y: auto;
  ${theme.chunks.scrollbar(theme.colors.black.a, theme.colors.white.a)}
`;

const Section = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid ${theme.colors.white.b};

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: 0;
  }
`;

const SubmitSection = styled(Section)`
  justify-content: space-between;
  padding-right: 10px;
`;

const ExtendedTextInput = styled(TextInput)`
  flex: 1;
`;

const ExtendedTextarea = styled(Textarea)`
  flex: 1;
`;

const AddressSection = styled(Section)`
  justify-content: space-between;
  border-bottom: 0;
  padding-bottom: 0;
`;

const StreetInput = styled(TextInput)`
  flex: 2;
  margin-right: 10px;
`;

const HouseInput = styled(TextInput)`
  flex: 1;
`;

const DotSection = styled(Section)`
  justify-content: space-between;
`;

const LayerInput = styled(TextInput)`
  flex: 2;
  margin-right: 10px;
`;

const RotationAngleInput = styled(TextInput)`
  flex: 3;
  margin-right: 10px;
`;

const ConfirmationWrapper = styled.div`
  position: relative;
  z-index: 50;
`;

const confirm = (): void => {
  editorStore.isConfirmation = true;
};

const cancelConfirmation = (): void => {
  editorStore.isConfirmation = false;
};

const removeEntity = (): void => {
  editorStore.removeEntity();
  mapStore.setEntity(null);
};

const update = (): void => {
  editorStore.store.update();
};

const setTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
  editorStore.state.setTitle(e.target.value);
};

const setShortDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
  editorStore.state.setShortDescription(e.target.value);
};

const setFullDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
  editorStore.state.setFullDescription(e.target.value);
};

const setStreet = (e: React.ChangeEvent<HTMLInputElement>): void => {
  if (editorStore.state instanceof ObjectState) {
    editorStore.state.setStreet(e.target.value);
  }
};

const toggleNoAddress = (): void => {
  if (editorStore.state instanceof ObjectState) {
    editorStore.state.toggleNoAddress();
  }
};

const setHouse = (e: React.ChangeEvent<HTMLInputElement>): void => {
  if (editorStore.state instanceof ObjectState) {
    editorStore.state.setHouse(e.target.value);
  }
};

const setLayer = (e: React.ChangeEvent<HTMLInputElement>): void => {
  if (editorStore.state instanceof DotState) {
    editorStore.state.setLayer(e.target.value);
  }
};

const setRotationAngle = (e: React.ChangeEvent<HTMLInputElement>): void => {
  if (editorStore.state instanceof DotState) {
    editorStore.state.setRotationAngle(parseInt(e.target.value));
  }
};

const removeImage = (): void => {
  editorStore.removeImage();
};

const Editor: React.FC = observer(() => {
  const { data } = editorStore.store.apiData;
  const { state } = editorStore;

  if (!data) {
    return null;
  }

  useEffect(() => {
    const delay = 150;

    setTimeout(() => {
      editorStore.isReady = true;
    }, delay);

    return (): void => {
      editorStore.isReady = false;
    };
  }, []);

  const { validation } = editorStore;

  return (
    <StyledEditor isReady={editorStore.isReady}>
      <Title>Редактирование</Title>

      <List>
        <Section>
          <ExtendedTextInput type="text" onInput={setTitle} value={state.title} label="Заголовок" />
        </Section>

        {state instanceof ObjectState && (
          <>
            <AddressSection>
              <StreetInput
                type="text"
                onInput={setStreet}
                value={state.street}
                disabled={state.noAddress}
                label="Улица"
              />
              <HouseInput type="text" onInput={setHouse} value={state.house} disabled={state.noAddress} label="Дом" />
            </AddressSection>

            <Section>
              <Checkbox onChange={toggleNoAddress} checked={state.noAddress}>
                Без адреса
              </Checkbox>
            </Section>
          </>
        )}

        {state instanceof DotState && (
          <Section>
            <DotSection>
              <LayerInput type="text" onInput={setLayer} value={state.layer} label="Слой на карте" />

              <RotationAngleInput
                type="number"
                onInput={setRotationAngle}
                value={state.rotationAngle.toString()}
                label="Направление взгляда, °"
              />
            </DotSection>
          </Section>
        )}

        <Section>
          <ExtendedTextarea onInput={setShortDescription} value={state.shortDescription} label="Краткое описание" />
        </Section>

        <Section>
          <ExtendedTextarea onInput={setFullDescription} value={state.fullDescription} label="Полное описание" />
        </Section>

        <Section>
          <UploadImage onUploadComplete={(): void => {}} />
        </Section>

        <Section>
          <Button
            onClick={removeImage}
            icon="remove"
            disabled={!isValid(validation.removeButton)}
            tooltipContent={!isValid(validation.removeButton) && <ValidationState state={validation.removeButton} />}
            tooltipDirection="top"
          >
            Удалить выбранное фото
          </Button>
        </Section>
      </List>

      <SubmitSection>
        <ConfirmationWrapper>
          <Button onClick={confirm} type="warning" icon="remove">
            Удалить
          </Button>
          <ConfirmationTooltip
            isVisible={editorStore.isConfirmation}
            direction="top"
            onCancel={cancelConfirmation}
            onConfirm={removeEntity}
          />
        </ConfirmationWrapper>

        <Button onClick={update}>Сохранить</Button>
      </SubmitSection>
    </StyledEditor>
  );
});

export default Editor;
