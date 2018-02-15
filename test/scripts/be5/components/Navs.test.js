import React          from 'react';
import renderer       from 'react-test-renderer';
import Navs     from '../../../../src/scripts/be5/components/Navs';


test('test', () => {
  const steps = [
    {title: "Companies", url: '#!companies'},
    {title: "EgissoDocs", url: '#!egissoDocs'},
  ];

  const component = renderer.create(
      <Navs steps={steps} tabs />
  );

  expect(component.toJSON()).toMatchSnapshot();
});
