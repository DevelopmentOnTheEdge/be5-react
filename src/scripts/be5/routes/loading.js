import React          from 'react';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/routes'


const route = function(documentName, page) {
  changeDocument(documentName, { component: Loading })
};

class Loading extends React.Component
{
  render() {
    return <div className="document-loader"/>;
  }
}

registerRoute("loading", route);

export default route;