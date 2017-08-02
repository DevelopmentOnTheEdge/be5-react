/*
 * depends on tables and forms dynamically using createDocument
 */
import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import $              from 'jquery';
import _              from 'underscore';
  
const FormTable = React.createClass({
  displayName: 'FormTable',
  
  render() {
    return (
      <div className="formTableSplitter">
        {be5.ui.createDocument('form', _.extend({}, this.props.form, { showCancel: false }))}
        {be5.ui.createDocument('table', this.props.table)}
      </div>
    );
  }
});

//be5.ui.registerDocumentType('formTable', value => {
//  return (
//    React.createElement(FormTable, value)
//  );
//});
//
export default FormTable;
