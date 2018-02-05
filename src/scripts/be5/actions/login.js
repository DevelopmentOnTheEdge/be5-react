import React          from 'react';
import ReactDOM       from 'react-dom';
import be5            from '../be5';
import bus            from '../core/bus';
import Login         from '../components/login';

export default function(type = 'dialog', param1 = undefined, param2 = undefined) {
  var redirectUrl = undefined;

  if (type === 'dialog' && param1) {
    redirectUrl = decodeURIComponent(param1);
  }

  const confirm = (username, password, onSuccess, loginError) => {
    be5.net.request(
      'login',
      { username : username, password : password },
      data => {
        if (data.type === 'ok') {
          onSuccess();
        }
        else {
          loginError('Not okay');
        }
      },
      data => {
        loginError('Incorrect name or password')
      }
    );
  };

  const goBack = () => {
    if (redirectUrl) {
      be5.url.set(redirectUrl);
    }else {
      be5.url.clear();
      window.history.back();
    }
  };

  const redirectAndRefresh = () => {
    if(redirectUrl){
      be5.url.set(redirectUrl);
    }else{
      //bus.fire('CallDefaultAction');
      window.history.back();
    }

    bus.fire('LoggedIn');
  };

  switch (type) {
    case 'auto':
      const username = param1 || '';
      const password = param2 || '';
      confirm(username, password);
      return;
    default:
      const parameters = { onConfirm: confirm, onCancel: goBack, onSuccess: redirectAndRefresh };
      const loginComponent = ReactDOM.render(React.createElement(Login, parameters), document.getElementById('login'));
      loginComponent.show();
      return;
  }
};
