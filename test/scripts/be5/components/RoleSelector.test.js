import React from 'react';
import renderer from 'react-test-renderer';
import RoleSelector from '../../../../src/scripts/be5/components/RoleSelector';
import {shallow, mount} from 'enzyme';


test('render', () => {
  const component = renderer.create(
    <RoleSelector availableRoles={["Administrator", "Manager"]} currentRoles={["Manager"]}
             toggleRoles={()=>{}} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test('calls', () => {
  const handle = jest.fn();

  // be5.net.request = function (path, attr, callback) {
  //   handle(path, attr, callback);
  //   callback({"availableRoles":["Administrator", "Manager", "Role1", "Role2"],"currentRoles":["Manager", "Role1"]})
  // };

  const wrapper = mount(
    <RoleSelector
      availableRoles={["Administrator", "Manager", "Role1", "Role2"]}
      currentRoles={["Manager", "Role1"]}
      toggleRoles={handle}
    />
  );

  expect(wrapper.find('input[type="checkbox"]').length).toEqual(4);
  expect(wrapper.find('#Administrator-checkbox').props().checked).toEqual(false);
  expect(wrapper.find('#Manager-checkbox').props().checked).toEqual(true);

  wrapper.find('#Administrator-checkbox').simulate('change');
  expect(handle.mock.calls[0]).toEqual(
    ["Manager,Role1,Administrator"]);

  wrapper.find('#Manager-checkbox').simulate('change');
  expect(handle.mock.calls[1]).toEqual(
    ["Role1"]);

  wrapper.find('.enable-all').at(1).simulate('click');
  expect(handle.mock.calls[2]).toEqual(
    ["Administrator,Manager,Role1,Role2"]);

  wrapper.find('.disable-all').at(1).simulate('click');
  expect(handle.mock.calls[3]).toEqual(
    [""]);

});
