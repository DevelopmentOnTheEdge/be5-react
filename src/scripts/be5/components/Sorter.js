import React from 'react';
import cx from 'classnames';

export default React.createClass({
  displayName: 'Sorter',
  
  propTypes: {
    /**
     * An array of columns with name and title.
     */
    columns: React.PropTypes.array.isRequired,
    
    /**
     * A callback to call when the user clicks a sorting button.
     */
    onSelect: React.PropTypes.func.isRequired,
    
    /**
     * A name of the soring column, or undefined.
     */
    sortingColumnName: React.PropTypes.string,
    
    /**
     * A way to sort, or undefined.
     */
    sortingOrder: React.PropTypes.oneOf(['asc', 'desc'])
  },
  
  render() {
    if (this.props.columns.length === 0) {
      return <div/>;
    }
    
    return (
      <form className="form-inline">
        <div className="form-group">
          <label>Sort by</label>{' '}
          <div className="btn-group btn-group-sm" role="group" aria-label="Sorting">
            {this.props.columns.map(this._renderColumn)}
          </div>
        </div>
      </form>
    );
  },
  
  _renderColumn(column) {
    const selected = this.props.sortingColumnName === column.name;
    const klass = cx({
      'btn': true,
      'btn-primary': selected,
      'btn-secondary': !selected
    });
    const asc = this.props.sortingOrder === 'asc';
    const iconClass = cx({
      'fa': true,
      'fa-sort': !selected,
      'fa-sort-asc': selected && asc,
      'fa-sort-desc': selected && !asc
    });
    return (
      <button type="button" className={klass} onClick={this._onSelect.bind(this, column)}>
        {column.title}{' '}<span className={iconClass}></span>
      </button>
    );
  },
  
  _onSelect(column) {
    this.props.onSelect(column);
  }
});
