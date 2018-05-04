import './mockBe5Request'
import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../src/scripts/be5/containers/Document';
import be5init from '../../../src/scripts/be5/be5init';
import {getTestStore, getTestUser} from "./testUtils";
import {updateUserInfo} from "../../../src/scripts/be5/store/actions/user.actions";


test('test', () => {
  const store = getTestStore();
  be5init.init(store);

  store.dispatch(updateUserInfo(getTestUser()));

  const component = renderer.create(
    <Document frontendParams={{documentName: "MainDocument"}} store={store} />
  );

  be5init.hashChange();
});