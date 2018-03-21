import React          from 'react';
import renderer       from 'react-test-renderer';
import QueryBuilder   from '../../../../src/scripts/be5/components/QueryBuilder';
import {shallow, mount, render} from 'enzyme';
import testUtils      from "../testUtils";
import { Provider }   from 'react-redux';
import testData       from '../testData.json'


test('snapshot', () => {
  const json = Object.assign({}, testData.simpleTable, {
    included: [{attributes: {
      finalSql: 'SELECT * FROM users',
      sql: 'select * from users'
    }}]
  });

  const component = renderer.create(
    <Provider store={testUtils.getStore()}>
      <QueryBuilder value={json}/>
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
