import React          from 'react';
import renderer       from 'react-test-renderer';
import QueryBuilder   from '../../../../src/scripts/be5/components/QueryBuilder';
import '../../../../src/scripts/be5/components/tables/Table';
import {shallow, mount, render} from 'enzyme';
import {TestProvider}      from "../testUtils";
import testData       from '../testData.json'
import '../../../../src/scripts/be5/registers'
import * as utils from "../../../../src/scripts/be5/utils/utils";
import dt from 'datatables.net';

jest.spyOn(utils, "isGuest").mockReturnValue(false);
dt(window, $);

test('snapshot', () => {
  const json = {
    "data": {
      "attributes": {
        sql: "select * from users",
        finalSql: "SELECT * FROM users",
        history: ["select * from users"]
      },
      "links": {
        "self": "queryBuilder"
      },
      "type": "queryBuilder"
    },
    "errors": [],
    "included": [
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
