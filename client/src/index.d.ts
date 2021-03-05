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
  const content: string;
  export default content;
}

interface Document {
  documentMode: string;
}
