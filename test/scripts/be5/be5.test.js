var $ = require('jquery');
window.jQuery = $;
global.jQuery = $;

window.$ = $;
global.$ = $;

import React from 'react';
import renderer from 'react-test-renderer';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import {shallow, mount, render} from 'enzyme';

import initialize     from '../../../src/scripts/be5/core/initialize';
import changeDocument from '../../../src/scripts/be5/core/changeDocument';
import App            from '../../../src/scripts/be5/components/application';
import SplitPane            from '../../../src/scripts/be5/components/splitPane';
import SideBar            from '../../../src/scripts/be5/components/sideBar';
import Document            from '../../../src/scripts/be5/components/document';


test('test initialize', () => {
    initialize('app', App);
});

test('test mount', () => {
    mount(<App />);
});

test('test app', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<App />);

    const result = renderer.getRenderOutput();
    expect(result.props.children).toEqual([
        <SideBar ref="sideBar"/>,
        <Document ref="document"/>
    ]);
});

test('snapshot', () => {
    const component = renderer.create(
        <App />
    );
    expect(component.toJSON()).toMatchSnapshot();
    changeDocument({ type: 'static', value: "test" });
    expect(component.toJSON()).toMatchSnapshot();

});