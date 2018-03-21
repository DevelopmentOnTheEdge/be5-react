import React    from 'react';
import renderer from 'react-test-renderer';
import testUtils      from "../testUtils";
import { Provider }   from 'react-redux';
import SideBar     from  '../../../../src/scripts/be5/components/SideBar';
import '../mockBe5Request'

it('snapshot sideBar', () => {

  const component = renderer.create(
    <Provider store={testUtils.getStore()}>
      <SideBar />
    </Provider>
  );

  expect(component.toJSON()).toMatchSnapshot();
});