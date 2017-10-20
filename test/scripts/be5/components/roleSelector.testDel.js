import React from 'react';
import renderer from 'react-test-renderer';
import RoleSelector from '../../../../src/scripts/be5/components/roleSelector.js';
import be5 from '../../../../src/scripts/be5/be5';
import {shallow} from 'enzyme';

it('snapshot role', () => {
    be5.net.request = function () {
      return {"availableRoles":["Guest", "Administrator"],"selectedRoles":["Guest"]}
    };

    const component = shallow(
        <RoleSelector />
    );
    // expect(component.toJSON()).toMatchSnapshot();
});
