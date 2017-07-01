// import DataTables   from 'datatables';
// import bus          from '../core/bus';
import be5          from '../be5';
// import Form         from '../components/form';
// import Table        from '../components/table';
// import Pool         from '../components/pool';
// import TableForm    from '../components/tableForm';
// import Document     from '../components/document';
// import Login        from '../components/login';
// import FormTable    from '../components/formTable';
// import Be5Block     from '../components/be5Block';
//import Be5Form      from '../components/be5Form';
//import Be5View      from '../components/be5View';

import ReactDOM from 'react-dom';
import React from 'react';

export default function(id, reactClass) {
  var app = document.getElementById('app');

  if (app !== null) {
    ReactDOM.render( React.createElement(reactClass), app );

    be5.net.request('languageSelector', {}, function(data) {
      be5.locale.set(data.selected, data.messages);
      be5.url.process(document.location.hash);
    });

  }

};
