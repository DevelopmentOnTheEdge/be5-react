import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../../src/scripts/be5/components/document';
import changeDocument from '../../../../src/scripts/be5/core/changeDocument';
import StaticPage     from '../../../../src/scripts/be5/components/staticPage';
import be5            from '../../../../src/scripts/be5/be5';

test('text', () => {
    const component = renderer.create(
        <Document />
    );

    expect(component.toJSON()).toMatchSnapshot();

    changeDocument('MainDocument', { component: 'text', value: "Page loaded." } );
    expect(component.toJSON()).toMatchSnapshot();
});

test('StaticPage', () => {
    const component = renderer.create(
        <Document />
    );

    changeDocument('MainDocument', { component: StaticPage,
            value: StaticPage.createValue("Test", 'test content')});
    expect(component.toJSON()).toMatchSnapshot();
});
