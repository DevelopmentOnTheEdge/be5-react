import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../../src/scripts/be5/components/Document';
import changeDocument from '../../../../src/scripts/be5/core/changeDocument';
import {shallow, mount} from 'enzyme';


test('snapshot', () => {
  const component = renderer.create(
    <Document frontendParams={{documentName: "MainDocument"}}/>
  );

  expect(component.toJSON()).toMatchSnapshot();

  changeDocument('MainDocument', { value: "Page loaded." } );
  expect(component.toJSON()).toMatchSnapshot();
});

test('frontendParams init state, props', () => {
  const wrapper = mount( <Document frontendParams={{documentName: "test"}}/> );

  expect(wrapper.props()).toEqual({"frontendParams": {"documentName": "test"}});
  expect(wrapper.state()).toEqual({"value": ""});
});

test('frontendParams state', () => {
  const wrapper = mount( <Document frontendParams={{documentName: "test"}}/> );

  const onSuccess = function onSuccess(json, applyParams){};

  changeDocument("test", {value: "Text", frontendParams: {
    parentDocumentName: "parentDoc",
    onSuccess: onSuccess
  }});

  expect(wrapper.state()).toEqual({
    "component": undefined,
    "frontendParams": {"onSuccess": onSuccess, "parentDocumentName": "parentDoc"},
    "value": "Text"
  });

  changeDocument("test", {value: "Text"});

  expect(wrapper.state()).toEqual({
    "component": undefined,
    "frontendParams": {"onSuccess": undefined, "parentDocumentName": undefined},
    "value": "Text"
  });

});

