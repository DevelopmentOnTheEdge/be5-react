import React          from 'react';
import renderer       from 'react-test-renderer';
import {getTestStore, getTestUser, TestProvider} from "../testUtils";
import Document       from '../../../../src/scripts/be5/containers/Document';
import '../../../../src/scripts/be5/components/forms/Form';
import '../../../../src/scripts/be5/components/forms/HorizontalForm';
import '../../../../src/scripts/be5/components/forms/FinishedResult';
import be5            from '../../../../src/scripts/be5/be5';
import forms, {
  _performOperationResult, fetchOperationByUrl,
  openOperationByUrl
} from '../../../../src/scripts/be5/services/forms';
import testData       from '../testData.json';
import {getUser} from "../../../../src/scripts/be5/store/selectors/user.selectors";
import bus from "../../../../src/scripts/be5/core/bus";
import FrontendAction from "../../../../src/scripts/be5/services/model/FrontendAction";
import {MAIN_DOCUMENT} from "../../../../src/scripts/be5/constants";


test('load', () => {
  be5.net.request = jest.fn();
  let params = {
    entity: 'users',
    query: 'All records',
    operation: 'Insert',
    values: {},
    operationParams: {'user_name':'Guest',_selectedRows_: '12'}
  };
  forms.load(params, {documentName: 'testDoc',parentDocumentName: 'parentTestDoc'});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "form", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "operation": "Insert",
      "operationParams": '{"user_name":"Guest","_selectedRows_":"12"}',
      "query": "All records",
      "values": "{}"},
    expect.any(Function),
    expect.any(Function)
  ]);

  params = {
    entity: 'users',
    query: 'All records',
    operation: 'Insert',
    values: {},
    operationParams: {'user_name':'Guest'},
  };
  forms.apply(params, {documentName: 'testDoc',parentDocumentName: 'parentTestDoc'});
  expect(be5.net.request.mock.calls[1]).toEqual([
    "form/apply", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "operation": "Insert",
      "operationParams": '{"user_name":"Guest"}',
      "query": "All records",
      "values": "{}"},
    expect.any(Function),
    expect.any(Function)
  ]);

});

test('performOperationResult finished FinishedResult', () => {
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: "test"}}/>
    </TestProvider>
  );
  //const mockFunc = jest.fn();
  const res = {
    data: {
      type: "operationResult",
      attributes: {"operationResult": {"status":"finished"}},
      links: {"self":"form/categories/Doc categories/Edit"},
    },
    meta: {"_ts_":"1503244989281"},
  };

  _performOperationResult(res, {documentName: "test"});

  expect(component.toJSON()).toMatchSnapshot();
  //expect(mockFunc.mock.calls.length).toBe(1);
});

test('performOperationResult UPDATE_USER_INFO', () => {
  const store = getTestStore();
  be5.store = store;

  expect(getUser(store.getState()))
    .toEqual({"availableRoles": ["FrontendInit"], "currentRoles": ["FrontendInit"], "loggedIn": false, "userName": "Guest",
      "getCreationTime": "0", "defaultRoute": undefined});

  const res = {
    data: {
      type: "operationResult",
      attributes: {"operationResult": {
        status:  "finished",
        details: new FrontendAction("UPDATE_USER_INFO", getTestUser())
      }},
      links: {"self":"form/categories/Doc categories/Edit"},
    },
    meta: {"_ts_":"1503244989281"},
  };
  _performOperationResult(res, {documentName: "test"});

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
        "status": "finished",
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
      "attributes":{"operationResult": {"details":"static/welcome.be","status":"redirect"}},
      "links":{"self":"form/categories/Doc categories/Edit"}
    },
    "meta":{"_ts_":"1503244989281"}
  };
  _performOperationResult(res, {documentName: "test"});

  expect(be5.url.process.mock.calls[0]).toEqual(["test", "#!static/welcome.be"]);
  //expect(mockFunc.mock.calls.length).toBe(1);
});

test('performOperationResult redirect MAIN_DOCUMENT', () => {
  be5.url.process = jest.fn();

  const res = {
    "data":{
      "type":"operationResult",
      "attributes":{"operationResult": {"details":"static/welcome.be","status":"redirect"}},
      "links":{"self":"form/categories/Doc categories/Edit"}
    },
    "meta":{"_ts_":"1503244989281"}
  };
  _performOperationResult(res, {documentName: MAIN_DOCUMENT});

  expect(be5.url.process.mock.calls.length).toBe(1);
  expect(be5.url.process.mock.calls[0]).toEqual(["MAIN_DOCUMENT", "#!static/welcome.be"]);
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
    values: {},
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
  be5.net.request = jest.fn();

  fetchOperationByUrl('form/users/All records/Insert/user_name=Guest/_selectedRows_=12', () => {});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "form", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "operation": "Insert",
      "operationParams": '{"user_name":"Guest","_selectedRows_":"12"}',
      "query": "All records",
      "values": "{}"},
    expect.any(Function),
    expect.any(Function)
  ]);
});

test('fetchOperationByUrl data', () => {
  be5.net.request = (action, requestParams, data) => {data(testData.emptyForm, {documentName: 'test'})};

  let data;
  fetchOperationByUrl('form/users/All records/Insert/user_name=Guest/_selectedRows_=12', json => {data = json;});

  expect(data).toBe(testData.emptyForm);
});

