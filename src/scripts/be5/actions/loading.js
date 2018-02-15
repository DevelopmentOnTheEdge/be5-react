import React          from 'react';
import changeDocument from '../core/changeDocument';


export default function(documentName, page) {
  changeDocument(documentName, { component: Loading })
};

class Loading extends React.Component {

  render() {
    return <div className="document-loader"/>;
  }

}