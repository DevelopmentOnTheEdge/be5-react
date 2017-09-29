import React from 'react';
import Properties from '../../../../../src/scripts/be5/components/properties/properties';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';

it('contain property', () => {
	const bean = require('./testJson.json');

	const component = renderer.create(
    <Properties bean={bean} ids={[0,1]}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('not contain property', () => {
    const bean = require('./testJson.json');

    const component = renderer.create(
        <Properties bean={bean} ids={[1000000]}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


