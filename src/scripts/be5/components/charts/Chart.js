import React from 'react';
import PropTypes from 'prop-types';
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-basic-dist-min";
import {registerDocument} from "../../core/registers/documents";

const Plot = createPlotlyComponent(Plotly);

/**
 *  The plotlyjs library is used for ploting charts
 *
 * @see https://plotly.com/javascript/ for detailed
 *
 * CreatePlotlyComponent and plotly.js-basic-dist-min are used because plotly.js library is too big.
 * @see https://github.com/plotly/plotly.js/tree/master/dist about plotly dist
 **/
class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], layout: {}, frames: [], config: {}};
        this.storeChartState = this.storeChartState.bind(this);
    }

    componentDidMount() {
        this.storeChartState(this.props);
    }

    storeChartState(props) {
        const {xData, yData} = props.value.data.attributes.layout;
        if (!xData || !yData) {
            return
        }
        const {columns, rows, page} = props.value.data.attributes;
        const columnNames = columns.map(column => column.name);
        const columnTitles = columns.map(column => column.title);
        const xIdx = columnNames.indexOf(xData);
        if (xIdx === -1) {
            return;
        }

        const yIdxs = yData.split(",")
            .filter(column => columnNames.includes(column))
            .map(column => columnNames.indexOf(column));

        if (yIdxs.length === 0) {
            return;
        }

        const values = rows.map(row => {
            return row.cells.map(cell => cell.content);
        });


        const xVals = values.map(array => array[xIdx]);

        const data = [];
        yIdxs.forEach(idx => {
            let lineData = {
                x: xVals,
                y: values.map(array => array[idx]),
                type: 'scatter',
                name: columnTitles[idx],
                mode: 'lines',
                hoverlabel: {namelength: -1},
                line: {
                    shape: 'spline',
                    width: '2',
                    smoothing: 1.3,
                }
            }
            if (rows && rows.length > 0 && rows[0].cells.length - 1 >= idx && rows[0].cells[idx].options.chart) {
                //copy column attributes
                const chartAttr = rows[0].cells[idx].options.chart;
                for (const [key, value] of Object.entries(chartAttr)) {
                    if (value.startsWith('{') && value.endsWith('}')) {
                        let tmpValue = value.substring(1, value.length - 1);
                        const obj = {}
                        tmpValue.split(';').forEach(array => {
                            const entry = array.split(":");
                            if (entry.length === 2) {
                                obj[entry[0]] = entry[1];
                            }
                        })
                        chartAttr[key] = obj;
                    }
                }
                lineData = Object.assign({}, lineData, chartAttr)
            }
            data.push(lineData);
        })
        const layout = {
            title: page,
            xaxis: {title: columnTitles[xIdx]},
            // yaxis: {title: "", rangemode: 'tozero'},
            width: 1050,
            height: 675,
            showlegend: true
        }
        this.setState((state) => {
            return {data: data, layout: layout}
        });
    }

    render() {
        return (
            <Plot
                data={this.state.data}
                layout={this.state.layout}
                frames={this.state.frames}
                config={this.state.config}
                onInitialized={(figure) => this.setState(figure)}
                onUpdate={(figure) => this.setState(figure)}
            />
        );
    }
}

Chart.propTypes = {
    value: PropTypes.object.isRequired
}

registerDocument("chart", Chart);

export default Chart