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

import dt from 'datatables.net';
import {MAIN_DOCUMENT} from "../../../../../src/scripts/be5/constants";

dt(window, $);

jest.mock('../../../../../src/scripts/be5/services/forms', () => ({
  __esModule: true, // this property makes it work
  loadForm: jest.fn()
}));


test('test operation click', () => {
  const wrapper = mount( <Table value={testData.simpleTable} frontendParams={{documentName: 'test'}}/> );

  wrapper.find('.btn').last().simulate('click');

  expect(loadForm.mock.calls[0]).toEqual([
    {"_en_": "companies", "_on_": "Insert", "_params_": "{}", "_qn_": "All records"},
    {"documentName": "test", "parentDocumentName": "test"}]);

  be5.tableState.selectedRows = [12];
  wrapper.instance().refs.tableBox.onSelectionChange();

  wrapper.find('.btn').first().simulate('click');

  expect(loadForm.mock.calls[1]).toEqual([
    {"_en_": "companies", "_on_": "Edit", "_params_": "{\"_selectedRows_\":\"12\"}", "_qn_": "All records"},
    {"documentName": "test", "parentDocumentName": "test"}]);
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
