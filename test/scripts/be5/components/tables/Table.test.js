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
