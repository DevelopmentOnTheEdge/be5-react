import React from 'react';
import renderer from 'react-test-renderer';
import StaticPage from '../../../../src/scripts/be5/components/StaticPage';
import {createStaticValue} from "../../../../src/scripts/be5/utils/documentUtils";

test('snapshot', () => {
  const pageContent = createStaticValue("Test", 'test content', {self: "test"});

  const tree = renderer.create(
      <StaticPage value={pageContent} frontendParams={{documentName: "test"}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
