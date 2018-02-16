import React from 'react';
import renderer from 'react-test-renderer';
import RoleBox, {Role} from '../../../../src/scripts/be5/components/RoleSelector.js';
import be5 from '../../../../src/scripts/be5/be5';
import {shallow, mount} from 'enzyme';


test('render', () => {
    be5.net.request = function (path, attr, callback) {
      callback({"availableRoles":["Administrator", "Manager"],"selectedRoles":["Manager"]})
    };

    const component = renderer.create(
        <RoleBox />
    );
    expect(component.toJSON()).toMatchSnapshot();
});

test('calls', () => {
  const handle = jest.fn();

  be5.net.request = function (path, attr, callback) {
    handle(path, attr, callback);
    callback({"availableRoles":["Administrator", "Manager"],"selectedRoles":["Manager"]})
  };

  const wrapper = mount(
    <RoleBox />
  );
  expect(handle.mock.calls.length).toBe(1);
  expect(handle.mock.calls[0]).toEqual(["roleSelector", {}, expect.any(Function)]);

  expect(wrapper.find('input[type="checkbox"]').length).toEqual(2);
  expect(wrapper.find('#Administrator-checkbox').props().checked).toEqual(false);
  expect(wrapper.find('#Manager-checkbox').props().checked).toEqual(true);

  wrapper.find('input[type="checkbox"]').first().simulate('change');

  expect(handle.mock.calls[1]).toEqual(
    ["roleSelector/select", {"roles": "Manager,Administrator"}, expect.any(Function)]);

  wrapper.find('.enable-all').simulate('click');
  expect(handle.mock.calls[2]).toEqual(
    ["roleSelector/select", {"roles": "Administrator,Manager"}, expect.any(Function)]);

  wrapper.find('.disable-all').simulate('click');
  expect(handle.mock.calls[3]).toEqual(
    ["roleSelector/select", {"roles": ""}, expect.any(Function)]);

});
