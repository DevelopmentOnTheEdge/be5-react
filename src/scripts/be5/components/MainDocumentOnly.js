import React         from 'react';
import be5           from '../be5';
import Document      from '../containers/Document';


const MainDocumentOnly = () => {
  return (
    <div className="MainDocument-only">
      <Document frontendParams={{documentName: be5.MAIN_DOCUMENT}} />
    </div>
  );
};

export default MainDocumentOnly;