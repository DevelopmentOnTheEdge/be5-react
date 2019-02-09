import React from 'react';
import changeDocument from '../core/changeDocument';
import {registerRoute} from '../core/registers/routes'


const route = function (frontendParams, page) {
  changeDocument(frontendParams.documentName, {})
};

class Loading extends React.Component {
  render() {
    return <div className="document-loader"/>;
  }
}

registerRoute("loading", route);

export default route;
