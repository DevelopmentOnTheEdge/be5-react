import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import classNames           from 'classnames';
import Datetime             from 'react-datetime';
import moment               from 'moment';
import Select               from 'react-select';
import VirtualizedSelect    from 'react-virtualized-select'
import JsonPointer          from 'json-pointer';


class PropertyInput extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMulti = this.handleChangeMulti.bind(this);
  }

  static get(path, bean, localization){
    const itemName = path.substring(path.lastIndexOf("/")+1);
    const itemMeta = bean.meta[path];
    const itemValue = JsonPointer.get(bean, "/values" + path);
    return {
      meta: itemMeta,
      name: itemName,
      value: itemValue,
      path: path,
      key: itemName + "Property",
      ref: itemName + "Property",
      localization: localization
    }
  }

  handleChange(event) {
    let path;
    if(this.props.path){
      path = this.props.path;
    }else{
      path = this.props.bean.order[this.props.id];
    }
    this.props.onChange(path, this._getValueFromEvent(event));
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

  render() {
    let attr;
    if(this.props.path){
      attr = PropertyInput.get(this.props.path, this.props.bean, this.props.localization)
    }else{
      attr = PropertyInput.get(this.props.bean.order[this.props.id], this.props.bean, this.props.localization)
    }
    const meta  = attr.meta;
    const value = attr.value;
    const id    = attr.name + "Field";
    const handle = meta.multipleSelectionList ? this.handleChangeMulti : this.handleChange;

    const controls = {
      Boolean: () => (
        <input type="checkbox" id={id} key={id} value={value} checked={value} onChange={handle}
                 className={attr.controlClassName || 'form-check-input'} disabled={meta.readOnly} />
      ),
      select: () => {
        const options = this.optionsToArray(meta.tagList);
        //if(options.length > 100){
          return <VirtualizedSelect ref={id} name={id} value={value} options={options}
                          disabled={meta.readOnly} onChange={handle}
                          multi={meta.multipleSelectionList} matchPos="start"
                          clearable
                          searchable
                          labelKey="label"
                          valueKey="value"
                          clearAllText={attr.localization.clearAllText}
                          clearValueText={attr.localization.clearValueText}
                          noResultsText={attr.localization.noResultsText}
                          searchPromptText={attr.localization.searchPromptText}
                          placeholder={attr.localization.placeholder}
                          loadingPlaceholder={attr.localization.loadingPlaceholder}
          />
//        }else{
//          return <Select ref={id} name={id} value={value} options={options}
//                          disabled={meta.readOnly} onChange={handle} placeholder={meta.placeholder}
//                          multi={meta.multipleSelectionList} matchPos="start"
//                          clearAllText={attr.localization.clearAllText}
//                          clearValueText={attr.localization.clearValueText}
//                          noResultsText={attr.localization.noResultsText}
//                          searchPromptText={attr.localization.searchPromptText}
//                          placeholder={attr.localization.placeholder}
//                          loadingPlaceholder={attr.localization.loadingPlaceholder}
//          />
//        }
      },
      Date: () => {
          return <Datetime dateFormat="DD.MM.YYYY" value={moment(value)} onChange={handle} id={id} key={id}
                           timeFormat={false} closeOnSelect={true} closeOnTab={true} locale={attr.localization.locale || "en"}
                           inputProps={ {disabled: meta.readOnly} } />
      },
//      dateTime: {
//        normal: () => {
//          return ( React.createElement(Datetime, {id: id, key: id, value: value, parent: _this, onChange: handleChange, time: true, className: attr.controlClassName}) );
//        },
//        readOnly: () => this.createStatic(value)
//      },
      textArea: () => {
          return <textarea placeholder={meta.placeholder} id={id}  rows={meta.rows || 3} cols={meta.columns} value={value}
                    onChange={handle} className={attr.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      textInput: () => {
          return <input type="text" placeholder={meta.placeholder} id={id} key={id} value={value}
                    onChange={handle} className={attr.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      passwordField: () => {
          return <input type="password" placeholder={meta.placeholder} id={id} key={id} value={value}
                       onChange={handle} className={attr.controlClassName || "form-control"} disabled={meta.readOnly} />
      },
      labelField: () => {
          if(meta.rawValue){
            return (<div dangerouslySetInnerHTML={{__html: value}} ></div>)
          }else{
            return (<div>{value}</div>)
          }
      },
    };

    //let valueControl;
    if(meta.tagList)
    {
      return controls['select']();
    }
    else if(meta.passwordField)
    {
      return controls['passwordField']();
    }
    else if(meta.labelField)
    {
      return controls['labelField']();
    }
    else
    {
      return (controls[meta.type] || controls['textInput'])();
    }
    //return ({valueControl})
//    return (
//      <ValueControl {...Properties.get(attr.bean, path, attr.localization)}
//                    onChange={attr.onChange} />
//    );

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

PropertyInput.defaultProps = {
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

PropertyInput.propTypes = {
  bean: PropTypes.object.isRequired,
  path: PropTypes.string,
  id: PropTypes.number,
  onChange: PropTypes.func,
  localization: PropTypes.object,
};

export default PropertyInput;
