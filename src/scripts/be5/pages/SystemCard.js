import React from 'react';
import be5 from "../be5";
import Navs from "../components/Navs";
import {registerDocument} from "../core/documents";
import {registerRoute} from "../core/routes";
import changeDocument from "../core/changeDocument";


const SystemCard = (props) =>
{
  const title = props.value.data.attributes.title;
  be5.ui.setTitle(title);
  const steps = [
    {title: 'Cache', url: '#!table/_system_/Cache'},
    {title: 'Daemons', url: '#!table/_system_/Daemons'},
    {title: 'DataSource', url: '#!table/_system_/DataSource'},
    {title: 'Entities', url: '#!table/_system_/Entities'},
    {title: 'Http Headers', url: '#!table/_system_/Http Headers'},
    {title: 'Session', url: '#!table/_system_/Session variables'},
    {title: 'Properties', url: '#!table/_system_/System properties'},
    {title: 'System Settings', url: '#!table/systemSettings/All%20records'},
    {title: 'Threads', url: '#!table/_system_/Threads'},
    {title: 'UI panel', url: '#!uiPanel'},
  ];

  return (
    <div className="info-card">
      <h1 style={{marginBottom: 13 + 'px'}}>{title}</h1>
      <Navs steps={steps} tabs startAtStep={0} />
    </div>
  );
};

registerDocument('SystemCard', SystemCard);

registerRoute('systemCard', (documentName) => {
    changeDocument(documentName, {
      value: {data: {attributes: {title: "System card"}, links:{self: "systemCard"}}},
      frontendParams: {type: 'SystemCard'}
    })
});
