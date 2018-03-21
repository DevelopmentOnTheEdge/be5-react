import React          from 'react';
import renderer       from 'react-test-renderer';
import HelpInfo       from '../../../../src/scripts/be5/components/HelpInfo';
import {TestProvider}      from "../testUtils";
import '../../../../src/scripts/be5/actions/text'


test('snapshot', () => {
  const component = renderer.create(
    <TestProvider>
      <HelpInfo value="text/Test text"/>
    </TestProvider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
