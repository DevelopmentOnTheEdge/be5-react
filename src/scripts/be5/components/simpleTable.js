import React from 'react';
import be5 from '../be5';
import Tables from '../services/tables';

export default React.createClass({
  propTypes: {
    entity: React.PropTypes.string.isRequired,
    query: React.PropTypes.string.isRequired,
    responsive: React.PropTypes.bool,
    showHead: React.PropTypes.bool
  },
  
  displayName: 'SimpleTable',
  
  getInitialState() {
    return { loading: true };
  },
  
  componentDidMount() {
    Tables.load(this.props, data => {
      if (data.type !== 'error') {
        this.setState({ loading: false, value: data.value });
      }
    });
  },
  
  render() {
    if (this.state.loading) {
      return (
        <p className="card-text">{be5.messages.loading}</p>
      );
    }
    const klass = this.props.responsive ? 'table table-responsive' : 'table';
    const tds = cells => {
      var key = 0;
      return cells.map(cell => <td key={key++}>{cell}</td>)
    };
    const trs = rows => {
      var key = 0;
      return rows.map(row => <tr key={key++}>{tds(row.cells)}</tr>);
    };
    const head = this.props.showHead ? this._getHead() : undefined;
    return (
      <table className={klass}>
        {head}
        <tbody>{trs(this.state.value.rows)}</tbody>
      </table>
    );
  },
  
  _getHead() {
    const ths = columns => {
      var key = 0;
      return columns.map(column => <th key={key++}>{column}</th>);
    };
    return (
      <thead>
        <tr>
          {ths(this.state.value.columns)}
        </tr>
      </thead>
    );
  }
});
