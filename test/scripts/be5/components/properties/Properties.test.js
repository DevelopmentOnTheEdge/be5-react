import React from 'react';
import Properties from '../../../../../src/scripts/be5/components/properties/properties';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';

it('renders without crashing', () => {
	const testJson = require('./testJson.json');
	const handle = jest.fn();

	mount(<Properties bean={testJson} onChange={handle}/>);
});

it('renders without crashing readOnly', () => {
	const bean = require('./testJson.json');
	for(let item in bean.meta) {
    bean.meta[item]['readOnly'] = true;
	}

	const handle = jest.fn();

	mount(<Properties bean={bean} onChange={handle}/>);
});

it('empty properties', () => {
	const bean = {
        "values": {},
        "meta": {},
        "order": []
	};
	const ids = [];

	const component = renderer.create(
    <Properties bean={bean} ids={ids}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('empty properties', () => {
    const bean = {
        "values": {},
        "meta": {},
        "order": []
    };
    const ids = [];

    const component = renderer.create(
        <Properties bean={bean} ids={ids}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


