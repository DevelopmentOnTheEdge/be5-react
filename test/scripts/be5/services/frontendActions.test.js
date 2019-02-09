import bus from "../../../../src/scripts/be5/core/bus";
import be5 from "../../../../src/scripts/be5/be5";
import {executeFrontendActions} from "../../../../src/scripts/be5/services/frontendActions";
import changeDocument from "../../../../src/scripts/be5/core/changeDocument";
import be5init from "../../../../src/scripts/be5/be5init";
import {getTestStore, getTestUser} from "../testUtils";
import {updateUserInfo} from "../../../../src/scripts/be5/store/actions/user.actions";

jest.mock("../../../../src/scripts/be5/core/changeDocument", () => {
  return jest.fn();
});

beforeEach(() => {
  changeDocument.mockClear();
});

test('SET_URL', () => {
  be5.url.open = jest.fn();
  executeFrontendActions(JSON.parse('{"type":"SET_URL", "value": "table/testtable/Test 1D"}'),
    {documentName: "test"});

  expect(be5.url.open.mock.calls[0]).toEqual([{documentName: "MAIN_DOCUMENT"}, "#!table/testtable/Test 1D"]);
});

test('REDIRECT MAIN_DOCUMENT', () => {
  be5.url.open = jest.fn();
  executeFrontendActions(JSON.parse('{"type":"REDIRECT", "value": "table/testtable/Test 1D"}'),
    {documentName: "MAIN_DOCUMENT"});

  expect(be5.url.open.mock.calls[0]).toEqual([{documentName: "MAIN_DOCUMENT"}, "#!table/testtable/Test 1D"]);
});

test('REDIRECT', () => {
  be5.url.process = jest.fn();
  executeFrontendActions(JSON.parse('{"type":"REDIRECT", "value": "table/testtable/Test 1D"}'),
    {documentName: "test"});

  expect(be5.url.process.mock.calls[0]).toEqual([{documentName: "test"}, "#!table/testtable/Test 1D"]);
});

test('OPEN_DEFAULT_ROUTE', () => {
  const store = getTestStore();
  store.dispatch(updateUserInfo(getTestUser()));
  be5init.init(store);

  be5.url.open = jest.fn();
  executeFrontendActions(JSON.parse('{"type":"OPEN_DEFAULT_ROUTE"}'),
    {documentName: "test"});

  expect(be5.url.open.mock.calls[0]).toEqual([{documentName: "MAIN_DOCUMENT"}, "#!"]);
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

test('executeFrontendActions test', () => {
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

