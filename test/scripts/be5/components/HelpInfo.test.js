import React          from 'react';
import renderer       from 'react-test-renderer';
import HelpInfo       from '../../../../src/scripts/be5/components/HelpInfo';
import testUtils      from "../testUtils";
import { Provider }   from 'react-redux';
import '../../../../src/scripts/be5/actions/text'


test('snapshot', () => {
  const component = renderer.create(
    <Provider store={testUtils.getStore()}>
      <HelpInfo value="text/Test text"/>
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
