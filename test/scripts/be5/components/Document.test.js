import React from 'react';
import renderer from 'react-test-renderer';
import Document, {Document as RawDocument} from '../../../../src/scripts/be5/containers/Document';
import changeDocument from '../../../../src/scripts/be5/core/changeDocument';
import {mount, shallow} from 'enzyme';
import {getTestStore, TestProvider} from "../testUtils";
import {Provider} from 'react-redux';
import {MAIN_DOCUMENT} from "../../../../src/scripts/be5/constants";


test('snapshot', () => {
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: MAIN_DOCUMENT}}/>
    </TestProvider>
  );

  expect(component.toJSON()).toMatchSnapshot();

  changeDocument(MAIN_DOCUMENT, { value: "Page loaded." } );
  expect(component.toJSON()).toMatchSnapshot();
});

test('frontendParams init state, props', () => {
  const wrapper = mount( <RawDocument frontendParams={{documentName: "test"}} store={getTestStore()}/> );

  expect(wrapper.props()).toEqual({"frontendParams": {"documentName": "test"}, store: expect.any(Object)});
  expect(wrapper.state()).toEqual({"frontendParams": {"documentName": "test"}, "value": null});

  expect(wrapper.instance().getComponentFrontendParams()).toEqual({"documentName": "test"});
});

test('frontendParams state', () => {
  const wrapper = mount( <RawDocument frontendParams={{documentName: "test"}}/> );

  const onSuccess = function onSuccess(json, applyParams){};

  changeDocument("test", {value: "Text", frontendParams: {
    parentDocumentName: "parentDoc",
    onSuccess: onSuccess
  }});

  expect(wrapper.instance().getComponentFrontendParams()).toEqual({
    "documentName": "test", "parentDocumentName": "parentDoc", "onSuccess": onSuccess
  });

  changeDocument("test", {value: "Text"});

  expect(wrapper.instance().getComponentFrontendParams()).toEqual({
    "documentName": "test"
  });

});

test('frontendParams state with value in props', () => {
  const propsOnSuccess = function onSuccess(json, applyParams){};

  const wrapper = mount( <RawDocument frontendParams={{documentName: "test", parentDocumentName: "propsParentDoc", onSuccess: propsOnSuccess}}/> );

  changeDocument("test", {value: "Text"});

  expect(wrapper.instance().getComponentFrontendParams()).toEqual({
    "documentName": "test", "parentDocumentName": "propsParentDoc", "onSuccess": propsOnSuccess
  });
});

test('others props value', () => {
  const wrapper = mount( <RawDocument frontendParams={{documentName: "test", operationDocumentName: "form", parentDocumentName: "propsParentDoc"}} /> );

  expect(wrapper.instance().getComponentFrontendParams()).toEqual({
    "documentName": "test", "operationDocumentName": "form", "parentDocumentName": "propsParentDoc"
  });

  changeDocument("test", {value: "Text", frontendParams: {test: "test"}});

  expect(wrapper.state().value).toEqual("Text");
  expect(wrapper.instance().getComponentFrontendParams()).toEqual({
    "documentName": "test", "operationDocumentName": "form", "parentDocumentName": "propsParentDoc", "test": "test"
  });
});

//todo test Document
// test('_performData', () => {
//   const handle = jest.fn();
//   bus.replaceListeners("testDoc", handle);
//
//   tables._performData(testData.simpleTable, "testDoc");
//
//   expect(handle.mock.calls[0]).toEqual([{ value: testData.simpleTable }]);
// });
//
// test('_performData error', () => {
//   const handle = jest.fn();
//   bus.replaceListeners("testDoc", handle);
//
//   tables._performData(testData.jsonApiError, "testDoc");
//
//   expect(handle.mock.calls[0]).toEqual([{ value: testData.jsonApiError }]);
// });
