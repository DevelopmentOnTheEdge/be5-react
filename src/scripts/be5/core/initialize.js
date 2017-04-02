// npm install jspm -g
// npm install -g jspm-bower-endpoint
// jspm registry create bower jspm-bower-endpoint

import jQueryUI     from 'jqueryui';
import DataTables   from 'datatables';
import bus          from 'be5/core/bus';
import be5          from 'be5/be5';
import StaticPage   from 'be5/components/staticPage';
import Form         from 'be5/components/form';
import Table        from 'be5/components/table';
import TableForm    from 'be5/components/tableForm';
import Document     from 'be5/components/document';
import Login        from 'be5/components/login';
import FormTable    from 'be5/components/formTable';
import Be5Block     from 'be5/components/be5Block';
import Be5Form      from 'be5/components/be5Form';
import Be5View      from 'be5/components/be5View';
import 'datetimepicker';
import numberFormatter from 'javascript-number-formatter';

import ReactDOM from 'react-dom';
import React from 'react';

export default function(id, reactClass) {
  var app = document.getElementById('app');

  if (app != null) {
    ReactDOM.render( React.createElement(reactClass), app );

    be5.net.request('languageSelector', {}, function(data) {
      be5.locale.set(data.selected, data.messages);
      be5.url.process(document.location.hash);
    });

  }

};
