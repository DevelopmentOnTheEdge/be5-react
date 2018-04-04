import React            from 'react';
import be5              from '../../../../src/scripts/be5/be5';
import {loadTable}           from '../../../../src/scripts/be5/services/tables';


test('load', () => {
  be5.net.request = jest.fn();

  const paramsObject = {
    entity: 'users',
    query: 'All records',
    params: {'user_name': 'demo'}
  };
  loadTable(paramsObject, {documentName: 'testDoc'});

  expect(be5.net.request.mock.calls.length).toBe(1);
  expect(be5.net.request.mock.calls[0]).toEqual([
    "table",
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
