import be5 from './be5';
import bus from './core/bus';
import documentState      from './core/documentState';

import './actions/loading.js';
import './actions/form.js';
import './actions/login.js';
import './actions/logout.js';
import './actions/static.js';
import './actions/table.js';
import './actions/qBuilder.js';
import './actions/text.js';
import './actions/login.js';

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