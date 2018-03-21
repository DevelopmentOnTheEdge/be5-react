import React          from 'react';
import renderer       from 'react-test-renderer';
import HelpInfo       from '../../../../src/scripts/be5/components/HelpInfo';
import '../../../../src/scripts/be5/actions/text'


test('snapshot', () => {
  const component = renderer.create(
    <HelpInfo value="text/Test text"/>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
