import React from 'react';
import ReactDOM from 'react-dom';

type Props = { parent?: React.RefObject<Element> };

const Portal: React.FC<Props> = ({ parent, children }) =>
  ReactDOM.createPortal(children, parent && parent.current ? parent.current : document.body);

export default Portal;
