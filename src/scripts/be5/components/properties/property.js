import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import classNames           from 'classnames';
import Datetime             from 'react-datetime';
import moment               from 'moment';
import Select, { Creatable }from 'react-select';
import VirtualizedSelect    from 'react-virtualized-select'
import NumericInput         from 'react-numeric-input';
import CKEditor             from 'react-ckeditor-component';
import MaskedInput          from 'react-maskedinput';


class Property extends Component {

  constructor(props) {
    super(props);

    this.onDateChange = this.onDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMulti = this.handleChangeMulti.bind(this);
    this.numericHandleChange = this.numericHandleChange.bind(this);
  }

  handleChange(event) {
    //console.log(this.props.path, Property._getValueFromEvent(event));
    this.props.onChange(this.props.path, Property._getValueFromEvent(event));
  }

  handleChangeMulti(event) {
    let selectArray = [];
    Object.keys(event).forEach(function (key) {
      selectArray.push(event[key].value);
    });
    this.props.onChange(this.props.path, selectArray);
  }

  numericHandleChange(valueAsNumber, valueAsString, input){
    this.props.onChange(this.props.path, valueAsNumber);
  }

  static _getValueFromEvent(event) {
    if(!event)
      return '';
    if(event._d)
    {
      console.log(Property.formatDate(event._d));
      return Property.formatDate(event._d);
    }
    if(!event.target)
      return event.value;
    const element = event.target;
    return (element.type === 'checkbox') ? element.checked : element.value;
  }

  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onDateChange(date){
    //console.log(date);
    if(typeof date === "string"){
      if(date.match('(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d')){
        //console.log("str 10: " + date);
        this.handleChange(date);
      }
    }else{
      this.handleChange(date)
    }
  }

  //todo error date status
  // onDateChange(date){
  //   //console.log(date);
  //   if(typeof date === "string"){
  //     if(date.match('(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d')){
  //       //console.log("str 10: " + date);
  //       this.handleChange(date);
  //       this.setState({status: 'none'});
  //     }else{
  //       this.handleChange(date);
  //       this.setState({status: 'error'});
  //     }
  //   }else{
  //     this.handleChange(date);
  //     this.setState({status: 'none'});
  //   }
  // }

  static getExtraAttrsMap(extraAttrs){
    let map = {};
    if(extraAttrs === undefined)return map;
    for (let i=0 ;i< extraAttrs.length; i++){
      map[extraAttrs[i][0]] = extraAttrs[i][1];
    }
    return map;
  }

  render() {
    const meta  = this.props.meta;
    const id    = this.props.name + "Field";

    let valueControl = Property.getControl(this.props, this.handleChange, this.handleChangeMulti, this.numericHandleChange, this.onDateChange);

    const label = <label htmlFor={id} className={this.props.labelClassName || 'form-control-label'}>{meta.displayName || id}</label>;
    const messageElement = meta.message ? <span className={this.props.messageClassName || "form-control-feedback"}>{meta.message}</span> : undefined;

    let hasStatusClasses = classNames(
      {'has-danger' : meta.status === 'error'},
      {'has-warning' : meta.status === 'warning'},
      {'has-success' : meta.status === 'success'},
    );
    if(this.state && this.state.status === 'error'){
      hasStatusClasses = 'has-danger';
    }
    const classNameForm = (meta.type === "Boolean")
      ? this.props.classNameFormCheck || 'form-check property'
      : this.props.classNameFormGroup || 'form-group property';
    const cssClasses = meta.cssClasses || 'col-lg-12';

    const classes = classNames(
      classNameForm,
      cssClasses,
      hasStatusClasses,
      {'required' : !meta.canBeNull},
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
        <div className={classNames('form-group property property-label', meta.cssClasses || 'col-lg-12', hasStatusClasses)}>{valueControl}</div>
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

  static getControl(props, handleChange, handleChangeMulti, numericHandleChange, onDateChange){
    const meta  = props.meta;
    const value = props.value;
    const id    = props.name + "Field";
    const handle = meta.multipleSelectionList ? handleChangeMulti : handleChange;
    const extraAttrsMap = Property.getExtraAttrsMap(meta.extraAttrs);

    const controls = {
      Boolean: () => (
        <input type="checkbox" id={id} key={id} checked={value === true || value === "true"} onChange={handle}
               className={props.controlClassName || 'form-check-input'} disabled={meta.readOnly} />
      ),
      select: () => {
        const options = Property.optionsToArray(meta.tagList);
        // VirtualizedSelect css подправить (на длинных строках с переносами)
        let strValue;
        if(Array.isArray(value)){
          strValue = [];
          for (let i = 0; i < value.length; i++)strValue.push("" + value[i]);
        }
        else
        {
          strValue = "" + value;
        }
        const selectProps = {
          ref: id, name: id, value: strValue, options: options, onChange: handle,
          clearAllText: props.localization.clearAllText,
          clearValueText: props.localization.clearValueText,
          noResultsText: props.localization.noResultsText,
          searchPromptText: props.localization.searchPromptText,
          loadingPlaceholder: props.localization.loadingPlaceholder,
          placeholder: meta.placeholder || props.localization.placeholder,
          backspaceRemoves: false,
          disabled: meta.readOnly,
          multi: meta.multipleSelectionList,
          matchPos: extraAttrsMap.matchPos || "any"
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
        return <Datetime dateFormat="DD.MM.YYYY" value={moment(value === undefined ? "" : value)}
                         onChange={(v) => onDateChange(v)} id={id} key={id}
                         timeFormat={false} closeOnSelect={true} closeOnTab={true} locale={props.localization.locale || "en"}
                         inputProps={ {disabled: meta.readOnly} } />
      },
//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: props.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },


      textArea: () => {
        return <textarea placeholder={meta.placeholder} id={id}  rows={meta.rows || 3} cols={meta.columns} value={value === undefined ? "" : value}
                         onChange={handle} className={props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      maskTest: () => {
        return <MaskedInput mask={Property.getMaskInput(meta.validationRules)} onChange={handle} className={props.controlClassName || "form-control"} />
      },
      textInput: () => {
        return <input type="text" placeholder={meta.placeholder} id={id} key={id} value={value === undefined ? "" : value}
                      onChange={handle} className={props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      numberInput: () => {
        const numericProps = Property.getNumericProps(meta);
        return <NumericInput {...numericProps} placeholder={meta.placeholder} id={id} key={id} value={value}
                             onChange={numericHandleChange} style={ false }
                             className={props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      passwordField: () => {
        return <input type="password" placeholder={meta.placeholder} id={id} key={id} value={value === undefined ? "" : value}
                      onChange={handle} className={props.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      file: () => {
        return <input type="file" placeholder={meta.placeholder} id={id} key={id}
                      className={props.controlClassName || "form-control"} disabled={meta.readOnly}
                      multiple={meta.multipleSelectionList}
                      onChange={(e) => {
                        if(e.target.files && e.target.files.length === 1) {
                          const fileName = e.target.files[0].name;
                          Property.getBase64(e.target.files[0]).then(data => {
                            handle({value: {type: "Base64File", name: fileName, data: data}})
                          });
                        }
                      }
                      } />
      },

      WYSIWYG: () => {
        return <CKEditor activeClass="p10" content={value}
                         events={{
                           "change": (evt) => { handle({value: evt.editor.getData()}) }
                         }}
                         config={{language: 'ru',}}
        />
      },
      labelField: () => {
        if(meta.rawValue)
        {
          return (<div dangerouslySetInnerHTML={{__html: value}} />)
        }
        else
        {
          return (<label className="form-control-label">{value}</label>)
        }
      },
    };

    if(meta.tagList)
    {
      return controls['select']();
    }

    if(meta.passwordField)
    {
      return  controls['passwordField']();
    }

    if(meta.labelField)
    {
      return  controls['labelField']();
    }

    if(meta.validationRules !== undefined && Property.isNumberInput(meta.validationRules))
    {
      return controls['numberInput']()
    }

    if(controls[meta.type] !== undefined)
    {
      return controls[meta.type]();
    }

    if(extraAttrsMap.inputType === 'WYSIWYG')
    {
      return controls['WYSIWYG']();
    }

    if(extraAttrsMap.inputType === 'textArea')
    {
      return controls['textArea']();
    }

    if(extraAttrsMap.inputType === 'file')
    {
      return controls['file']();
    }

    if(meta.validationRules !== undefined && Property.getMaskInput(meta.validationRules))
    {
      return controls['maskTest']();
    }

    return controls['textInput']();
  }

  static getNumericProps(meta)
  {
    let props = {};
    props['maxLength'] = 14;//errors if more
    const rules = meta.validationRules;
    for (let i =0 ; i< rules.length; i++)
    {
      if(rules[i].type === "baseRule" && (rules[i].attr === "number"))
      {
        props['precision'] = 10;
      }
      if(rules[i].type === "baseRule" && (rules[i].attr === "integer"))
      {
        props['min'] = -2147483648;
        props['max'] = 2147483647;
        props['maxLength'] = 10;
      }
      // if(rules[i].type === "digits")
      // {
      //   props['min'] = 0;//todo not work
      // }
    }
    if(meta.columnSize){
      props['maxLength'] = parseInt(meta.columnSize);
    }
    return props;
  }

  static getMaskInput(rules)
  {
    for (let i = 0; i < rules.length; i++)
    {
      if ("mask" in rules[i]) {
        return rules[i].mask
      }
    }
    return null;
  }

  static isNumberInput(rules)
  {
    for (let i =0 ; i< rules.length; i++)
    {
      if(rules[i].type === "baseRule" &&
        ( rules[i].attr === "digits" || rules[i].attr === "integer" || rules[i].attr === "number" ))return true;
    }
    return false;
  }

  static optionsToArray(options){
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
  static formatDate(date){
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + '-' + Property.format2digit(month) + '-' + Property.format2digit(day);
  }

  static format2digit(number){
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
