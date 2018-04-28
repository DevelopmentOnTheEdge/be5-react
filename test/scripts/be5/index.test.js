import './mockBe5Request'
import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../src/scripts/be5/containers/Document';
import '../../../src/scripts/be5/index';
import '../../../src/scripts/be5/be5styles';
import be5init from '../../../src/scripts/be5/be5init';
import {getTestStore, getTestUser} from "./testUtils";
import {updateUserInfo} from "../../../src/scripts/be5/store/actions/user.actions";


test('test load', () => {
  be5init.init(getTestStore());
});

test('hashChange', () => {
  const store = getTestStore();
  const component = renderer.create(
    <Document frontendParams={{documentName: "MainDocument"}} store={store} />
  );

  store.dispatch(updateUserInfo(getTestUser()), function () {
    be5init.hashChange();
  });
});