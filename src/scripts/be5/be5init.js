import be5 from './be5';
import bus from './core/bus';
import documentState      from './core/documentState';

import './actions/loading';
import './actions/form';
import './actions/login';
import './actions/logout';
import './actions/static';
import './actions/table';
import './actions/qBuilder';
import './actions/text';
import './actions/login';


import './components/tables/TableForm';
import './components/tables/TableFormRow';
import './components/tables/FormTable';
import './components/tables/Table';

import './components/forms/SubmitOnChangeForm';
import './components/forms/ModalForm';
import './components/forms/Form';


export default {
  init(){
    const hashChange = function()
    {
      bus.fire("mainModalClose");

      const state = documentState.get(be5.mainDocumentName);

      if(state.value.links !== undefined && "#!" + state.value.links.self === document.location.hash
        && state.value.links.self.startsWith('form'))
      {
        //console.log('skip - form already opened');
      }
      else
      {
        be5.url.process(be5.mainDocumentName, document.location.hash);
      }
    };

    window.addEventListener("hashchange", hashChange, false);

    be5.net.request("appInfo", {}, function(data) {
      be5.appInfo = data;
      be5.ui.setTitle();
    });

    bus.listen('CallDefaultAction', () => {
      be5.net.request('menu/defaultAction', {}, data => {
        be5.url.set(data.arg)
      });
    });

    be5.net.request('languageSelector', {}, function(data) {
      be5.locale.set(data.selected, data.messages);
      be5.url.process(be5.mainDocumentName, document.location.hash);
    });
  }
}