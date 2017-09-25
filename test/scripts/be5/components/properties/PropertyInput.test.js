import React from 'react';
import PropertyInput from '../../../../../src/scripts/be5/components/properties/propertyInput';
import renderer from 'react-test-renderer';

it('property input', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/textInput"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();

    bean.values.textInput = "";

    component = renderer.create(
        <PropertyInput path={"/textInput"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});

it('property select', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/select"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});

//to do: не работает, выдает непонятную ошибку
// it('property data', () => {
//     const bean = require('./testJson.json');
//
//     const handle = jest.fn();
//
//     let component = renderer.create(
//         <PropertyInput path={"/date"} bean={bean} onChange={handle} />
//     );
//
//     expect(component.toJSON()).toMatchSnapshot();
// });
