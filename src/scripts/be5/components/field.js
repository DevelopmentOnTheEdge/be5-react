import React from 'react';
import ReactDOM from 'react-dom';
import be5 from 'be5/be5';
import ReactSelect from 'react-select';
import DateField from 'be5/components/dateField';

be5.load.css('https://npmcdn.com/react-select/dist/react-select.css');

export default React.createClass({
  displayName: 'Field',

  getInitialState: function(){
    return {value: this.props.value.value, valueProps: this.props.value.value};
  },

  componentWillUpdate(){
    if(this.props.value.value != this.state.valueProps){
      this.setState({value: this.props.value.value, valueProps: this.props.value.value})
    }
  },

  propTypes: {
    value: React.PropTypes.shape({
      // The way to render this field.
      isReadOnly: React.PropTypes.bool,
      // Will be used in input id (props.value.name + 'Field').
      name: React.PropTypes.string.isRequired,
      // Type of the field.
      type: React.PropTypes.oneOf(['checkBox', 'comboBox', 'chooser', 'textArea', 'date', 'dateTime', 'textInput', 'passwordInput'])
    }),
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    labelClassName: React.PropTypes.string,
    controlClassName: React.PropTypes.string,
    // Wraps labels to <i> or <b> and uses pure HTML as captions.
    legacyStyling: React.PropTypes.bool
  },
  
  getDefaultProps() {
    return {
      value: {
        isReadOnly: false,
        type: 'textInput',
      },
      className: 'form-group',
      labelClassName: 'control-label',
      controlClassName: 'form-control',
      legacyStyling: false
    };
  },
  
  onFormDidMount() {
    if (this.refs.editableComboBox) {
      const value = ReactDOM.findDOMNode(this.refs.editableComboBox).value;
      this.props.onChange(this.props.value.name, value);
    }
  },
  
  _getValueFromEvent(event) {
    if(!event)
      return '';
    if(!event.target)
      return event.value;
    const element = event.target;
    return (element.type === 'checkbox') ? element.checked : element.value;
  },

  changeStateHandler(event) {
    this.setState({value: this._getValueFromEvent(event)})
  },

  keyPressHandler(event) {
    if (event.charCode == 13) {//Enter
      this.props.onChange(this.props.value.name, this._getValueFromEvent(event));
    }
  },

  changeHandler(event) {
    this.props.onChange(this.props.value.name, this._getValueFromEvent(event));
  },
  
  render() {
    const json = this.props.value;
    let value = this.props.value.value;
    if(this.props.value.type == 'checkBox' ){
      value = this.props.value.value === true || this.props.value.value === "true" || this.props.value.value === "on";
    }
    const id = json.name + "Field";
    const changeHandler = this.changeHandler;
    const _this = this;

    function createStatic(value) {
      return <p className="form-control-static" dangerouslySetInnerHTML={{__html: value}}></p>;
    }
    
    const controls = {
      checkBox: {
        normal: function() {
          return ( React.DOM.input({id: id, key: id, type: "checkbox", checked: value, onChange: changeHandler}));
        },
        readOnly: function() {
          return ( React.DOM.input({id: id, key: id, type: "checkbox", disabled: true, checked: value}) );
        }
      },
      chooser: {
        normal: () => {
          var getOptions = function(input, callback) {
            be5.net.request("document", 
              {
                entity: json.entityName,
                query: json.queryName,
                values: be5.net.paramString({selector: input})
              }, data => {
                const options = [];
                for(let row of data.value.rows) {
                  options.push({label : row.cells[1], value : row.cells[0]});
                }
                callback(null, {options: options});
              });
          };
          return (
            <ReactSelect.Async name={id} value={value} loadOptions={getOptions} onChange={changeHandler}/>
          );
        },
        readOnly: () => createStatic(value)
      },
      comboBox: {
        normal: () => {
          var options = json.options.map(function(option) {
            return ( React.DOM.option({key: option.value, value: option.value}, option.text) );
          });
          if(json.canBeNull){
            options.unshift(  ( React.DOM.option({key: "", value: ""}, be5.messages.All) ) );
          }
          return (
            React.DOM.select({id: id, ref: 'editableComboBox', key: id, defaultValue: value, onChange: changeHandler, className: this.props.controlClassName}, 
              options
            )
          );
        },
        readOnly: () => {
          const selectedOption = json.options.filter(option => option.value === json.value);
          const text = selectedOption.length ? selectedOption[0].text : json.value;
          return createStatic(text);
        }
      },
      textArea: {
        normal: () => (
          <textarea placeholder={json.tips.placeholder} id={id} key={id} rows={json.rows} cols={json.columns} value={value} onChange={changeHandler} className={this.props.controlClassName}/>
        ),
        readOnly: () => createStatic(value)
      },
      date: {
        normal: () => {
          return ( React.createElement(DateField, {id: id, key: id, value: value, parent: _this, onChange: changeHandler, time: false, className: this.props.controlClassName}) );
        },
        readOnly: () => createStatic(value)
      },
      dateTime: {
        normal: () => {
          return ( React.createElement(DateField, {id: id, key: id, value: value, parent: _this, onChange: changeHandler, time: true, className: this.props.controlClassName}) );
        },
        readOnly: () => createStatic(value)
      },
      textInput: {
        normal: () => (
          <input type="text" placeholder={json.tips.placeholder} id={id} key={id} value={this.state.value}
              onChange={this.changeStateHandler} onKeyPress={this.keyPressHandler} onBlur={changeHandler} className={this.props.controlClassName}/>
        ),
        readOnly: () => createStatic(value)
      },
      passwordInput: {
        normal: () => (
          <input type="password" placeholder={json.tips.placeholder} id={id} key={id} value={value} onChange={changeHandler} className={this.props.controlClassName}/>
        ),
        readOnly: () => createStatic('******')
      }
    };
    
    const renderer = controls[json.type] || controls['textInput'];
    const valueControl = renderer[json.isReadOnly ? 'readOnly' : 'normal']();
    const label = this.props.legacyStyling ? this._legacyStyledLabel(id, json) : <label htmlFor={id} className={this.props.labelClassName}>{json.title}</label>;
    const helpTextElement = json.tips.helpText ? <small className="text-muted">{json.tips.helpText}</small> : undefined;
    const hasDanger = !json.canBeNull && value === '' ? 'has-error' : '';
    
    return (
      <fieldset className={this.props.className + ' ' + hasDanger}> 
        {label} 
        {valueControl}
        {helpTextElement}
      </fieldset>
    );
  },
  
  _legacyStyledLabel(id, json) {
    const justLabel = (
      React.DOM.label({htmlFor: id, className: this.props.labelClassName, dangerouslySetInnerHTML: {__html: json.title}})
    );
    return this._wrapLabel(json, justLabel);
  },
  
  _wrapLabel(json, label) {
    if (json.isReadOnly) {
      return ( React.DOM.i(null, label) );
    } else if (!json.canBeNull) {
      return ( React.DOM.b(null, label) );
    } else {
      return label;
    }
  }
});
