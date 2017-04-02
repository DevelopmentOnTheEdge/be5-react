import React from 'react';
import ReactDOM from 'react-dom';
import be5 from 'be5/be5';

/**
 * Make no assumptions about the inner structure of the DOM element of this component.
 */
export default React.createClass({
  propTypes: {
    // An initial value. This date will be parsed with Date.parse().
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
    value: React.PropTypes.string.isRequired,
    // Specifies whether to show time.
    time: React.PropTypes.bool
  },
  
  getDefaultProps() {
    return {
      time: false
    }
  },
  
  displayName: 'DateField',
  
  getInitialState() {
    return {value: this.props.value};
  },
  
  componentDidMount() {
    this.mountDatePicker(ReactDOM.findDOMNode(this));
  },
  
  componentDidUpdate() {
    this.mountDatePicker(ReactDOM.findDOMNode(this));
  },
  
  onChange(dp, input) {
    this.setState({value: ReactDOM.findDOMNode(this).value});
    this.props.onChange({value: ReactDOM.findDOMNode(this).value});
  },
  
  onChangeManual(event) {
    this.setState({value: ReactDOM.findDOMNode(this).value});
  },
  
  validate() {
    var oldDateTime = new Date (Date.parse(this.props.value));
    var d = new Date(Date.parse(ReactDOM.findDOMNode(this).value));  
    var newDateTime = {
      y: d.getFullYear(),
      m: d.getMonth() + 1,
      d: d.getDate(),
      h: d.getHours(),
      i: d.getMinutes(),
      s: d.getSeconds()
    };
    if(oldDateTime.getHours() != newDateTime.h || oldDateTime.getMinutes() != newDateTime.i)
      newDateTime.s = 0;
   
    for (var key in newDateTime) {
      if(newDateTime[key] < 10)
        newDateTime[key] = '0' + newDateTime[key]
    };
  
    var newDate = newDateTime.y + '-' + newDateTime.m + '-' + newDateTime.d;
    var newTime = newDateTime.h + ':' + newDateTime.i + ':' + newDateTime.s;

    if(!this.props.time)
      ReactDOM.findDOMNode(this).value = newDate;
    else 
      ReactDOM.findDOMNode(this).value = newDate + ' ' + newTime;
    
    $(ReactDOM.findDOMNode(this)).datetimepicker("validate");
  },
  
  mountDatePicker(node) {
    System.amdRequire(["datetimepicker"], function() {
      be5.load.css('lib/datetimepicker/jquery.datetimepicker.css');
      if(!this.props.time) {
        $(node).datetimepicker({
          timepicker: false,
          lang: be5.locale.get(),
          format: 'Y-m-d',
          onChangeDateTime: this.onChange
        });
      } else {
        $(node).datetimepicker({
          lang: be5.locale.get(),
          format: 'Y-m-d H:i:s',
          onChangeDateTime: this.onChange
        });
      }
    }.bind(this));
  },
  
  render() {
    return React.DOM.input({type: "text", value: this.state.value, onChange: this.onChangeManual, onBlur: this.validate, className: this.props.className});
  }
});
