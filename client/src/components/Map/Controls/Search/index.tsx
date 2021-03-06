import styled from 'styled-components';
import React from 'react';
import { observer } from 'mobx-react-lite';

const StyledSearch = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  width: 200px;
  height: 50px;
  background-color: #ff0000;
`;

const Search: React.FC = observer(() => {
  return <StyledSearch />;
});

export default Search;
