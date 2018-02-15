import React          from 'react';
import renderer       from 'react-test-renderer';
import Document       from '../../../../src/scripts/be5/components/Document';
import Form           from '../../../../src/scripts/be5/components/forms/Form';
import Table           from '../../../../src/scripts/be5/components/tables/Table';
import changeDocument from '../../../../src/scripts/be5/core/changeDocument';


test('text', () => {
    const component = renderer.create(
        <Document frontendParams={{documentName: "MainDocument"}}/>
    );

    expect(component.toJSON()).toMatchSnapshot();

    changeDocument('MainDocument', { value: "Page loaded." } );
    expect(component.toJSON()).toMatchSnapshot();
});

