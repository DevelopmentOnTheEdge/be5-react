import be5 from './be5';
import bus from "./core/bus";
import * as api from './api';
import Preconditions from './utils/preconditions';
import documentState from './core/documentState';

import './routes/loading';
import './routes/form';
import './routes/login';
import './routes/logout';
import './routes/static';
import './routes/table';
import './routes/queryBuilder';
import './routes/text';
import './routes/categories';


import './components/tables/TableForm';
import './components/tables/TableFormRow';
import './components/tables/FormTable';
import './components/tables/Table';
import './components/tables/ReactTable';
import './components/tables/ModalTable';

import './components/forms/SubmitOnChangeForm';
import './components/forms/ModalForm';
import './components/forms/InlineForm';
import './components/forms/Form';
import './components/forms/HorizontalForm';
import './components/forms/FinishedResult';

import './components/QueryBuilder';
import './components/StaticPage';
import './components/ErrorPane';
import './pages/UiPanel';
import './pages/SystemCard';
import {fetchUserInfo} from "./store/actions/user.actions";
import {getDefaultRoute} from "./store/selectors/user.selectors";
import {getSelfUrl, processHashUrlForDocument} from "./utils/documentUtils";
import {MAIN_DOCUMENT} from "./constants";


export default {

  hashChange()
  {
    bus.fire("mainModalClose");

    const state = documentState.get(MAIN_DOCUMENT);

    if(getSelfUrl(state.value) !== be5.url.get())
    {
      if (getSelfUrl(state.value) === "#!" + getDefaultRoute(be5.store.getState())
        && (be5.url.get() === "" || be5.url.get() === "#!")) {
        return;
      }
      //console.log(getSelfUrl(state.value), be5.url.get(), "#!" + getDefaultRoute(be5.store.getState()));
      be5.url.process(MAIN_DOCUMENT, be5.url.get());
    }
  },

  init(store, callback)
  {
    Preconditions.passed(store, 'store in required');

    be5.appInfo = {"title": document.title};
    be5.store = store;
    be5.api = api;
    window.be5 = be5;

    this.initGetUser(store, callback);

    be5.net.request('languageSelector', {}, function(data) {
      be5.locale.set(data.selected, data.messages);
      //be5.url.process(MAIN_DOCUMENT, be5.url.get());

      store.dispatch(fetchUserInfo());
    });

    window.addEventListener("hashchange", this.hashChange, false);
  },

  initGetUser(store, callback){
    this.initOnLoad(store, undefined, getDefaultRoute, () => {
      if (callback) callback();
      processHashUrlForDocument(be5.url.get(), MAIN_DOCUMENT);
    });
  },

  initOnLoad(store, initState, select, onChange) {
    function handleChange() {
      let nextState = select(store.getState());

      if (nextState !== initState) {
        onChange(nextState);
        unsubscribe();
      }
    }

    let unsubscribe = store.subscribe(handleChange);
  }
}
