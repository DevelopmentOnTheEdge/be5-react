import React          from 'react';
import renderer       from 'react-test-renderer';
import QueryBuilder   from '../../../../src/scripts/be5/components/QueryBuilder';
import {shallow, mount, render} from 'enzyme';
import {TestProvider}      from "../testUtils";
import testData       from '../testData.json'


test('snapshot', () => {
  const json = {
    data: {
      type: "queryBuilder",
      attributes: {
        finalSql: 'SELECT * FROM users',
        sql: 'select * from users'
      }
    },
    included: [Object.assign({}, testData.simpleTable.data, {id: "queryTable"})],
    meta: testData.simpleTable.meta
  };

  const component = renderer.create(
    <TestProvider>
      <QueryBuilder value={json}/>
    </TestProvider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
