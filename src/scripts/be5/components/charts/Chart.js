import React from 'react';
import PropTypes from 'prop-types';
import Plot from "react-plotly.js";
import {registerDocument} from "../../core/registers/documents";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [], layout: {}, frames: [], config: {}};
        this.storeChartState = this.storeChartState.bind(this);
    }

    componentDidMount() {
        this.storeChartState(this.props);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.value.meta._ts_ > this.props.value.meta._ts_) {
            this.storeChartState(this.props);
        }
        return true;
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
            const lineData = {
                x: xVals,
                y: values.map(array => array[idx]),
                type: 'scatter',
                name: columnTitles[idx],
                mode: 'lines',
                hoverlabel: {namelength: -1},
                // line: {color: getColor(idx) }
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