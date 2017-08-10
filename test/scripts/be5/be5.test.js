var $ = require('jquery');
window.jQuery = $;
global.jQuery = $;

window.$ = $;
global.$ = $;

import React from 'react';
import renderer from 'react-test-renderer';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import {shallow, mount, render} from 'enzyme';

import changeDocument from '../../../src/scripts/be5/core/changeDocument';
import App            from '../../../src/scripts/be5/components/application';
import SplitPane            from '../../../src/scripts/be5/components/splitPane';
import SideBar            from '../../../src/scripts/be5/components/sideBar';
import Document            from '../../../src/scripts/be5/components/document';
import StaticPage            from '../../../src/scripts/be5/components/staticPage';
import ActionFrom            from '../../../src/scripts/be5/actions/form';

test('test mount', () => {
    mount(<App />);
});

test('test app', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<App />);

    const result = renderer.getRenderOutput();
    // expect(result.props.children.children).toEqual([
    //     <SideBar ref="sideBar"/>,
    //     <Document ref="document"/>
    // ]);

    // expect(result.props.children).toEqual([
    //     <AlertContainer ref={a => this.msg = a} {...alertOptions } />,
    //     <SplitPane split="vertical" defaultSize={280} />
    // ]);
});

test('snapshot', () => {
    const component = renderer.create(
        <App />
    );
    expect(component.toJSON()).toMatchSnapshot();
    changeDocument('MainDocument', { component: StaticPage, value: "test" });
    expect(component.toJSON()).toMatchSnapshot();

});