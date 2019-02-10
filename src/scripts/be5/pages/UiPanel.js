import React from 'react';
import {getAllDocumentTypes, getDocument} from '../core/registers/documents'
import {getAllRoutes, getRoute} from '../core/registers/routes'
import classNames from 'classnames';
import changeDocument from "../core/changeDocument";
import be5 from "../be5";
import {createPageValue, registerPage} from "../utils/utils";


const UiPanel = (props) => {
  be5.ui.setTitle(props.value.data.attributes.title);
  const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  const ARGUMENT_NAMES = /([^\s,]+)/g;

  function getParamNamesString(func) {
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null) return [];
    return result;
  }

  function getParamNames(func) {
    const arr = getParamNamesString(func);
    return arr.map((name, i) => {
      if (i === 0) {
        return <span key={name}>{name}</span>
      } else {
        return <span key={name}>, {name}</span>
      }
    });
  }

  return (
    <div className={classNames('ui-panel row')}>
      <div className="col-md-12">
        <h1>Core</h1>
      </div>
      <div className="col-md-4">
        <h3>documents</h3>
        {getAllDocumentTypes().sort().map((name) => {
          //let doc = getDocument(name);
          //console.log('document', doc.name, doc);
          return (
            <div key={"documents-" + name}>
              <span className="badge badge-primary">{name}</span> - {getDocument(name).name}
            </div>
          )
        })}
      </div>
      <div className="col-md-8">
        <h3>routes</h3>
        {getAllRoutes().sort().map((name) => {
          //let route = getRoute(name);
          //console.log('route', route.name, route);
          return (
            <div key={"documents-" + name}>
              <span className="badge badge-primary">{name}</span>
              ({getParamNames(getRoute(name))})
            </div>
          )
        })}
      </div>
    </div>
  );
};

registerPage("uiPanel", UiPanel, function (frontendParams) {
  changeDocument(frontendParams.documentName, createPageValue("uiPanel",
    {attributes: {title: "UI panel"}}
  ));
});
