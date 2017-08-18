import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import classNames           from 'classnames';
import Datetime             from 'react-datetime';
import moment               from 'moment';
import Select, { Creatable }from 'react-select';
import VirtualizedSelect    from 'react-virtualized-select'


class Property extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMulti = this.handleChangeMulti.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.path, this._getValueFromEvent(event));
  }

  handleChangeMulti(event) {
    let selectArray = [];
    Object.keys(event).forEach(function (key) {
      selectArray.push(event[key].value);
    });
    this.props.onChange(this.props.path, selectArray);
  }

  _getValueFromEvent(event) {
    if(!event)
      return '';
    if(event._d)
    {
      return this.formatDate(event._d);
    }
    if(!event.target)
      return event.value;
    const element = event.target;
    return (element.type === 'checkbox') ? element.checked : element.value;
  }

  getExtraAttrsMap(extraAttrs){
    let map = {}
    if(extraAttrs === undefined)return map;
    for (let i=0 ;i< extraAttrs.length; i++){
      map[extraAttrs[i][0]] = extraAttrs[i][1];
    }
    return map;
  }

  render() {
    const meta  = this.props.meta;
    const value = this.props.value;
    const id    = this.props.name + "Field";
    const handle = meta.multipleSelectionList ? this.handleChangeMulti : this.handleChange;
    const extraAttrsMap = this.getExtraAttrsMap(meta.extraAttrs);

    const controls = {
      Boolean: () => (
        <input type="checkbox" id={id} key={id} value={value} checked={value} onChange={handle}
                 className={this.props.controlClassName || 'form-check-input'} disabled={meta.readOnly} />
      ),
      select: () => {
        const options = this.optionsToArray(meta.tagList);
        // VirtualizedSelect css подправить (на длинных строках с переносами)
        const selectProps = {
          ref: id, name: id, value: value, options: options, onChange: handle,
          clearAllText: this.props.localization.clearAllText,
          clearValueText: this.props.localization.clearValueText,
          noResultsText: this.props.localization.noResultsText,
          searchPromptText: this.props.localization.searchPromptText,
          loadingPlaceholder: this.props.localization.loadingPlaceholder,
          placeholder: meta.placeholder || this.props.localization.placeholder,
          backspaceRemoves: false,
          disabled: meta.readOnly,
          multi: meta.multipleSelectionList,
          matchPos: "start"
        };

        if(extraAttrsMap.inputType === "Creatable"){
          return <Creatable {...selectProps} />
        }

        if(extraAttrsMap.inputType === "VirtualizedSelect"){
          return <VirtualizedSelect {...selectProps} clearable searchable labelKey="label" valueKey="value" />
        }
        return <Select {...selectProps} />
      },
      Date: () => {
          return <Datetime dateFormat="DD.MM.YYYY" value={moment(value)} onChange={handle} id={id} key={id}
                           timeFormat={false} closeOnSelect={true} closeOnTab={true} locale={this.props.localization.locale || "en"}
                           inputProps={ {disabled: meta.readOnly} } />
      },
//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: this.props.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },
      textArea: () => {
          return <textarea placeholder={meta.placeholder} id={id}  rows={meta.rows || 3} cols={meta.columns} value={value}
                    onChange={handle} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      textInput: () => {
          return <input type="text" placeholder={meta.placeholder} id={id} key={id} value={value}
                    onChange={handle} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      passwordField: () => {
          return <input type="password" placeholder={meta.placeholder} id={id} key={id} value={value}
                       onChange={handle} className={this.props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      labelField: () => {
          if(meta.rawValue){
            return (<div dangerouslySetInnerHTML={{__html: value}} ></div>)
          }else{
            return (<div className="form-group">{value}</div>)
          }
      },
    };

    let valueControl;
    if(meta.tagList)
    {
      valueControl = controls['select']();
    }
    else if(meta.passwordField)
    {
      valueControl = controls['passwordField']();
    }
    else if(meta.labelField)
    {
      valueControl = controls['labelField']();
    }
    else
    {
      valueControl = (controls[meta.type] || controls['textInput'])();
    }

    const label = <label htmlFor={id} className={this.props.labelClassName || 'form-control-label'}>{meta.displayName || id}</label>;
    const messageElement = meta.message ? <span className={this.props.messageClassName || "form-control-feedback"}>{meta.message}</span> : undefined;

    const hasStatusClasses = classNames(
      {'has-danger' : meta.status === 'error'},
      {'has-warning' : meta.status === 'warning'},
      {'has-success' : meta.status === 'success'},
    );
    const classNameForm = (meta.type === "Boolean")
          ? this.props.classNameFormCheck || 'form-check property'
          : this.props.classNameFormGroup || 'form-group property';
    const cssClasses = meta.cssClasses || 'col-xs-12';

    const classes = classNames(
      classNameForm,
      cssClasses,
      hasStatusClasses,
      {'required' : !meta.canBeNull && !meta.readOnly},
      {'display-none' : meta.hidden}
    );

    if(meta.type === "Boolean")
    {
      return (
        <div className={classes}>
          <label className="form-check-label">
            {valueControl} {' ' + meta.displayName || id}
          </label>
        </div>
      );
    }else if(meta.labelField){
       return (
         <div className={classNames(meta.cssClasses || 'col-xs-12', hasStatusClasses)}>{valueControl}</div>
       );
    }else{
      return (
        <div className={classes}>
          {label}
          <div className="controls">
            {valueControl}
            {messageElement}
          </div>
        </div>
      );
    }
  }

  optionsToArray(options){
    let optionObject = [];
    for(let i =0 ;i < options.length; i++){
      optionObject.push({ value: options[i][0], label: options[i][1] });
    }
    return optionObject;
  }

//  createStatic(value) {
//    return <p className="form-control-static" dangerouslySetInnerHTML={{__html: value}} />;
//  }

  //ISO 8601 format
  formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + '-' + this.format2digit(month) + '-' + this.format2digit(day);
  }

  format2digit(number){
    return ("0" + number).slice(-2);
  }
}

Property.defaultProps = {
  localization: {
    locale: 'en',
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
    noResultsText: 'No results found',
    searchPromptText: 'Type to search',
    placeholder: 'Select ...',
    loadingPlaceholder: 'Loading...'
  },
};

Property.propTypes = {
  localization: PropTypes.object
};

export default Property;
