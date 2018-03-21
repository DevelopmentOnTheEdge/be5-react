import React          from 'react';
import renderer       from 'react-test-renderer';
import Document, {Document as RawDocument}       from '../../../../src/scripts/be5/containers/Document';
import changeDocument from '../../../../src/scripts/be5/core/changeDocument';
import {shallow, mount} from 'enzyme';
import testUtils, {TestProvider}      from "../testUtils";
import { Provider }   from 'react-redux';


test('snapshot', () => {
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: "MainDocument"}}/>
    </TestProvider>
  );

  expect(component.toJSON()).toMatchSnapshot();

  changeDocument('MainDocument', { value: "Page loaded." } );
  expect(component.toJSON()).toMatchSnapshot();
});

test('frontendParams init state, props', () => {
  const wrapper = mount( <RawDocument frontendParams={{documentName: "test"}} store={testUtils.getStore()}/> );

  expect(wrapper.props()).toEqual({"frontendParams": {"documentName": "test"}, store: expect.any(Object)});
  expect(wrapper.state()).toEqual({"frontendParams": {"documentName": "test"}, "value": ""});

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
