import React          from 'react';
import be5            from '../be5';
import forms          from '../services/forms';
import actionsCollection from '../services/actionsCollection'


const action = function()
{
  forms.load(forms.getOperationParams('form/users/All records/Login'), {
    documentName: be5.mainModalDocumentName
  });
};

actionsCollection.registerAction("login", action);

export default action;

// const action = function(type = 'dialog', param1 = undefined, param2 = undefined) {
//   let redirectUrl = undefined;
//
//   if (type === 'dialog' && param1) {
//     redirectUrl = decodeURIComponent(param1);
//   }
//
//   const confirm = (username, password, onSuccess, loginError) => {
//     be5.net.request(
//       'login',
//       { username : username, password : password },
//       data => {
//         if (data.type === 'ok') {
//           onSuccess();
//         }
//         else {
//           loginError('Not okay');
//         }
//       },
//       data => {
//         loginError('Incorrect name or password')
//       }
//     );
//   };
//
//   const goBack = () => {
//     if (redirectUrl) {
//       be5.url.set(redirectUrl);
//     }else {
//       be5.url.clear();
//       window.history.back();
//     }
//   };
//
//   const redirectAndRefresh = () => {
//     if(redirectUrl){
//       be5.url.set(redirectUrl);
//     }else{
//       //bus.fire('CallDefaultAction');
//       window.history.back();
//     }
//
//     bus.fire('LoggedIn');
//   };
//
//   switch (type) {
//     case 'auto':
//       const username = param1 || '';
//       const password = param2 || '';
//       confirm(username, password);
//       return;
//     default:
//       const parameters = { onConfirm: confirm, onCancel: goBack, onSuccess: redirectAndRefresh };
//       const loginComponent = ReactDOM.render(React.createElement(Login, parameters), document.getElementById('login'));
//       loginComponent.show();
//       return;
//   }
// };