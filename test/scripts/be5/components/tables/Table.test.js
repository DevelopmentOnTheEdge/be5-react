import React          from 'react';
import renderer       from 'react-test-renderer';
import be5            from '../../../../../src/scripts/be5/be5';
import forms          from '../../../../../src/scripts/be5/services/forms';
import Table          from '../../../../../src/scripts/be5/components/tables/Table';
import TableForm      from '../../../../../src/scripts/be5/components/tables/TableForm';
import FormTable      from '../../../../../src/scripts/be5/components/tables/FormTable';
import TableFormRow   from '../../../../../src/scripts/be5/components/tables/TableFormRow';
import {shallow, mount, render} from 'enzyme';
import testData       from '../../testData.json'

import dt from 'datatables.net';
dt(window, $);


test('test datatables', () => {
  const handle = forms.load = jest.fn();

  const wrapper = mount( <Table value={testData.simpleTable} frontendParams={{documentName: 'test'}}/> );

  wrapper.find('.btn').last().simulate('click');

  expect(handle.mock.calls[0]).toEqual([
    {"entity": "companies", "operation": "Insert", "operationParams": {}, "query": "Общие сведения", "values": {}},
    {"documentName": "test", "parentDocumentName": "test"}]);

  be5.tableState.selectedRows = [12];
  wrapper.instance().refs.tableBox.onSelectionChange();

  wrapper.find('.btn').first().simulate('click');

  expect(handle.mock.calls[1]).toEqual([
    {"entity": "companies", "operation": "Edit", "operationParams": {}, "query": "Общие сведения", "values": {}},
    {"documentName": "test", "parentDocumentName": "test"}]);
});


test('Table', () => {
  const component = renderer.create(
    <Table value={testData.simpleTable}/>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('TableForm', () => {
  const component = renderer.create(
    <TableForm value={testData.simpleTable}/>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('FormTable', () => {
  const component = renderer.create(
    <FormTable value={testData.simpleTable}/>
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('TableFormRow', () => {
  const component = renderer.create(
    <TableFormRow value={testData.simpleTable}/>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
