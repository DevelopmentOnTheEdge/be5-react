import React from 'react';
import renderer from 'react-test-renderer';
import '../../../../src/scripts/be5/be5init'
import {TestProvider} from "../testUtils";
import {Document} from "../../../../src/scripts/be5/containers/Document";
import be5 from "../../../../src/scripts/be5/be5";
import {MAIN_DOCUMENT} from "../../../../src/scripts/be5/constants";


test('snapshot', () => {
  const component = renderer.create(
    <TestProvider>
      <Document frontendParams={{documentName: MAIN_DOCUMENT}}/>
    </TestProvider>
  );

  be5.url.process({documentName: MAIN_DOCUMENT}, "#!systemCard" );
  expect(component.toJSON()).toMatchSnapshot();
});
