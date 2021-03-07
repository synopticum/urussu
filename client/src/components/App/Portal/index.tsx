import React from 'react';
import ReactDOM from 'react-dom';

type Props = { parent: React.RefObject<Element> };

const Portal: React.FC<Props> = ({ parent, children }) => {
  const parentNode = parent && parent.current;

  if (!parentNode) {
    return null;
  }

  return ReactDOM.createPortal(children, parentNode);
};

export default Portal;
