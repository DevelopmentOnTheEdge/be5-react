import React from 'react';
import renderer from 'react-test-renderer';
import '../../../../src/scripts/be5/be5init'
import {TestProvider} from "../testUtils";
import {Document} from "../../../../src/scripts/be5/containers/Document";
import be5 from "../../../../src/scripts/be5/be5";


test('snapshot', () => {
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: "MainDocument"}}/>
    </TestProvider>
  );

  be5.url.process('MainDocument', "#!uiPanel" );
  expect(component.toJSON()).toMatchSnapshot();
});
