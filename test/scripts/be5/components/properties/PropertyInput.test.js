import React from 'react';
import PropertyInput from '../../../../../src/scripts/be5/components/properties/propertyInput';
import renderer from 'react-test-renderer';
/*
    contained values for input
*/

it('input', () => {
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

/*
  tests for select
*/

it('select', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/select"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();

    //check for null values
    bean.values.select = "";
    component = renderer.create(
        <PropertyInput path={"/select"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();

    //check for valid values
    bean.values.select = "watermelon";
    component = renderer.create(
        <PropertyInput path={"/select"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});

/*
  tests for multiSelect
*/

it('multiSelect', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/multiSelect"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});

/*
  tests for description
*/

it('Description', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/description"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});

/*
  tests for passwordField
*/

it('passwordField', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/pass"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});

/*
  tests for login
*/

it('property login', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/login"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});

it('property Boolean', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/agree"} bean={bean} onChange={handle} />
    );

    expect(component.toJSON()).toMatchSnapshot();
});

/*
  tests for lableField
*/

it('property labelField', () => {
    const bean = require('./testJson.json');

    const handle = jest.fn();

    let component = renderer.create(
        <PropertyInput path={"/label"} bean={bean} onChange={handle} />
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
