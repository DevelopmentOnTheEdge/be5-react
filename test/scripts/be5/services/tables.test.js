import React            from 'react';
import be5              from '../../../../src/scripts/be5/be5';
import bus              from '../../../../src/scripts/be5/core/bus';
import tables           from '../../../../src/scripts/be5/services/tables';
import changeDocument   from '../../../../src/scripts/be5/core/changeDocument';
import Table            from '../../../../src/scripts/be5/components/tables/Table';
import ErrorPane        from '../../../../src/scripts/be5/components/ErrorPane';
import testData         from '../testData.json'

test('load', () => {
  be5.net.request = jest.fn();

  const paramsObject = {
    entity: 'users',
    query: 'All records',
    params: {'user_name': 'demo'}
  };
  tables.load(paramsObject, 'testDoc');

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "document",
    {
      "_ts_": expect.any(Number),
      "entity": "users",
      "query": "All records",
      "values": '{"user_name":"demo"}'
    },
    expect.any(Function),
    expect.any(Function)
  ]);

});

test('refresh', () => {
  be5.net.request = jest.fn();

  const paramsObject = {
    entity: 'users',
    query: 'All records',
    params: {'user_name': 'demo'}
  };
  tables.refresh(paramsObject, 'testDoc');

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "document",
    {
      "_ts_": expect.any(Number),
      "entity": "users",
      "query": "All records",
      "values": '{"user_name":"demo"}'
    },
    expect.any(Function),
    expect.any(Function)
  ]);

});
