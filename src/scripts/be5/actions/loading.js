import React          from 'react';
import changeDocument from '../core/changeDocument';
import actionsCollection from '../services/actionsCollection'

const action = function(documentName, page) {
  changeDocument(documentName, { component: Loading })
};

class Loading extends React.Component
{
  render() {
    return <div className="document-loader"/>;
  }
}

actionsCollection.registerAction("loading", action);

export default action;