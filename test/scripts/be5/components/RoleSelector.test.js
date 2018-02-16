import React from 'react';
import renderer from 'react-test-renderer';
import RoleBox, {Role} from '../../../../src/scripts/be5/components/RoleSelector.js';
import be5 from '../../../../src/scripts/be5/be5';
import {shallow, mount} from 'enzyme';


test('render', () => {
    be5.net.request = function (path, attr, callback) {
      callback({"availableRoles":["Guest", "Administrator"],"selectedRoles":["Guest"]})
    };

    const component = renderer.create(
        <RoleBox />
    );
    expect(component.toJSON()).toMatchSnapshot();
});

//it('calls', () => {
//    const handle = be5.net.request = jest.fn();
//
//    const wrapper = mount(
//        <RoleBox />
//    );
//    //wrapper.find(Role).last().simulate('click')
//    expect(wrapper.find('.roleBox').length).toEqual(1);
//    expect(wrapper.find('input').length).toEqual(1);
//    //wrapper.find('#Administrator-checkbox').simulate('click');
//
//    expect(handle.mock.calls.length).toBe(1);
////    expect(handle.mock.calls[0]).toEqual(["/testName", "My new value"]);
//
//});
