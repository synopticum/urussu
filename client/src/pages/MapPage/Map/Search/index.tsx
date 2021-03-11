import styled from 'styled-components';
import React, { ChangeEvent, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { debounce } from 'ts-debounce';
import { useAutoFocus } from 'src/features/App/hooks/use-auto-focus';
import Results from 'src/pages/MapPage/Map/Search/Results';
import { mapStore } from 'src/stores/MapStore';
import theme from 'src/features/App/GlobalStyle/theme';

const StyledSearch = styled.div`
  position: absolute;
  left: 70px;
  top: 18px;
  z-index: 1050;
  width: 300px;
  padding: 0 10px 0 15px;
  min-height: 55px;
  max-height: calc(100vh - 260px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.white.a};
  box-shadow: ${theme.shadows.a};

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 17px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #fff;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 6px;
  padding: 10px 5px;
  font-size: 16px;
  border: 0;
  background: none;

  &:focus {
    background-color: ${theme.colors.yellow.a};
  }
`;

const Search: React.FC = observer(() => {
  const inputRef = useRef(null);

  const search = (e: ChangeEvent<HTMLInputElement>): void => mapStore.search(e.target.value);
  const debouncedSearch = debounce(search, 300);

  useAutoFocus(inputRef);

  return (
    <StyledSearch>
      <Input type="text" onInput={debouncedSearch} ref={inputRef} />
      <Results />
    </StyledSearch>
  );
});

export default Search;
