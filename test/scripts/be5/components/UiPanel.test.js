import React from 'react';
import renderer from 'react-test-renderer';
import UiPanel from '../../../../src/scripts/be5/pages/UiPanel';
import '../../../../src/scripts/be5/be5init'


test('snapshot', () => {
  const tree = renderer.create(
    <UiPanel />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
