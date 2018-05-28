import React         from 'react';
import be5           from '../be5';
import Document      from '../containers/Document';
import Be5Components from "./Be5Components";


const MainDocumentOnly = () => {
  return (
    <div className="MainDocument-only">
      <Be5Components/>
      <Document frontendParams={{documentName: be5.MAIN_DOCUMENT}} />
    </div>
  );
};

export default MainDocumentOnly;