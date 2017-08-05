import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';


export default function(documentName, page) {
  changeDocument(documentName, { component: Loading })
};

class Loading extends React.Component {

  render() {
    return <div className="document-loader"/>;
  }

}