import React from 'react';
import be5               from '../../../src/scripts/be5/be5';
import {getRoute, registerRoute} from '../../../src/scripts/be5/core/registers/routes';


test('be5.locale', () => {
  expect(be5.locale.msg('settings')).toBe('Settings');

  be5.locale.addMessages('en', {'test':'Test message'});

  expect(be5.locale.msg('test')).toBe('Test message');
});

test('be5.url', () =>
{
  expect(be5.url.empty()).toBe(true);
  be5.url.clear();
  be5.url.set('text/Test');

  expect(be5.url.create(['form', 'users','All records', 'Insert'], {'user_name':'Guest', 'field':' /"'}))
    .toBe('form/users/All%20records/Insert/user_name=Guest/field=%20%2F%22');

  expect(be5.url.parse('form/users/All%20records/Insert/user_name=Guest/field=%20%2F%22'))
    .toEqual({ positional:['form', 'users','All records', 'Insert'], named: {'user_name':'Guest', 'field':'%20%2F%22'} });

  const action = jest.fn();

  registerRoute('form', action);
  expect(getRoute('form')).toBe(action);

  be5.url.process({documentName: 'testDoc'}, '#!form/users/All%20records/user_name=Guest');

  expect(action.mock.calls.length).toBe(1);
  expect(action.mock.calls[0]).toEqual([{"documentName": "testDoc"}, "users", "All records", {"user_name": "Guest"}]);
});

