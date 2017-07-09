import be5          from '../be5';
import Pool         from '../actions/pool';
import Static         from '../actions/static';
import Logout         from '../actions/logout';

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
