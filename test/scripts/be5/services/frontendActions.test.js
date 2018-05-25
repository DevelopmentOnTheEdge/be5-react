import bus from "../../../../src/scripts/be5/core/bus";
import FrontendAction from "../../../../src/scripts/be5/services/model/FrontendAction";
import {executeFrontendActions} from "../../../../src/scripts/be5/services/frontendActions";


test('executeFrontendActions TEST', () => {
  let out = '';

  bus.listen("executeFrontendActions", ({actions}) => {
    if(actions["TEST"] !== undefined)
    {
      out = actions["TEST"] + ' 1'
    }
  });

  const actionsArray = JSON.parse('{"type":"TEST", "value": "test data"}');

  executeFrontendActions(actionsArray, {documentName: "test"});

  expect(out).toEqual('test data 1');
});

