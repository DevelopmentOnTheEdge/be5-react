import be5 from '../be5';
import React from 'react';

export default (type, reactClass) => {
  be5.ui.registerDocumentType(type, React.createElement.bind(undefined, reactClass));
};
