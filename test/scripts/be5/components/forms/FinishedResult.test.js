import React          from 'react';
import renderer       from 'react-test-renderer';
import FinishedResult from '../../../../../src/scripts/be5/components/forms/FinishedResult';
import {MAIN_DOCUMENT} from "../../../../../src/scripts/be5/constants";


test('snapshot', () => {
  const json = {
    "data":{
      "attributes":{"operationResult": {"status":"finished"}},
      "type":"operationResult",
      "links":{"self":"form/categories/Doc categories/Delete/selectedRows=105"}
    },
    "meta":{"_ts_":"1518764107016"}
  };

  const component = renderer.create(
    <FinishedResult value={json} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('snapshot custom message', () => {
  const json = {
    "data":{
      "attributes":{"operationResult": {"status":"finished", "message":"Test message."}},
      "type":"operationResult",
      "links":{"self":"form/categories/Doc categories/Delete/selectedRows=105"}
    },
    "meta":{"_ts_":"1518764107016"}
  };

  const component = renderer.create(
    <FinishedResult value={json} frontendParams={{documentName: MAIN_DOCUMENT}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
