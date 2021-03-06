import styled from 'styled-components';
import React, { ChangeEvent, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { color, shadow } from 'src/components/GlobalStyle/theme';
import { mapStore } from 'src/stores';
import { debounce } from 'ts-debounce';
import { useAutoFocus } from 'src/components/App/hooks/use-auto-focus';

const StyledSearch = styled.div`
  position: absolute;
  left: calc(100% + 20px);
  top: -5px;
  width: 350px;
  padding: 7px 20px;
  min-height: 55px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: ${color('white-1')};
  box-shadow: ${shadow('shadow-1')};

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
  padding: 10px 0;
  font-size: 16px;
  border: 0;
  background: none;

  &:focus {
    background-color: red;
  }
`;

const Search: React.FC = observer(() => {
  const { controls } = mapStore;
  const inputRef = useRef(null);

  const search = (e: ChangeEvent<HTMLInputElement>): void => controls.search(e.target.value);
  const debouncedSearch = debounce(search, 300);

  useAutoFocus(inputRef);

  return (
    <StyledSearch>
      <Input type="text" onInput={debouncedSearch} ref={inputRef} />
    </StyledSearch>
  );
});

export default Search;
