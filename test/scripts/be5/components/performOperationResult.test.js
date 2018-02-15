import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../../src/scripts/be5/components/Document';
import be5            from '../../../../src/scripts/be5/be5';
import formService    from '../../../../src/scripts/be5/services/Forms';

test('performOperationResult finished', () => {
  const component = renderer.create(
    <Document frontendParams={{documentName: "test"}}/>
  );
  //const mockFunc = jest.fn();
  const res = {
    data: {
      type: "operationResult",
      attributes: {"status":"finished"}
    },
    links: {"self":"form/categories/Doc categories/Edit"},
    meta: {"_ts_":"1503244989281"}
  };

  formService._performOperationResult(res, {documentName: "test"});

  expect(component.toJSON()).toMatchSnapshot();
  //expect(mockFunc.mock.calls.length).toBe(1);
});

test('performOperationResult redirect', () => {
  //const mockFunc = jest.fn();
  be5.url.process = jest.fn();

  const res = {
    "data":{
      "type":"operationResult",
      "attributes":{"details":"static/welcome.be","status":"redirect"}
    },
    "links":{"self":"form/categories/Doc categories/Edit"},
    "meta":{"_ts_":"1503244989281"}
  };
  formService._performOperationResult(res, {documentName: "test"});

  expect(be5.url.process.mock.calls.length).toBe(1);
  //expect(mockFunc.mock.calls.length).toBe(1);
});

test('performOperationResult redirect main', () => {
  //const mockFunc = jest.fn();
  be5.url.set = jest.fn();

  const res = {
    "data":{
      "type":"operationResult",
      "attributes":{"details":"static/welcome.be","status":"redirect"}
    },
    "links":{"self":"form/categories/Doc categories/Edit"},
    "meta":{"_ts_":"1503244989281"}
  };
  formService._performOperationResult(res, {documentName: be5.mainDocumentName});

  expect(be5.url.set.mock.calls.length).toBe(1);
  //expect(mockFunc.mock.calls.length).toBe(1);
});
