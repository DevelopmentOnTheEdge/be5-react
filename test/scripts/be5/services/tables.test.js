import React            from 'react';
import be5              from '../../../../src/scripts/be5/be5';
import {fetchTableByUrl, loadTable} from '../../../../src/scripts/be5/services/tables';
import testData       from '../testData.json';

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

test('fetchTableByUrl', () => {
  be5.net.request = jest.fn();

  fetchTableByUrl("table/users/All records/user_name=demo", () => {});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "table",
    {
      "_ts_": expect.any(Number),
      "_en_": "users",
      "_qn_": "All records",
      "_params_": '{"user_name":"demo","_cleanNav_":"true"}'
    },
    expect.any(Function),
    expect.any(Function)
  ]);

});

test('getTableByUrl data', () => {
  be5.net.request = (action, requestParams, data) => {data(testData.simpleTable, {documentName: 'test'})};

  let data;
  fetchTableByUrl("table/users/All records/user_name=demo", json => {data = json;});

  expect(data).toBe(testData.simpleTable);
});
