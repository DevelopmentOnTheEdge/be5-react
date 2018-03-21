import React    from 'react';
import renderer from 'react-test-renderer';
import {TestProvider}      from "../testUtils";
import SideBar     from  '../../../../src/scripts/be5/components/SideBar';
import '../mockBe5Request'

it('snapshot sideBar', () => {

  const component = renderer.create(
    <TestProvider>
      <SideBar />
    </TestProvider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});