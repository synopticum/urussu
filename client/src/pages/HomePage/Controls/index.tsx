import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import theme from 'src/features/App/GlobalStyle/theme';
import activeIcon from './images/active.svg';
import inactiveIcon from './images/inactive.svg';
import hoverIcon from './images/hover.svg';
import { globalStore } from 'src/stores/GlobalStore';
import { observer } from 'mobx-react-lite';

const List = styled.ul`
  padding: 10px;
  border-left: 0 solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to bottom, #387f22 46%, #fff 46% 54%, #ea3323 54%);
`;

const Item = styled.li<{ active?: boolean }>`
  ${({ active }): FlattenSimpleInterpolation => css`
    cursor: pointer;
    text-align: right;
    height: 30px;
    font-family: 'PT Mono', monospace;
    font-size: 14px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: ${active ? 'rgba(255,255,255,0)' : 'rgba(170,170,170,0)'};
    white-space: nowrap;
    padding-right: 20px;
    background: url(${active ? activeIcon : inactiveIcon}) no-repeat;
    background-position: ${active ? 'calc(100% - 4px)' : '100%'} ${active ? '50%' : 'calc(50% - 1px)'};
    background-size: ${active ? '12px' : '21px'};
    transition: padding-right 0.3s, color 0.3s;

    &:hover {
      color: ${theme.colors.white.a};
      background-image: url(${active ? activeIcon : hoverIcon});
    }
  `}
`;

const StyledControls = styled.div<{ active?: boolean }>`
  ${({ active }): FlattenSimpleInterpolation => css`
    position: fixed;
    right: 30px;
    top: 30px;
    width: 40px;
    z-index: 999;
    border-radius: 10px;
    background-color: ${theme.colors.black.a};
    overflow: hidden;
    will-change: width;
    transition: width 0.3s;

    &:hover {
      width: 170px;

      ${Item} {
        padding-right: 30px;
        color: ${active ? 'rgba(255,255,255,1)' : 'rgba(170,170,170,1)'};

        &:hover {
          color: ${theme.colors.white.a};
        }
      }
    }
  `}
`;

const Controls: React.FC = observer(() => {
  return (
    <StyledControls>
      <List>
        <Item
          onClick={(): void => globalStore.setCurrentScreen('index')}
          active={globalStore.currentScreen === 'index'}
        >
          Главная
        </Item>
        {/*<Item onClick={(): void => globalStore.setCurrentScreen('info')} active={globalStore.currentScreen === 'info'}>*/}
        {/*  Информация*/}
        {/*</Item>*/}
        <Item onClick={(): void => globalStore.setCurrentScreen('map')} active={globalStore.currentScreen === 'map'}>
          Карта посёлка
        </Item>
      </List>
    </StyledControls>
  );
});

export default Controls;
