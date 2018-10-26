import React from 'react';
import Document from '../containers/Document';
import Be5Components from "./Be5Components";
import {MAIN_DOCUMENT} from "../constants";


const MainDocumentOnly = () => {
  return (
    <div className="MainDocument-only">
      <Be5Components/>
      <Document frontendParams={{documentName: MAIN_DOCUMENT}} />
    </div>
  );
};

export default MainDocumentOnly;
