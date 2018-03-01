import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../../src/scripts/be5/components/Document';
import changeDocument from '../../../../src/scripts/be5/core/changeDocument';


test('snapshot', () => {
  const component = renderer.create(
    <Document frontendParams={{documentName: "MainDocument"}}/>
  );

  expect(component.toJSON()).toMatchSnapshot();

  changeDocument('MainDocument', { value: "Page loaded." } );
  expect(component.toJSON()).toMatchSnapshot();
});
