import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import Button from 'src/components/Button';
import { editorStore } from 'src/stores/MapStore/EntityStore/EditorStore';
import TextInput from 'src/components/TextInput';
import { objectStore } from 'src/stores/MapStore/EntityStore/ObjectStore';
import Textarea from 'src/components/Textarea';
import UploadImage from 'src/components/UploadImage';
import { imagesStore } from 'src/stores/MapStore/EntityStore/ImagesStore';

const StyledEditor = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 400px;
  padding: 20px 10px 20px 25px;
  height: calc(100vh - 170px);
  border-radius: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
  opacity: 0.95;
  background: ${theme.colors.white.a};
  box-shadow: ${theme.shadows.b};

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
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.white.b};

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: 0;
  }
`;

const Editor: React.FC = observer(() => {
  const { data } = objectStore.apiData;
  const { store, state } = editorStore;

  if (!data) {
    return null;
  }

  const update = (): void => {
    store.update(data.id);
  };

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    state.setTitle(e.target.value);
  };

  const setShortDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    state.setShortDescription(e.target.value);
  };

  const setFullDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    state.setFullDescription(e.target.value);
  };

  return (
    <StyledEditor>
      <Title>Редактирование</Title>

      <List>
        <Section>
          <TextInput onInput={setTitle} value={state.title} />
        </Section>

        <Section>
          <Textarea onInput={setShortDescription} value={state.shortDescription} />
        </Section>

        <Section>
          <Textarea onInput={setFullDescription} value={state.fullDescription} />
        </Section>

        <Section>
          <UploadImage
            entityType={data.instanceType}
            entityId={data.id}
            selectedImageYear={imagesStore.selectedImageYear}
            selectedImageId={imagesStore.selectedImageId}
            onUploadComplete={(): void => {
              alert(1);
            }}
          />
        </Section>
      </List>

      <Button onClick={update}>Сохранить</Button>
    </StyledEditor>
  );
});

export default Editor;
