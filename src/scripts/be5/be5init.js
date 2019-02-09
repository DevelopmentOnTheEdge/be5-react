import be5 from './be5';
import * as api from './api';
import Preconditions from './utils/preconditions';
import './registers'

import {fetchUserInfo} from "./store/actions/user.actions";
import {getDefaultRoute} from "./store/selectors/user.selectors";
import {processHashUrlForDocument} from "./utils/documentUtils";
import {MAIN_DOCUMENT} from "./constants";
import {getHashUrl} from "./store/selectors/url.selectors";
import {updateHashUrl} from "./store/actions/url.actions";


const hashChange = () => {
  const hash = be5.url.get();
  if (getHashUrl(be5.store.getState()) !== hash) {
    be5.store.dispatch(updateHashUrl(hash));
  }
  be5.url.process({documentName: MAIN_DOCUMENT}, be5.url.get());
};

export const initBe5App = (store, callback) => {
  Preconditions.passed(store, 'store in required');

  be5.appInfo = {"title": document.title};
  be5.store = store;
  be5.api = api;
  window.be5 = be5;

  be5.store.dispatch(updateHashUrl(be5.url.get()));
  initGetUser(store, callback);

  be5.net.request('languageSelector', {}, function (data) {
    be5.locale.set(data.selected, data.messages);
    //be5.url.process(MAIN_DOCUMENT, be5.url.get());

    store.dispatch(fetchUserInfo());
  });

  window.addEventListener("hashchange", hashChange, false);
};

const initGetUser = (store, callback) => {
  initOnLoad(store, undefined, getDefaultRoute, () => {
    if (callback) callback();
    processHashUrlForDocument(be5.url.get(), MAIN_DOCUMENT);
  });
};

export const initOnLoad = (store, initState, select, onChange) => {
  function handleChange() {
    let nextState = select(store.getState());

    if (nextState !== initState) {
      onChange(nextState);
      unsubscribe();
    }
  }

  let unsubscribe = store.subscribe(handleChange);
};
