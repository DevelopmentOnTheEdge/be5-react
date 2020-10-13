import React from 'react';
import renderer from 'react-test-renderer';
import '../../../../../src/scripts/be5/be5init.js'
import Chart from "../../../../../src/scripts/be5/components/charts/Chart";
import testData from "../../testData.json";
import {OperationBox} from "../../../../../src/scripts/be5";

test('snapshot', () => {
    const component = renderer.create(
            <OperationBox operations={testData.orderedOperations.included[0]} frontendParams={{documentName: 'test'}}/>

    );

    expect(component.toJSON()).toMatchSnapshot();
});
