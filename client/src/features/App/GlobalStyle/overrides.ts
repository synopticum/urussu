import theme from 'src/features/App/GlobalStyle/theme';

const overrides = `
  *, *:before, *:after { box-sizing: inherit; }

  html {
    height: 100%;
    overflow: auto;
  }

  body {
    font-family: 'PT Serif', serif;
    box-sizing: border-box;
    word-break: break-word;
    height: 100%;
    padding: 0;
    background: ${theme.colors.black.a};
    line-height: 1.4;
  }

  body::-webkit-scrollbar, body::-webkit-scrollbar-track {
    overflow: hidden;
    background: ${theme.colors.black.a};
  }

  body::-webkit-scrollbar:horizontal {
      height: 10px;
  }

  body::-webkit-scrollbar:vertical {
      width: 1px;
  }

  body::-webkit-scrollbar-thumb {
      transition: background .25s;
      background: ${theme.colors.white.a};
  }

  body::-webkit-scrollbar-thumb:horizontal {
      border-left: none;
      border-right: none;
  }

  body::-webkit-scrollbar-thumb:hover {
      background: ${theme.colors.white.a};
  }

  #main {
    min-height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    border-radius: 5px 0 0 5px;
  }

  a {
    color: ${theme.colors.blue.a};
  }

  input, textarea, button { font-family: "PT Serif", Times New Roman, "Helvetica Neue", sans-serif; }
  input:active, textarea:active, button:active, input:focus, textarea:focus, button:focus { outline: none; }

  input[type=text]::-ms-clear {
    display: none;
  }
  input[type=password]::-ms-reveal {
    display: none;
  }
`;

export default overrides;
