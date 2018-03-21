import React          from 'react';
import renderer       from 'react-test-renderer';
import Navs     from '../../../../src/scripts/be5/components/Navs';
import '../../../../src/scripts/be5/actions/text'
import testUtils      from "../testUtils";
import { Provider }   from 'react-redux'

test('test', () => {
  const steps = [
    {title: "Companies", url: '#!text/A'},
    {title: "EgissoDocs", url: '#!text/B'},
  ];

  const component = renderer.create(
    <Provider store={testUtils.getStore()}>
      <Navs steps={steps} tabs />
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
