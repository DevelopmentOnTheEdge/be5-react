import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import testUtils      from "../testUtils";
import { Provider }   from 'react-redux';
import bus            from '../../../../src/scripts/be5/core/bus';
import ApplicationWithBe5Menu            from '../../../../src/scripts/be5/components/test/ApplicationWithBe5Menu';
import Be5Menu            from '../../../../src/scripts/be5/components/be5Menu/Be5Menu';
import Be5MenuItem        from '../../../../src/scripts/be5/components/be5Menu/Be5MenuItem';
import '../mockBe5Request'


test('Be5Menu', () => {

  const component = renderer.create(
    <Provider store={testUtils.getStore()}>
      <Be5Menu show={true}/>
    </Provider>
  );

  bus.fire("RefreshAll");

  expect(component.toJSON()).toMatchSnapshot();


  // changeDocument('MainDocument', { component: StaticPage, value: "test" });
  // expect(component.toJSON()).toMatchSnapshot();

});

test('Be5MenuItem', () => {

  const component = renderer.create(
    <Provider store={testUtils.getStore()}>
     <Be5MenuItem entity="testtable" view="Test 1D"/>
    </Provider>
  );

  bus.fire("RefreshAll");

  expect(component.toJSON()).toMatchSnapshot();


  // changeDocument('MainDocument', { component: StaticPage, value: "test" });
  // expect(component.toJSON()).toMatchSnapshot();

});

test('ApplicationWithBe5Menu', () => {

  const component = renderer.create(
    <Provider store={testUtils.getStore()}>
      <ApplicationWithBe5Menu />
    </Provider>
  );

  bus.fire("RefreshAll");

  expect(component.toJSON()).toMatchSnapshot();


  // changeDocument('MainDocument', { component: StaticPage, value: "test" });
  // expect(component.toJSON()).toMatchSnapshot();

});
