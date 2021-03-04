import React from 'react';
import styled from 'styled-components';
import { color } from 'src/components/GlobalStyle/theme';
import { objectStore } from 'src/stores';

const StyledObjectPage = styled.div`
  position: absolute;
  left: 75px;
  top: 25px;
  width: calc(100% - 100px);
  height: calc(100% - 50px);
  border-radius: 10px;
  z-index: 550;
  background-color: ${color('white-1')};
  padding: 50px;
  overflow-y: auto;
`;

const Close = styled.button`
  cursor: pointer;
  position: absolute;
  right: 20px;
  top: 20px;
  border: 0;
  width: 20px;
  height: 20px;
  background: url('/images/common/close.svg') no-repeat 50% 50%;
  background-size: 20px;
`;

type Props = {};

export const ObjectPage: React.FC<Props> = () => {
  const { data } = objectStore.apiData;

  const close = (): void => objectStore.resetData();

  return (
    <StyledObjectPage>
      <Close onClick={close} />

      {data.thumbnail && <img src={data.thumbnail} alt="" />}
      <div>{data.title}</div>
      <div>
        {data.street}, {data.house}
      </div>
      <div>{data.shortDescription}</div>
      <div>
        {data.images &&
          Object.entries(data.images).map(([year, url]) => (
            <div key={url}>
              {year} - {url}
            </div>
          ))}
      </div>
    </StyledObjectPage>
  );
};

export default ObjectPage;
