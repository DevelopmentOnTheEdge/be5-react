import './mockBe5Request'
import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../src/scripts/be5/containers/Document';
import '../../../src/scripts/be5/index';
import '../../../src/scripts/be5/be5styles';
import be5init from '../../../src/scripts/be5/be5init';
import testUtils from "./testUtils";

test('test load', () => {
  be5init.init();
});

test('hashChange', () => {
  const component = renderer.create(
    <Document frontendParams={{documentName: "MainDocument"}} store={testUtils.getStore()} />
  );
  be5init.hashChange();
});