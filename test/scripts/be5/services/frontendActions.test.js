import bus from "../../../../src/scripts/be5/core/bus";
import FrontendAction from "../../../../src/scripts/be5/services/model/FrontendAction";
import {executeFrontendActions} from "../../../../src/scripts/be5/services/frontendActions";
import changeDocument from "../../../../src/scripts/be5/core/changeDocument";

jest.mock("../../../../src/scripts/be5/core/changeDocument", () => {
  return jest.fn();
});

beforeEach(() => {
  changeDocument.mockClear();
});

test('UPDATE_PARENT_DOCUMENT', () => {

  executeFrontendActions(JSON.parse('{"type":"UPDATE_PARENT_DOCUMENT", "value": {"data": "test data"}}'),
    {parentDocumentName: "test"});

  expect(changeDocument.mock.calls.length).toEqual(1);
  expect(changeDocument.mock.calls[0]).toEqual(["test", {"value": {"data": "test data", "meta": {"_ts_": expect.any(Number)}}}]);

});

test('UPDATE_DOCUMENT', () => {

  executeFrontendActions(JSON.parse('{"type":"UPDATE_DOCUMENT", "value": {"data": "test data"}}'),
    {documentName: "test"});

  expect(changeDocument.mock.calls.length).toEqual(1);
  expect(changeDocument.mock.calls[0]).toEqual(["test", {"value": {"data": "test data", "meta": {"_ts_": expect.any(Number)}}}]);

});

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

