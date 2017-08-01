import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import StaticPage from '../components/staticPage';

export default function(documentName, page) {

  be5.net.request('static/' + page, {}, data => {
    changeDocument(documentName, { component: StaticPage, value: data.value })
  });

};
