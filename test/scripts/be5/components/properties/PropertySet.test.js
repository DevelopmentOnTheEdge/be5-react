import React from 'react';
import PropertySet from '../../../../../src/scripts/be5/components/properties/propertySet';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';

it('renders without crashing', () => {
	const testJson = require('./testJson.json');
	const handle = jest.fn();

	mount(<PropertySet bean={testJson} onChange={handle}/>);
});

it('renders without crashing readOnly', () => {
	const bean = require('./testJson.json');
	for(let item in bean.meta) {
    bean.meta[item]['readOnly'] = true;
	}

	const handle = jest.fn();

	mount(<PropertySet bean={bean} onChange={handle}/>);
});

it('simple property set', () => {
	const bean = {
		 "values": {
			 "number": "",
		 },
		 "meta": {
			 "/number": {},
		 },
		 "order": [
			 "/number",
		 ]
	};

	const component = renderer.create(
    <PropertySet bean={bean} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('empty property set', () => {
	const bean = {
		 "values": {},
		 "meta": {},
		 "order": []
	};

	const component = renderer.create(
    <PropertySet bean={bean} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
