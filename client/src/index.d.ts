import WebpackDevServer from 'webpack-dev-server';
import React from 'react';

declare module 'webpack' {
  interface Configuration {
    devServer?: WebpackDevServer.Configuration;
  }
}

declare global {
  // eslint-disable-next-line  @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveMethod(methodName: string): R;
    }
  }
}

declare module '*.html';
declare module '*.css';
declare module '*.png' {
  const content: string;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}
declare module '*.svg' {
  const SVGComponent: React.FC<React.SVGAttributes<SVGElement>>;
  export default SVGComponent;
}

declare module 'raw-loader!*.ejs';
declare module '!url-loader!*.svg' {
  const DataURL: string;
  export default DataURL;
}

interface Document {
  documentMode: string;
}
