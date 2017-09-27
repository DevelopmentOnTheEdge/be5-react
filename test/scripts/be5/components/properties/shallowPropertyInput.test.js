import React from 'react';
import PropertyInput from '../../../../../src/scripts/be5/components/properties/propertyInput';
import {shallow} from 'enzyme';

it('input', () => {
    const bean = require('./testJson.json');
    const handle = jest.fn();

    const wrapper = shallow(
        <PropertyInput path={"/textInput"} bean={bean} onChange={handle} />
    );

    wrapper.find('input').simulate('change', {target: {value: 'My new value'}});
    expect(handle.mock.calls[0]).toEqual(["/textInput", "My new value"]);

    wrapper.find('input').simulate('change', {target: {value: ''}});
    expect(handle.mock.calls[1]).toEqual(["/textInput", ""]);

    expect(handle.mock.calls.length).toBe(2);
});

// it('select', () => {
//     const bean = require('./testJson.json');
//     const handle = jest.fn();
//
//     const wrapper = shallow(
//         <PropertyInput path={"/select"} bean={bean} onChange={handle} />
//     );
//
//     wrapper.find('input').simulate('change', {target: {value: 'watermelon'}});
//     expect(handle.mock.calls[0]).toEqual(["/select", ""]);
//
//     expect(handle.mock.calls.length).toBe(1);
// });