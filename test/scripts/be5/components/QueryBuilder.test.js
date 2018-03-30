import React          from 'react';
import renderer       from 'react-test-renderer';
import QueryBuilder   from '../../../../src/scripts/be5/components/QueryBuilder';
import '../../../../src/scripts/be5/components/tables/Table';
import {shallow, mount, render} from 'enzyme';
import {TestProvider}      from "../testUtils";
import testData       from '../testData.json'


test('snapshot', () => {
  const json = {
    "data": {
      "attributes": "select * from users",
      "links": {
        "self": "queryBuilder"
      },
      "type": "queryBuilder"
    },
    "errors": [],
    "included": [
      {
        "attributes": {
          "content": "SELECT * FROM users LIMIT 2147483647",
          "title": "Final sql"
        },
        "id": "finalSql",
        "type": "static"
      },
      Object.assign({id: "result"}, testData.simpleTable.data)
    ],
    meta: testData.simpleTable.meta
  };

  const component = renderer.create(
    <TestProvider>
      <QueryBuilder value={json}/>
    </TestProvider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
