import React from 'react';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import bus            from '../../../../src/scripts/be5/core/bus';
import ApplicationWithBe5Menu            from '../../../../src/scripts/be5/components/test/ApplicationWithBe5Menu';
import Be5Menu            from '../../../../src/scripts/be5/components/be5Menu/Be5Menu';
import Be5MenuItem        from '../../../../src/scripts/be5/components/be5Menu/Be5MenuItem';
import '../mockBe5Request'


test('Be5Menu', () => {

  const component = renderer.create(
    <Be5Menu show={true}/>
  );

  bus.fire("LoggedIn");

  expect(component.toJSON()).toMatchSnapshot();


  // changeDocument('MainDocument', { component: StaticPage, value: "test" });
  // expect(component.toJSON()).toMatchSnapshot();

});

test('Be5MenuItem', () => {

  const component = renderer.create(
     <Be5MenuItem entity="testtable" view="Test 1D"/>
  );

  bus.fire("LoggedIn");

  expect(component.toJSON()).toMatchSnapshot();


  // changeDocument('MainDocument', { component: StaticPage, value: "test" });
  // expect(component.toJSON()).toMatchSnapshot();

});

test('ApplicationWithBe5Menu', () => {

  const component = renderer.create(
    <ApplicationWithBe5Menu />
  );

  bus.fire("LoggedIn");

  expect(component.toJSON()).toMatchSnapshot();


  // changeDocument('MainDocument', { component: StaticPage, value: "test" });
  // expect(component.toJSON()).toMatchSnapshot();

});
