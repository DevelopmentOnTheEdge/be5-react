import React    from 'react';
import renderer from 'react-test-renderer';
import SideBar     from  '../../../../src/scripts/be5/components/SideBar';
import '../mockBe5Request'

it('snapshot sideBar', () => {

  const component = renderer.create(
    <SideBar />
  );

  expect(component.toJSON()).toMatchSnapshot();
});