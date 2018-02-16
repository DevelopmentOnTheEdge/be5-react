import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../../src/scripts/be5/components/Document';
import be5            from '../../../../src/scripts/be5/be5';
import formService    from '../../../../src/scripts/be5/services/forms';

test('load', () => {
  be5.net.request = jest.fn();
  let params = {
    entity: 'users',
    query: 'All records',
    operation: 'Insert',
    values: {},
    operationParams: {'user_name':'Guest',selectedRows: '12'}
  };
  formService.load(params, {documentName: 'testDoc',parentDocumentName: 'parentTestDoc'});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "form", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "operation": "Insert",
      "operationParams": '{"user_name":"Guest"}',
      "query": "All records",
      "selectedRows": "12",
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
    selectedRows: ''
  };
  formService.load(params, {documentName: 'testDoc',parentDocumentName: 'parentTestDoc'});
  expect(be5.net.request.mock.calls[1]).toEqual([
    "form", {
      "_ts_": expect.any(Number),
      "entity": "users",
      "operation": "Insert",
      "operationParams": '{"user_name":"Guest"}',
      "query": "All records",
      "selectedRows": "",
      "values": "{}"},
    expect.any(Function),
    expect.any(Function)
  ]);

});

test('performOperationResult finished', () => {
  const component = renderer.create(
    <Document frontendParams={{documentName: "test"}}/>
  );
  //const mockFunc = jest.fn();
  const res = {
    data: {
      type: "operationResult",
      attributes: {"status":"finished"}
    },
    links: {"self":"form/categories/Doc categories/Edit"},
    meta: {"_ts_":"1503244989281"}
  };

  formService._performOperationResult(res, {documentName: "test"});

  expect(component.toJSON()).toMatchSnapshot();
  //expect(mockFunc.mock.calls.length).toBe(1);
});

test('performOperationResult redirect', () => {
  //const mockFunc = jest.fn();
  be5.url.process = jest.fn();

  const res = {
    "data":{
      "type":"operationResult",
      "attributes":{"details":"static/welcome.be","status":"redirect"}
    },
    "links":{"self":"form/categories/Doc categories/Edit"},
    "meta":{"_ts_":"1503244989281"}
  };
  formService._performOperationResult(res, {documentName: "test"});

  expect(be5.url.process.mock.calls.length).toBe(1);
  //expect(mockFunc.mock.calls.length).toBe(1);
});

test('performOperationResult redirect main', () => {
  //const mockFunc = jest.fn();
  be5.url.set = jest.fn();

  const res = {
    "data":{
      "type":"operationResult",
      "attributes":{"details":"static/welcome.be","status":"redirect"}
    },
    "links":{"self":"form/categories/Doc categories/Edit"},
    "meta":{"_ts_":"1503244989281"}
  };
  formService._performOperationResult(res, {documentName: be5.mainDocumentName});

  expect(be5.url.set.mock.calls.length).toBe(1);
  //expect(mockFunc.mock.calls.length).toBe(1);
});
