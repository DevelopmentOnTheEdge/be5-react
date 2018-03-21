import be5 from './be5';
import bus from './core/bus';
import documentState      from './core/documentState';
import { userActions } from './store/actions'

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
import './components/tables/ReactTable';

import './components/forms/SubmitOnChangeForm';
import './components/forms/ModalForm';
import './components/forms/InlineForm';
import './components/forms/Form';


export default {

  hashChange()
  {
    bus.fire("mainModalClose");

    const state = documentState.get(be5.mainDocumentName);

    if(state.value.links !== undefined && "#!" + state.value.data.links.self === be5.url.get()
      && state.value.data.links.self.startsWith('form'))
    {
      //console.log('skip - form already opened');
    }
    else
    {
      be5.url.process(be5.mainDocumentName, be5.url.get());
    }
  },

  init(store)
  {
    window.addEventListener("hashchange", this.hashChange, false);

    be5.net.request("appInfo", {}, function(data) {
      be5.appInfo = data;
      be5.ui.setTitle();
    });

    bus.listen('CallDefaultAction', () => {
      be5.net.request('menu/defaultAction', {}, data => {
        be5.url.set(data.arg)
      });
    });

    // be5.net.request('languageSelector', {}, function(data) {
    //   be5.locale.set(data.selected, data.messages);
    //   be5.url.process(be5.mainDocumentName, be5.url.get());
    // });

    bus.listen('RefreshAll', () => {
      store.dispatch(userActions.updateUserInfo());
    });
  }
}