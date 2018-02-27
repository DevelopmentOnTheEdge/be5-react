import React          from 'react';
import renderer       from 'react-test-renderer';
import Form           from '../../../../../src/scripts/be5/components/forms/Form';
import ModalForm           from '../../../../../src/scripts/be5/components/forms/ModalForm';
import SubmitOnChangeForm           from '../../../../../src/scripts/be5/components/forms/SubmitOnChangeForm';
import testData       from '../../testData.json'

test('Form', () => {
  const component = renderer.create(
    <Form value={testData.simpleForm} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('ModalForm', () => {
  const component = renderer.create(
    <ModalForm value={testData.simpleForm} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});

test('SubmitOnChangeForm', () => {
  const component = renderer.create(
    <SubmitOnChangeForm value={testData.simpleForm} frontendParams={{documentName: 'test'}} />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
