import React          from 'react';
import be5            from '../be5'
import bus            from '../core/bus';
import actionsCollection from '../services/actionsCollection'


const action = function() {
  be5.net.request('logout', {}, function() {
    document.cookie = 'be_auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

    bus.fire('LoggedOut');
    bus.fire('CallDefaultAction');
    bus.fire("alert", {msg: be5.messages.LogoutSuccessful, type: 'success'})
  });

};

actionsCollection.registerAction("logout", action);

export default action;