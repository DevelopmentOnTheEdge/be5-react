import React from 'react';
import be5 from '../be5';
import changeDocument from '../core/changeDocument';

var TableForm = React.createClass({
  displayName: 'TableForm',
  
  onSelectionChange() {
    this.props.value.callbacks.onSelectionChange(be5.tableState.selectedRows);
  },
  
  render() {
    var callbacks = {
      onSelectionChange: function(selection) {
        var action = 'Edit';
        var temp = {
          category: this.props.value.category,
          page: this.props.value.page,
          action: action,
          selectedRows: selection,
          hideActions: true,
          isEmbedded: true
        };
        if (selection.length == 0) {
          temp.title = 'Empty Selection';
          temp.fields = [];
          this.refs.form.replaceState(temp);
        } else if (selection.length > 1) {
          temp.title = 'Multiple Selection';
          temp.fields = [];
          this.refs.form.replaceState(temp);
        } else {
          var category = this.props.value.category;
          var page = this.props.value.page;
          var data = { entity: category, query: page, operation: action, selectedRows: selection.join() };
          var that = this;
          be5.net.request('form', data, function(data) {
            data.value.showCancel = false;
            that.refs.form.replaceState(data.value);
          });
        }
      }.bind(this)
    };
    this.props.value.callbacks = callbacks;
    return (
      React.DOM.div({className: "tableFormSplitter"}, 
         be5.ui.createDocument('table', this.props.value), 
         be5.ui.createDocument('form', { title: 'Empty Selection', fields: [], showCancel: false }) 
      )
    );
  }
});

//be5.registerAction('tableForm', function(entity, query, params) {
//  if(query === undefined)
//    query = 'All records';
//  if(params === undefined)
//    params = {};
//  var fullParams = { category: entity, page: query };
//  $.extend(fullParams, params);
//  be5.net.request('document', fullParams, function(value) {
//      value.type = 'tableForm';
//      changeDocument(value);
//  });
//});
//
//be5.ui.registerDocumentType('tableForm', function(value) {
//  return ( React.createElement(TableForm, {ref: "tableForm", value: value}) );
//});

export default TableForm;
