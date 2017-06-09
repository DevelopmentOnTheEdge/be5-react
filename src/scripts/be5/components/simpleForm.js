import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import Forms          from './be5/services/forms';
import Field          from './field';

export default React.createClass({
  propTypes: {
    entity: React.PropTypes.string.isRequired,
    query: React.PropTypes.string.isRequired,
    operation: React.PropTypes.string.isRequired
  },
  
  displayName: 'SimpleForm',
  
  getInitialState() {
    return { loading: true };
  },
  
  componentDidMount() {
    Forms.load(this.props, data => {
      if (data.type !== 'error') {
        this.setState({ loading: false, value: data.value, requiredFieldsFilled: true }, () => {
          this._onFieldChange();
        });
      }
    });
  },
  
  render() {
    if (this.state.loading) {
      return (
        <p className="card-text">{be5.messages.loading}</p>
      );
    }
    return (
      <form>
        {this._createFields()}
        {this._createOkAction()}
      </form>
    );
  },
  
  _createOkAction() {
    return (
      React.DOM.button({type: 'button', className: 'btn btn-primary', onClick: this._apply, disabled: !this.state.requiredFieldsFilled}, 'OK')
    );
  },
  
  _apply() {
    const value = this.state.value;
    const data = {
      entity: value.category,
      query: value.page, 
      operation: value.action,
      selectedRows: value.selectedRows,
      values: JSON.stringify(this._getFormValues())
    };
    be5.net.request('form/apply', data, changeDocument);
  },
  
  _createFields() {
    return this.state.value.fields.map(json => {
      return (
        React.createElement(Field, {
          value: json,
          ref: json.name,
          key: json.name,
          onChange: this._onFieldChange
        })
      );
    });
  },
  
  _onFieldChange() {
    this.setState({ requiredFieldsFilled: this._requiredFieldsFilled() });
  },
  
  _requiredFieldsFilled() {
    return this._getRequredValues().every(field => !!field.value);
  },
  
  _getFormValues() {
    return this._getRawFormValues().filter(field => field.value != null);
  },
  
  _getRawFormValues() {
    return this.state.value.fields.map(field => ({ name: field.name, value: this.refs[field.name].getValue(), required: !field.canBeNull }))
  },
  
  _getRequredValues() {
    return this._getRawFormValues().filter(field => field.required);
  }
});
