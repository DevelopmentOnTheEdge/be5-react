import be5 from './be5';
import bus from './core/bus';
import documentState      from './core/documentState';
import { userActions } from './actions'

import './serviceActions/loading';
import './serviceActions/form';
import './serviceActions/login';
import './serviceActions/logout';
import './serviceActions/static';
import './serviceActions/table';
import './serviceActions/qBuilder';
import './serviceActions/text';
import './serviceActions/login';


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

    const updateUser = () => {
      store.dispatch(userActions.updateUserInfo());
    };
    bus.listen('RefreshAll', updateUser);
  }
}