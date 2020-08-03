import React from 'react';
import renderer from 'react-test-renderer';
import '../../../../../src/scripts/be5/be5init.js'
import Chart from "../../../../../src/scripts/be5/components/charts/Chart";
import testData from "../../testData.json";
import {TestProvider} from "../../testUtils";

test('snapshot', () => {
    const component = renderer.create(
        <TestProvider>
            <Chart value={testData.chart} frontendParams={{documentName: 'test'}}/>
        </TestProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
});
