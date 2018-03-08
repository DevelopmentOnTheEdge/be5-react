import React          from 'react';
import renderer       from 'react-test-renderer';
import ErrorPane      from '../../../../src/scripts/be5/components/ErrorPane';
import testData       from '../testData.json'


test('snapshot', () => {
  const component = renderer.create(
    <ErrorPane value={testData.jsonApiError} frontendParams={{documentName: 'test'}}/>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
