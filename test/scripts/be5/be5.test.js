import React from 'react';
import be5               from '../../../src/scripts/be5/be5';
import actionsCollection from '../../../src/scripts/be5/services/actionsCollection';
import renderer from 'react-test-renderer';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import {shallow, mount, render} from 'enzyme';


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

  expect(be5.url.create('form', ['users','All records'], {'user_name':'Guest'}))
    .toBe('form/users/All records/user_name=Guest');

  expect(be5.url.parse('form/users/All records/user_name=Guest'))
    .toEqual({ positional:['form', 'users','All records'], named: {'user_name':'Guest'} });

  const action = jest.fn();

  actionsCollection.registerAction('form', action);
  expect(actionsCollection.getAction('form')).toBe(action);

  be5.url.process('testDoc', '#!form/users/All records/user_name=Guest');

  expect(action.mock.calls.length).toBe(1);
  expect(action.mock.calls[0]).toEqual(["testDoc", "users", "All records", {"user_name": "Guest"}]);
});

