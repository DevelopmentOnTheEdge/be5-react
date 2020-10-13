import React from 'react';
import be5 from '../../../../src/scripts/be5/be5';
import {
  clearTableFilter,
  fetchTableByUrl,
  loadTable, openTablePage,
  setTableFilter
} from '../../../../src/scripts/be5/services/tables';
import testData from '../testData.json';

test('load', () => {
  be5.net.request = jest.fn();

  const paramsObject = {
    "_en_": 'users',
    "_qn_": 'All records',
    "_params_": {'user_name': 'demo'}
  };
  loadTable(paramsObject, {documentName: 'testDoc'});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number),
      "_en_": "users",
      "_qn_": "All records",
      "_params_": '{"user_name":"demo"}'
    },
    expect.any(Function),
    expect.any(Function)
  ]);
});

test('load with saved filter', () => {
  be5.net.request = jest.fn();
  setTableFilter('users', 'All records', {'user_name':'demo',
    '_search_presets_':'user_name','_search_': 'true','value':'test'});

  const paramsObject = {
    "_en_": 'users',
    "_qn_": 'All records',
    "_params_": {'user_name': 'demo'}
  };
  loadTable(paramsObject, {documentName: 'testDoc'});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number),
      "_en_": "users",
      "_qn_": "All records",
      "_params_": "{\"user_name\":\"demo\",\"_search_presets_\":\"user_name\",\"_search_\":\"true\",\"value\":\"test\"}"
    },
    expect.any(Function),
    expect.any(Function)
  ]);

});

test('test saved filter param', () => {
  be5.net.request = jest.fn();

  const paramsWithFilter = {
    "_en_": 'users',
    "_qn_": 'All records',
    "_params_": {'user_name': 'demo', '_search_': 'true'}
  };
  loadTable(paramsWithFilter, {documentName: 'testDoc'});

  expect(be5.net.request.mock.calls[0]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number), "_en_": "users", "_qn_": "All records",
      "_params_": "{\"user_name\":\"demo\",\"_search_\":\"true\"}"
    },
    expect.any(Function), expect.any(Function)
  ]);

  const simpleParams = {
    "_en_": 'users',
    "_qn_": 'All records',
    "_params_": {}
  };
  loadTable(simpleParams, {documentName: 'testDoc'});

  expect(be5.net.request.mock.calls[1]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number), "_en_": "users", "_qn_": "All records",
      "_params_": "{\"user_name\":\"demo\",\"_search_\":\"true\"}"
    },
    expect.any(Function), expect.any(Function)
  ]);

});

test('test saved nav param', () => {
  be5.net.request = jest.fn();
  clearTableFilter('users', 'All records', {});
  const paramsWithFilter = {
    "_en_": 'users',
    "_qn_": 'All records',
    "_params_": {"_search_":"true","_offset_":10,"_limit_":100,"_orderColumn_":1,"_orderDir_":"asc"}
  };
  loadTable(paramsWithFilter, {documentName: 'testDoc'});

  expect(be5.net.request.mock.calls[0]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number), "_en_": "users", "_qn_": "All records",
      "_params_": "{\"_search_\":\"true\",\"_offset_\":10,\"_limit_\":100,\"_orderColumn_\":1,\"_orderDir_\":\"asc\"}"
    },
    expect.any(Function), expect.any(Function)
  ]);

  const simpleParams = {
    "_en_": 'users',
    "_qn_": 'All records',
    "_params_": {}
  };
  loadTable(simpleParams, {documentName: 'testDoc'});

  expect(be5.net.request.mock.calls[1]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number), "_en_": "users", "_qn_": "All records",
      "_params_": "{\"_search_\":\"true\",\"_offset_\":10,\"_limit_\":100,\"_orderColumn_\":1,\"_orderDir_\":\"asc\"}"
    },
    expect.any(Function), expect.any(Function)
  ]);

});

test('fetchTableByUrl', () => {
  be5.net.request = jest.fn();
  setTableFilter('users', 'All records', {'user_name':'demo',
    '_search_presets_':'user_name','_search_': 'true','value':'test'});

  fetchTableByUrl("#!table/users/All records/user_name=demo", () => {});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number),
      "_en_": "users",
      "_qn_": "All records",
      "_params_": '{"user_name":"demo"}'
    },
    expect.any(Function),
    be5.log.error
  ]);

});

test('getTableByUrl data', () => {
  be5.net.request = (action, requestParams, data) => {data(testData.simpleTable, {documentName: 'test'})};

  let data;
  fetchTableByUrl("table/users/All records/user_name=demo", json => {data = json;});

  expect(data).toBe(testData.simpleTable);
});

test('openTablePage', () => {
  be5.net.request = jest.fn();
  openTablePage(testData.simpleTable.data.attributes, {documentName: 'test'}, 5);
  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number),
      "_en_": "companies",
      "_qn_": "All records",
      "_params_": "{\"_search_\":\"true\",\"_offset_\":\"40\"}"
    },
    expect.any(Function),
    expect.any(Function)
  ]);
});
