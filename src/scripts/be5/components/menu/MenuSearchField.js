import React from 'react';
import PropTypes from 'prop-types';
import be5 from '../../be5';


class MenuSearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    return (
      <input type="text" className="searchField form-control" onChange={this._handleChange} value={this.state.value}
             placeholder={this.props.placeholder ? this.props.placeholder : be5.messages.filter}/>
    );
  }

  _handleChange(event) {
    this.setState({value: event.target.value});
    this.props.onChange(event.target.value);
  }
}

MenuSearchField.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default MenuSearchField;
