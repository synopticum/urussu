import { CSSChunk, CSSVariable } from 'src/features/App/GlobalStyle/theme';

export default {
  scrollbar: (baseColor: CSSVariable, secondaryColor: CSSVariable): CSSChunk => {
    return `
        &::-webkit-scrollbar,
        &::-webkit-scrollbar-track {
          overflow: hidden;
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          border: 10px solid ${secondaryColor};
          border-top: 0;
          border-bottom: 0;
          transition: background 0.25s;
          background: ${baseColor};
        }

        &::-webkit-scrollbar:horizontal {
          height: 24px;
        }

        &::-webkit-scrollbar:vertical {
          width: 24px;
        }

        &::-webkit-scrollbar-thumb:horizontal {
          border-left: none;
          border-right: none;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: ${baseColor};
        }
      `;
  },

  innerBorder: (): CSSChunk => {
    return `
      content: '';
      pointer-events: none;
      position: absolute;
      left: var(--inner-border);
      top: 0;
      z-index: 500;
      width: calc(100% - var(--inner-border) * 2);
      height: calc(100% - var(--inner-border) * 2);
      margin: var(--inner-border) var(--inner-border) var(--inner-border) 0;
      box-sizing: border-box;
      background: transparent;
      border-radius: 10px;
      box-shadow: rgb(17 17 17) 0px 0px 0px 10px;
      outline: var(--inner-border) solid var(--colors-black-a);
    `;
  },
};
