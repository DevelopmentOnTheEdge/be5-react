import React from 'react';
import PropertyInput from '../../../../../src/scripts/be5/components/properties/propertyInput';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';

it('property input', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/textInput"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();

    bean.values.textInput = "";

    component = renderer.create(
        <PropertyInput path={"/textInput"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});

