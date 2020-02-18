import React from 'react';
import renderer from 'react-test-renderer';
import {TestProvider} from "../../testUtils";
import be5 from '../../../../../src/scripts/be5/be5';
import {loadForm} from '../../../../../src/scripts/be5/services/forms';
import Table from '../../../../../src/scripts/be5/components/tables/Table';
import TableForm from '../../../../../src/scripts/be5/components/tables/TableForm';
import FormTable from '../../../../../src/scripts/be5/components/tables/FormTable';
import TableFormRow from '../../../../../src/scripts/be5/components/tables/TableFormRow';
import {mount, render, shallow} from 'enzyme';
import testData from '../../testData.json'
import '../../../../../src/scripts/be5/registers'
import {MAIN_DOCUMENT} from "../../../../../src/scripts/be5/constants";

import dt from 'datatables.net';
import OperationBox from "../../../../../src/scripts/be5/components/tables/OperationBox";
import {openPage} from "../../../../../src/scripts/be5/components/tables/tableBoxes/DataTablesTableBox";
dt(window, $);

jest.mock('../../../../../src/scripts/be5/services/forms', () => ({
  __esModule: true, // this property makes it work
  loadForm: jest.fn()
}));


test('OperationBox test', () => {
  const onOperationClick = jest.fn();
  const wrapper = mount(<OperationBox
    operations={testData.simpleTable.included[0]}
    onOperationClick={onOperationClick}
    selectedRows={[]}
    hasRows={true}
    hideOperations={[]}
  /> );

  wrapper.find('.btn').last().simulate('click');

  expect(onOperationClick.mock.calls[0]).toEqual([{"clientSide": false, "isClientSide": false, "name": "Insert",
    "requiresConfirmation": false, "title": "Добавить", "visibleWhen": "always"}]);
  wrapper.find('.btn').first().simulate('click');
  expect(onOperationClick.mock.calls.length).toEqual(1);

  const wrapper2 = mount(<OperationBox
    operations={testData.simpleTable.included[0]}
    onOperationClick={onOperationClick}
    selectedRows={[12]}
    hasRows={true}
    hideOperations={[]}
  /> );

  wrapper2.find('.btn').first().simulate('click');

  expect(onOperationClick.mock.calls[1]).toEqual([{"clientSide": false, "isClientSide": false, "name": "Edit",
    "requiresConfirmation": false, "title": "Редактировать", "visibleWhen": "oneSelected"}]);
});


test('Table', () => {
  const component = renderer.create(
    <TestProvider>
      <Table value={testData.simpleTable} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Table with topForm', () => {
  const json = '{"data":{"attributes":{"category":"users","columns":[{"name":"User","title":"User"}],"layout":{"topForm":"TopFilter"},"length":10,"offset":0,"orderColumn":-1,"orderDir":"asc","page":"All records","parameters":{},"rows":[{"cells":[{"content":"test","options":{}}],"id":"test"},{"cells":[{"content":"Administrator","options":{}}],"id":"Administrator"},{"cells":[{"content":"test2","options":{}}],"id":"test2"}],"selectable":true,"title":"Пользователи","totalNumberOfRows":3},' +
    '"links":{"self":"table/users/All records"},"type":"table"},"included":[' +
    '{"attributes":{"bean":{"values":{"user_name":"","_search_presets_":"","_search_":true},"meta":{"/user_name":{"displayName":"Логин","canBeNull":true,"columnSize":"100"},"/_search_presets_":{"displayName":"_search_presets_","hidden":true,"readOnly":true,"canBeNull":true},"/_search_":{"displayName":"_search_","type":"Boolean","hidden":true,"readOnly":true,"canBeNull":true}},"order":["/user_name","/_search_presets_","/_search_"]},' +
      '"entity":"users","layout":{"properties":"user_name"},"operation":"TopFilter","operationParams":{},"operationResult":{"status":"GENERATE"},"query":"All records","title":"Пользователи: "},' +
      '"id":"topForm","links":{"self":"form/users/All records/TopFilter"},"type":"form"},' +
    '{"attributes":[{"clientSide":false,"layout":{"properties":"user_name"},"name":"TopFilter","requiresConfirmation":false,"title":"","visibleWhen":"always"}],' +
      '"type":"documentOperations"},' +
    '{"attributes":{"operationParamsInfo":[]},"type":"filterInfo"}],"meta":{"_ts_":"1549734295598"}}';
  const component = renderer.create(
    <TestProvider>
      <Table value={JSON.parse(json)} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Table on MAIN_DOCUMENT', () => {
  const component = renderer.create(
    <TestProvider>
      <Table value={testData.simpleTable} frontendParams={{documentName: MAIN_DOCUMENT}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('TableForm', () => {
  const component = renderer.create(
    <TestProvider>
      <TableForm value={testData.simpleTable} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('FormTable', () => {
  const component = renderer.create(
    <TestProvider>
      <FormTable value={testData.simpleTable} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('TableFormRow', () => {
  const component = renderer.create(
    <TestProvider>
      <TableFormRow value={testData.simpleTable} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('tableWithFilterInfo', () => {
  const component = renderer.create(
    <TestProvider>
      <Table value={testData.tableWithFilterInfo} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});


test('noRecordsOnThePage', () => {
  const component = renderer.create(
    <TestProvider>
      <Table value={testData.noRecordsOnThePageTable} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Empty table with custom message', () => {
  const json = '{"data":{"attributes":{"category":"users","columns":[],"messageWhenEmpty":"Empty table","layout":{},' +
    '"length":10,"offset":0,"orderColumn":-1,"orderDir":"asc","page":"All records","parameters":{},"rows":[],"selectable":true,"title":"Пользователи","totalNumberOfRows":0},' +
    '"links":{"self":"table/users/All records"},"type":"table"},"included":[' +
    '{"attributes":{"operationParamsInfo":[]},"type":"filterInfo"}],"meta":{"_ts_":"1549734295598"}}';
  const component = renderer.create(
    <TestProvider>
      <Table value={JSON.parse(json)} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Empty table with default message 1', () => {
  const json = '{"data":{"attributes":{"category":"users","columns":[],"layout":{},' +
    '"length":10,"offset":0,"orderColumn":-1,"orderDir":"asc","page":"All records","parameters":{},"rows":[],"selectable":true,"title":"Пользователи","totalNumberOfRows":0},' +
    '"links":{"self":"table/users/All records"},"type":"table"},"included":[' +
    '{"attributes":{"operationParamsInfo":[]},"type":"filterInfo"}],"meta":{"_ts_":"1549734295598"}}';
  const component = renderer.create(
    <TestProvider>
      <Table value={JSON.parse(json)} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Empty table with default message 2', () => {
  const json = '{"data":{"attributes":{"category":"users","columns":[],"messageWhenEmpty":"","layout":{},' +
    '"length":10,"offset":0,"orderColumn":-1,"orderDir":"asc","page":"All records","parameters":{},"rows":[],"selectable":true,"title":"Пользователи","totalNumberOfRows":0},' +
    '"links":{"self":"table/users/All records"},"type":"table"},"included":[' +
    '{"attributes":{"operationParamsInfo":[]},"type":"filterInfo"}],"meta":{"_ts_":"1549734295598"}}';
  const component = renderer.create(
    <TestProvider>
      <Table value={JSON.parse(json)} frontendParams={{documentName: 'test'}} />
    </TestProvider>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
