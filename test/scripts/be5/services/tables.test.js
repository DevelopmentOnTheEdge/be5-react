import React            from 'react';
import be5              from '../../../../src/scripts/be5/be5';
import {fetchTableByUrl, loadTable} from '../../../../src/scripts/be5/services/tables';
import testData       from '../testData.json';
import {clearTableState} from "../../../../src/scripts/be5/services/tableStates";

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

  loadTable(paramsObject, {documentName: 'testDoc'});

  expect(be5.net.request.mock.calls.length).toBe(2);
  expect(be5.net.request.mock.calls[1]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number),
      "_en_": "users",
      "_qn_": "All records",
      "_params_": "{\"user_name\":\"demo\",\"_search_presets_\":\"user_name\",\"_search_\":\"true\"}"
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
  clearTableState('users', 'All records', {});
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
      "_params_": "{\"_offset_\":10,\"_limit_\":100,\"_orderColumn_\":1,\"_orderDir_\":\"asc\",\"_search_\":\"true\"}"
    },
    expect.any(Function), expect.any(Function)
  ]);

});

test('fetchTableByUrl', () => {
  be5.net.request = jest.fn();

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
