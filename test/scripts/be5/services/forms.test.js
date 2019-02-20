import React from 'react';
import renderer from 'react-test-renderer';
import {getTestStore, getTestUser, TestProvider} from "../testUtils";
import Document from '../../../../src/scripts/be5/containers/Document';
import '../../../../src/scripts/be5/components/forms/Form';
import '../../../../src/scripts/be5/components/forms/HorizontalForm';
import '../../../../src/scripts/be5/components/forms/FinishedResult';
import be5 from '../../../../src/scripts/be5/be5';
import forms, {
  _performOperationResult,
  fetchOperationByUrl,
  loadForm,
  openOperationByUrl
} from '../../../../src/scripts/be5/services/forms';
import testData from '../testData.json';
import {getUser} from "../../../../src/scripts/be5/store/selectors/user.selectors";
import bus from "../../../../src/scripts/be5/core/bus";
import FrontendAction from "../../../../src/scripts/be5/services/model/FrontendAction";
import {MAIN_DOCUMENT} from "../../../../src/scripts/be5/constants";

import {_get, _post} from "../../../../src/scripts/be5/services/formsRequests";
jest.mock('../../../../src/scripts/be5/services/formsRequests', () => ({
  __esModule: true,
  _get: jest.fn(),
  _post: jest.fn()
}));

test('load', () => {
  let params = {
    _en_: 'users',
    _qn_: 'All records',
    _on_: 'Insert',
    _ts_: 123,
    _params_: '{"user_name": "Guest", _selectedRows_: "12"}'
  };
  loadForm(params, {documentName: 'testDoc', parentDocumentName: 'parentTestDoc'});

  expect(_get.mock.calls.length).toBe(1);
  expect(_get.mock.calls[0]).toEqual([
    {
      "_ts_": expect.any(Number),
      "_en_": "users",
      "_on_": "Insert",
      "_params_": '{"user_name": "Guest", _selectedRows_: "12"}',
      "_qn_": "All records"
    },
    expect.any(Function),
    expect.any(Function)
  ]);

  params = {
    _en_: 'users',
    _qn_: 'All records',
    _on_: 'Insert',
    _ts_: 123,
    _params_: '{"user_name":"Guest"}',
  };
  forms.apply(params, {documentName: 'testDoc',parentDocumentName: 'parentTestDoc'});
  expect(_post.mock.calls[0]).toEqual([
    "form/apply", {
      "_ts_": expect.any(Number),
      "_en_": "users",
      "_on_": "Insert",
      "_params_": '{"user_name":"Guest"}',
      "_qn_": "All records"},
    expect.any(Function),
    expect.any(Function)
  ]);

});

test('performOperationResult finished', () => {
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: "test"}}/>
    </TestProvider>
  );
  const res = {
    data: {
      type: "operationResult",
      attributes: {"operationResult": {
        "status": "FINISHED"
      }},
      links: {"self":"form/categories/Doc categories/Edit"},
    },
    meta: {"_ts_":"1503244989281"},
  };
  _performOperationResult(res, {documentName: "test"});
  expect(component.toJSON()).toMatchSnapshot();
});

test('performOperationResult finished with message', () => {
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: "test"}}/>
    </TestProvider>
  );
  const res = {
    data: {
      type: "operationResult",
      attributes: {"operationResult": {
        "status":"FINISHED",
        "message": "Finish message<br/>with html"
      }},
      links: {"self":"form/categories/Doc categories/Edit"},
    },
    meta: {"_ts_":"1503244989281"},
  };
  _performOperationResult(res, {documentName: "test"});
  expect(component.toJSON()).toMatchSnapshot();
});

test('performOperationResult finished with message and actions', () => {
  const store = getTestStore();
  be5.store = store;
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: "test"}}/>
    </TestProvider>
  );
  const res = {
    data: {
      type: "operationResult",
      attributes: {"operationResult": {
        "status":"FINISHED",
        "message": "Finish message<br/>with html",
        "details": new FrontendAction("UPDATE_USER_INFO", getTestUser())
      }},
      links: {"self":"form/categories/Doc categories/Edit"},
    },
    meta: {"_ts_":"1503244989281"},
  };
  _performOperationResult(res, {documentName: "test"});
  expect(component.toJSON()).toMatchSnapshot();
  expect(getUser(store.getState())).toEqual(getTestUser());
});

test('performOperationResult UPDATE_USER_INFO', () => {
  const store = getTestStore();
  be5.store = store;

  expect(getUser(store.getState()))
    .toEqual({"availableRoles": ["FrontendInit"], "currentRoles": ["FrontendInit"], "loggedIn": false, "userName": "Guest",
      "getCreationTime": "0", "defaultRoute": undefined});
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: "test"}}/>
    </TestProvider>
  );
  const res = {
    data: {
      type: "operationResult",
      attributes: {"operationResult": {
        status:  "FINISHED",
        details: new FrontendAction("UPDATE_USER_INFO", getTestUser())
      }},
      links: {"self":"form/categories/Doc categories/Edit"},
    },
    meta: {"_ts_":"1503244989281"},
  };
  _performOperationResult(res, {documentName: "test"});
  expect(component.toJSON()).toMatchSnapshot();
  expect(getUser(store.getState())).toEqual(getTestUser());
});

test('executeFrontendActions TEST', () => {
  let out = '';

  bus.listen("executeFrontendActions", ({actions, frontendParams}) => {
    if(actions["TEST"] !== undefined)
    {
      out = actions["TEST"] + ' 1'
    }
  });

  const res = {
    data: {
      type: "operationResult",
      attributes: {"operationResult": {
        "status": "FINISHED",
        "details": [new FrontendAction("TEST", "test data")]
      }},
      links: {"self":"form/categories/Doc categories/Edit"},
    },
    meta: {"_ts_":"1503244989281"},
  };
  _performOperationResult(res, {documentName: "test"});

  expect(out).toEqual('test data 1');
});


test('performOperationResult redirect', () => {
  //const mockFunc = jest.fn();
  be5.url.process = jest.fn();

  const res = {
    "data":{
      "type":"operationResult",
      "attributes":{"operationResult": {"details":"static/welcome.be","status":"REDIRECTED"}},
      "links":{"self":"form/categories/Doc categories/Edit"}
    },
    "meta":{"_ts_":"1503244989281"}
  };
  _performOperationResult(res, {documentName: "test"});

  expect(be5.url.process.mock.calls[0]).toEqual([{documentName: "test"}, "#!static/welcome.be"]);
  //expect(mockFunc.mock.calls.length).toBe(1);
});

test('performOperationResult redirect MAIN_DOCUMENT', () => {
  be5.url.open = jest.fn();

  const res = {
    "data":{
      "type":"operationResult",
      "attributes":{"operationResult": {"details":"static/welcome.be","status":"REDIRECTED"}},
      "links":{"self":"form/categories/Doc categories/Edit"}
    },
    "meta":{"_ts_":"1503244989281"}
  };
  _performOperationResult(res, {documentName: MAIN_DOCUMENT});

  expect(be5.url.open.mock.calls.length).toBe(1);
  expect(be5.url.open.mock.calls[0]).toEqual([{documentName: "MAIN_DOCUMENT"}, "#!static/welcome.be"]);
});

test('load and _performForm test', () => {
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: "test"}}/>
    </TestProvider>
  );
  //be5.url.set = jest.fn();
  be5.net.request = (action, requestParams, data) => {data(testData.emptyForm, {documentName: 'test'})};

  let params = {
    entity: 'users',
    query: 'All records',
    operation: 'Insert',
    contextParams: {},
    operationParams: {'user_name':'Guest',_selectedRows_: '12'}
  };
  forms.load(params, {documentName: "test"});
  //_performOperationResult(testData.emptyForm, {documentName: 'test'});

  //expect(be5.url.set.mock.calls.length).toBe(1);
  //expect(mockFunc.mock.calls.length).toBe(1);
  expect(component.toJSON()).toMatchSnapshot();
});

test('openOperationByUrl', () => {
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: "test"}}/>
    </TestProvider>
  );
  be5.net.request = (action, requestParams, data) => {data(testData.emptyForm, {documentName: 'test'})};

  openOperationByUrl('form/users/All records/Insert/user_name=Guest/_selectedRows_=12', {documentName: "test"});

  expect(component.toJSON()).toMatchSnapshot();
});

test('fetchOperationByUrl', () => {
  fetchOperationByUrl('form/users/All records/Insert/user_name=Guest/_selectedRows_=12', () => {});

  expect(_post.mock.calls.length).toBe(4);

  expect(_post.mock.calls[3][0]).toEqual("form");

  const formData = _post.mock.calls[3][1];
  expect(formData.get("_en_")).toEqual("users");
  expect(formData.get("_on_")).toEqual("Insert");
  expect(formData.get("_params_")).toEqual('{"user_name":"Guest","_selectedRows_":"12"}');
  expect(formData.get("_qn_")).toEqual("All records");
  expect(formData.get("_ts_")).toEqual(expect.any(String));

  expect(_post.mock.calls[3][2]).toEqual(expect.any(Function));
  expect(_post.mock.calls[3][3]).toEqual(be5.log.error);
});

// test('fetchOperationByUrl data', () => {
//   be5.net.request = (action, requestParams, data) => {data(testData.emptyForm, {documentName: 'test'})};
//
//   let data;
//   fetchOperationByUrl('form/users/All records/Insert/user_name=Guest/_selectedRows_=12', json => {data = json;});
//
//   expect(data).toBe(testData.emptyForm);
// });

