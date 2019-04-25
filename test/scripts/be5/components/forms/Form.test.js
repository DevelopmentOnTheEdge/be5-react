import React from 'react';
import renderer from 'react-test-renderer';
import Form from '../../../../../src/scripts/be5/components/forms/Form';
import HorizontalForm from '../../../../../src/scripts/be5/components/forms/HorizontalForm';
import ModalForm from '../../../../../src/scripts/be5/components/forms/ModalForm';
import InlineMiniForm from '../../../../../src/scripts/be5/components/forms/InlineMiniForm';
import SubmitOnChangeForm from '../../../../../src/scripts/be5/components/forms/SubmitOnChangeForm';
import testData from '../../testData.json'
import forms from '../../../../../src/scripts/be5/services/forms';
import {mount, shallow} from 'enzyme';
import {MAIN_DOCUMENT} from "../../../../../src/scripts/be5/constants";
import TestFormWithCustomActions from './TestFormWithCustomActions'

test('Form', () => {
  const component = renderer.create(
    <Form value={testData.emptyForm} frontendParams={{documentName: 'test'}} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('Form on MAIN_DOCUMENT', () => {
  const component = renderer.create(
    <Form value={testData.emptyForm} frontendParams={{documentName: MAIN_DOCUMENT}} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('HorizontalForm', () => {
  const component = renderer.create(
    <HorizontalForm value={testData.emptyForm} frontendParams={{documentName: 'test'}} />
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

test('InlineMiniForm', () => {
  const component = renderer.create(
    <InlineMiniForm value={testData.simpleForm} frontendParams={{documentName: 'test'}} />
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

  wrapper.find('button').first().simulate('click');
  wrapper.instance()._applyOnSubmit({ preventDefault: () => {} });

  const formData = handle.mock.calls[0][0];
  expect(formData.get("_en_")).toEqual("companies");
  expect(formData.get("_on_")).toEqual("SelectCompany");
  expect(formData.get("_params_")).toEqual("{}");
  expect(formData.get("_qn_")).toEqual("Selection view SelectCompany");
  expect(formData.get("companyID")).toEqual("newValue");
  expect(handle.mock.calls[0][1]).toEqual({"documentName": "test"});
});

test('TestFormWithCustomActions', () => {
  const handle = forms.apply = jest.fn();

  const wrapper = mount(
    <TestFormWithCustomActions value={testData.simpleForm} frontendParams={{documentName: 'test'}} />
  );

  wrapper.find('input').simulate('change', {target: {value: 'newValue'}});

  wrapper.find('button').first().simulate('click');
  wrapper.instance()._applyOnSubmit({ preventDefault: () => {} });

  const formData = handle.mock.calls[0][0];
  expect(formData.get("_en_")).toEqual("users");
  expect(formData.get("_qn_")).toEqual("All records");
  expect(formData.get("_on_")).toEqual("Full filter");
  expect(formData.get("_params_")).toEqual("{}");
  expect(formData.get("companyID")).toEqual("newValue");
  expect(handle.mock.calls[0][1]).toEqual({"documentName": "test"});
});

test('reloadOnChange', () => {
  const handle = forms.load = jest.fn();

  const wrapper = mount(
    <Form value={testData.reloadOnChangeForm} frontendParams={{documentName: 'test'}} />
  );

  wrapper.find('input').simulate('change', {target: {value: 'newValue'}});
  wrapper.find('input').simulate('blur');

  const formData = handle.mock.calls[0][0];
  expect(formData.get("_en_")).toEqual("companies");
  expect(formData.get("_on_")).toEqual("SelectCompany");
  expect(formData.get("_params_")).toEqual("{}");
  expect(formData.get("_qn_")).toEqual("Selection view SelectCompany");
  expect(formData.get("_reloadControl_")).toEqual("/companyID");
  expect(formData.get("companyID")).toEqual("newValue");
  expect(handle.mock.calls[0][1]).toEqual({"documentName": "test"});
});

//TODO поменять на radio select input
// test('SubmitOnChangeForm reloadOnChange', () => {
//   const handle = forms.apply = jest.fn();
//
//   const wrapper = mount(
//     <SubmitOnChangeForm value={testData.reloadOnChangeForm} frontendParams={{documentName: 'test'}} />
//   );
//
//   wrapper.find('input').simulate('change', {target: {value: 'newValue'}});
//
//   expect(handle.mock.calls[0]).toEqual([
//     {
//       "_en_": "companies",
//       "_on_": "SelectCompany",
//       "_params_": undefined,
//       "_qn_": "Selection view SelectCompany",
//       "values": {"companyID": "newValue"}
//     },
//     {"documentName": "test"}
//   ]);
// });
