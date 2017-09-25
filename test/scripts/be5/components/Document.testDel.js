import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../../src/scripts/be5/components/document';
import changeDocument from '../../../../src/scripts/be5/core/changeDocument';
import {HtmlResult}   from '../../../../src/scripts/be5/components/forms/form';

test('snapshot', () => {
    const component = renderer.create(
        <Document />
    );

    changeDocument('MainDocument', { component: 'text', value: "Page loaded." } );

    expect(component.toJSON()).toMatchSnapshot();
});

test('component', () => {
    const component = renderer.create(
        <Document />
    );
    expect(component.toJSON()).toMatchSnapshot();
    changeDocument('MainDocument', { component: HtmlResult, value: "Page <b>text<b>." });
    expect(component.toJSON()).toMatchSnapshot();
});
