import React from 'react';
import PropTypes from 'prop-types';
import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from "plotly.js-dist-min";
import {registerDocument} from "../../core/registers/documents";

const Plot = createPlotlyComponent(Plotly);

/**
 *  The plotlyjs library is used for ploting charts
 *
 * @see https://plotly.com/javascript/ for detailed
 *
 * CreatePlotlyComponent and plotly.js-dist-min are used because plotly.js library is too big.
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
        const data = [];
        const {columns, rows, page} = props.value.data.attributes;

        if (rows && rows.length > 0)
        {
            const values = rows.map(row => {
                return row.cells.map(cell => cell.content);
            });
            const columnTitles = columns.map(column => column.title);
            const columnNames = columns.map(column => column.name);
            
            rows[0].cells.forEach( cell =>
                {
                    if (cell.options.chart)
                    {
                        let traceData = {};
                        
                        const xIdx = rows[0].cells.indexOf(cell);
                        const type = cell.options.chart.type;                     

                        switch (type) {
                            case 'scatter':
                            case 'bar':
                            {
                                const yIdx = columnNames.indexOf(cell.options.chart.y);
                                
                                if (xIdx === -1 || yIdx === -1) 
                                    return;

                                delete cell.options.chart.y;

                                const xVals = values.map(array => array[xIdx]);
                                const yVals = values.map(array => array[yIdx]);

                                traceData = Object.assign(traceData, {
                                    x: xVals,
                                    y: yVals,
                                    type: type,
                                    name: columnTitles[yIdx],
                                    mode: 'lines+markers',
                                    line: {
                                        shape: 'spline',
                                        width: '2',
                                        smoothing: 1.3,
                                    }
                                });
                                break;
                            }
                            case 'box':
                            case 'histogram':
                            {
                                if (xIdx === -1) 
                                    return;


                                const orientation = cell.options.chart.rotate;

                                if (orientation == null || orientation === "false")
                                {
                                    traceData = Object.assign(traceData, {
                                        x: values.map(array => array[xIdx])
                                    });
                                }
                                else if (orientation === "true")
                                {
                                    traceData = Object.assign(traceData, {
                                        y: values.map(array => array[xIdx])
                                    });
                                }

                                traceData = Object.assign(traceData, {
                                    type: type,
                                    name: columnTitles[xIdx],
                                    opacity: 0.75, 
                                    marker: {
                                         line: { 
                                          width: 1
                                         }
                                    }
                                });

                                break;
                            }                             
                            case 'pie':
                            {
                                const yIdx = columnNames.indexOf(cell.options.chart.labels);
                                
                                delete cell.options.chart.labels;
                                if (xIdx === -1 || yIdx === -1) 
                                    return;

                                traceData = Object.assign(traceData, {
                                    labels: values.map(array => array[yIdx]),
                                    values: values.map(array => array[xIdx]),
                                    type: type,
                                    name: columnTitles[yIdx],
                                    hoverinfo: 'label+value',
                                    textinfo:'label+percent',
                                    textposition: 'inside',
                                });
                                break;
                            }                               
                            default:
                                console.error("Chart type " + type + " is not implemented!");
                        }

                        //copy column attributes
                        const chartAttr = cell.options.chart;
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

                        traceData = Object.assign(traceData, chartAttr);
                        data.push(traceData);
                    }
                }
            );
        }      
        
        let layout = {
            title: page,
            // xaxis: {title: columnTitles[xIdx]},
            // yaxis: {title: "", rangemode: 'tozero'},
            width: 1050,
            height: 675,
            showlegend: true
        }

        const chartLayout = props.value.data.attributes.layout.chartLayout;
        if (chartLayout)       
            layout = Object.assign(layout, chartLayout)
        

        
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