import './mockBe5Request'
import React from 'react';
import renderer from 'react-test-renderer';
import Document from '../../../src/scripts/be5/containers/Document';
import {hashChange, initBe5App} from '../../../src/scripts/be5/be5init';
import {getTestStore, getTestUser} from "./testUtils";
import {updateUserInfo} from "../../../src/scripts/be5/store/actions/user.actions";
import {MAIN_DOCUMENT} from "../../../src/scripts/be5/constants";


test('test', () => {
  const store = getTestStore();
  initBe5App(store);

  store.dispatch(updateUserInfo(getTestUser()));

  const component = renderer.create(
    <Document frontendParams={{documentName: MAIN_DOCUMENT}} store={store} />
  );

  hashChange();
});
