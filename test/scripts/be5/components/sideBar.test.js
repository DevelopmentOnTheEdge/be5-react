import React    from 'react';
import renderer from 'react-test-renderer';
import SideBar     from  '../../../../src/scripts/be5/components/SideBar';
import testUtils      from '../testUtils'

it('snapshot sideBar', () => {
  testUtils.mockBe5();

  const component = renderer.create(
    <SideBar />
  );

  expect(component.toJSON()).toMatchSnapshot();
});