import React          from 'react';
import renderer       from 'react-test-renderer';
import Form           from '../../../../../src/scripts/be5/components/forms/Form';
import ModalForm      from '../../../../../src/scripts/be5/components/forms/ModalForm';
import InlineForm     from '../../../../../src/scripts/be5/components/forms/InlineForm';
import SubmitOnChangeForm           from '../../../../../src/scripts/be5/components/forms/SubmitOnChangeForm';
import testData       from '../../testData.json'
import forms from '../../../../../src/scripts/be5/services/forms';
import {shallow, mount} from 'enzyme';


test('Form', () => {
  const component = renderer.create(
    <Form value={testData.emptyForm} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('Form errorOnApply', () => {
  const component = renderer.create(
    <Form value={testData.errorOnApply} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('ModalForm', () => {
  const component = renderer.create(
    <ModalForm value={testData.emptyForm} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('InlineForm', () => {
  const component = renderer.create(
    <InlineForm value={testData.emptyForm} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('SubmitOnChangeForm', () => {
  const component = renderer.create(
    <SubmitOnChangeForm value={testData.simpleForm} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('submit form', () => {
  const handle = forms.apply = jest.fn();

  const wrapper = mount(
    <Form value={testData.simpleForm} frontendParams={{documentName: 'test'}} />
  );

  wrapper.find('input').simulate('change', {target: {value: 'newValue'}});

  wrapper.instance()._applyOnSubmit({ preventDefault: () => {} });

  expect(handle.mock.calls[0]).toEqual([
      {
        "entity": "companies",
        "operation": "SelectCompany",
        "operationParams": undefined,
        "query": "Selection view SelectCompany",
        "selectedRows": "",
        "values": {"companyID": "newValue"}
      },
      {"documentName": "test"}
  ]);
});

test('reloadOnChange', () => {
  const handle = forms.load = jest.fn();

  const wrapper = mount(
    <Form value={testData.reloadOnChangeForm} frontendParams={{documentName: 'test'}} />
  );

  wrapper.find('input').simulate('change', {target: {value: 'newValue'}});

  expect(handle.mock.calls[0]).toEqual([
    {
      "entity": "companies",
      "operation": "SelectCompany",
      "operationParams": undefined,
      "query": "Selection view SelectCompany",
      "selectedRows": "",
      "values": {"_reloadcontrol_": "/companyID", "companyID": "newValue"}
    },
    {"documentName": "test"}
  ]);
});

test('reloadOnChange', () => {
  const handle = forms.apply = jest.fn();

  const wrapper = mount(
    <SubmitOnChangeForm value={testData.reloadOnChangeForm} frontendParams={{documentName: 'test'}} />
  );

  wrapper.find('input').simulate('change', {target: {value: 'newValue'}});

  expect(handle.mock.calls[0]).toEqual([
    {
      "entity": "companies",
      "operation": "SelectCompany",
      "operationParams": undefined,
      "query": "Selection view SelectCompany",
      "selectedRows": "",
      "values": {"companyID": "newValue"}
    },
    {"documentName": "test"}
  ]);
});