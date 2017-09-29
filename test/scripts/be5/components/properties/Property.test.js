import React from 'react';
import Property from '../../../../../src/scripts/be5/components/properties/property';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

const item = "/testName";
const itemName = item.substring(item.lastIndexOf("/")+1);
const itemValue = "testValue";

/*
    snapshot test
*/
it('simple property', () => {
	const itemMeta = {"displayName": "Simple property"};

	const component = renderer.create(
    <Property meta={itemMeta} name={itemName} value={itemValue} path={item}
    													  key={itemName} />
  );
  let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});

it('property Boolean', () => {
    const itemMeta = {"displayName":"Boolean"};
    const item = "/agree";


    let component = renderer.create(
        <Property path={item} meta={itemMeta} name={itemName} key={itemName} value={"true"}/>
    );

    expect(component.toJSON()).toMatchSnapshot();
});

/*
    shallow test
*/
it('call callback after click', () => {
	const itemMeta = {};

	const handle = jest.fn();

  const wrapper = shallow(
    <Property meta={itemMeta} name={itemName} value={itemValue} path={item}
        													  key={itemName} onChange={handle} />
  );

  wrapper.find('input').simulate('change', {target: {value: 'My new value'}});

  expect(handle.mock.calls.length).toBe(1);
  expect(handle.mock.calls[0]).toEqual(["/testName", "My new value"]);
  //TODO
  //expect(myMock.mock.calls[0]).toEqual(["/testName", true]);
});

it('call callback after set text', () => {
	const itemMeta = {};
	const itemValue = "testValue";

	const handle = jest.fn();

  const wrapper = shallow(
    <Property meta={itemMeta} name={itemName} value={itemValue} path={item}
        													  key={itemName} onChange={handle} />
  );

	wrapper.find('input').simulate('change', {target: {value: 'My new value'}});

  expect(handle.mock.calls.length).toBe(1);
  expect(handle.mock.calls[0]).toEqual(["/testName", "My new value"]);
});