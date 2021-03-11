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
};
