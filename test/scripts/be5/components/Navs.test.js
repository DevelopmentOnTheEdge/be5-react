import React          from 'react';
import renderer       from 'react-test-renderer';
import Navs     from '../../../../src/scripts/be5/components/Navs';
import '../../../../src/scripts/be5/routes/text'
import {TestProvider}      from "../testUtils";


test('test', () => {
  const steps = [
    {title: "Companies", url: '#!text/A'},
    {title: "EgissoDocs", url: '#!text/B'},
  ];

  const component = renderer.create(
    <TestProvider>
      <Navs steps={steps} tabs />
    </TestProvider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});
