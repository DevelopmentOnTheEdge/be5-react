import React                from 'react';
import be5                  from 'be5';
import changeDocument       from 'be5/changeDocument';
import bus                  from 'be5/bus';
import DateField            from 'components/dateField';
import Field                from 'components/field';
import Forms                from 'services/forms';
import registerDocumentType from 'be5/registerDocumentType';
import _                    from 'underscore';

be5.load.css('css/form.css');

const performOperationFrontendAction = ({ value: value }) => {
  switch (value.type)
  {
  case 'RENDER_HTML':
    changeDocument({ type: 'htmlResult', value: { content: value.value } });
    return;
  case 'REDIRECT':
    be5.url.set(value.value);
    return;
  case 'REFRESH_ALL':
    be5.url.set("");
    bus.fire('LoggedIn');
    return;
  case 'GO_BACK':
    if (window.history.length >= 2) {
      window.history.back();
      return;
    }
    // TODO redirect to the query instead of showing this message:
    changeDocument({ type: 'htmlResult', value: { content: 'The action was successful' } });
    return;
  case 'DEFAULT_ACTION':
  default:
    changeDocument({ type: 'htmlResult', value: { content: 'The action was successful' } });
    return;
  }
};

const Form = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired
  },
  
  displayName: 'Form',
  
  getInitialState() {
    return _.extend({}, this.props.value, { allFieldsFilled: false });
  },

  componentDidMount() {
    for (var key in this.refs) {
      if(this.refs[key].onFormDidMount)
        this.refs[key].onFormDidMount();
    }
  },

//  componentDidMount() {
//    for (var key in this.refs) {
//      if(this.refs[key].onFormDidMount)
//        this.refs[key].onFormDidMount();
//
//      if(this.refs[key].childNodes){
//        for (var key2 in this.refs[key].childNodes) {
//          if(this.refs[key].childNodes[key2].onFormDidMount)
//            this.refs[key].childNodes[key2].onFormDidMount();
//        }
//      }
//    }
//  },
  
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.value);
  },
  
  getFormValues() {
    return this._getRawFormValues().filter(field => field.value != null);
  },
  
  refresh() {
    this._reload(this._getAllParameters());
  },
  
  _reloadOnChange(controlName) {
    this._reload(this._getAllParameters().concat([{ name: '_reloadcontrol_', value: controlName }]));
  },
  
  _getAllParameters() {
    var params = Object.assign({}, this.props.value.parameters);
    var formVals = this.getFormValues();
    for (let formVal of formVals) {
      delete params[formVal.name];
    }
    for (let paramName in params) {
      formVals.push({ name: paramName, value: this.state.parameters[paramName] });
    }
    return formVals;
  },
  
  _reload(values) {
    Forms.load(
      {
        entity: this.state.entity,
        query: this.state.query,
        operation: this.state.operation,
        values: JSON.stringify(values),
        selectedRows: this.state.selectedRows
      },
      data => {
        this.setState(data.value, this.forceUpdate);
      });
  },

  apply() {
    if (this.props.value.customAction) {
      const values = _.object(_.map(this._getRawFormValues(), m => [ m.name, m.value ]));
      const structuredAction = be5.url.parse(this.props.value.customAction);
      be5.url.set(be5.url.form(structuredAction.positional, _.extend({}, structuredAction.named, values)));
      return;
    }
    
    const data = {
      entity: this.state.entity,
      query: this.state.query,
      operation: this.state.operation,
      selectedRows: this.state.selectedRows,
      values: JSON.stringify(this._getAllParameters())
    };
    if (this.props.isEmbedded !== true) {
      be5.net.request('form/apply', data, performOperationFrontendAction);
    } else {
      be5.net.request('form/apply', data);
    }
  },
  
  cancel() {
    be5.url.set(be5.url.create('table', [this.state.entity, this.state.query], this.state.parameters));
  },
  
  _applyOnSubmit(e) {
    // Hitting <enter> in any textbox in Chrome triggers the form submit,
    // even when there is no submit button.
    // That's why I explicitly define the cancellation.
    e.preventDefault();
    this.apply();
  },
  
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div className="row">
          <div className="col-md-12 col-lg-8 offset-lg-2">
            <form className="formBox" onSubmit={this._applyOnSubmit}>
              {this._createFields()}
              {this._createFormActions()}
            </form>
          </div>
        </div>
      </div>
    );
  },
  
  _getRawFormValues() {
    return this.state.fields.map(field => ({ name: field.name, value: field.value, required: !field.canBeNull }))
  },
  
  _getRequredValues() {
    return this._getRawFormValues().filter(field => field.required);
  },
  
  _onFieldChange(name, value) {
    const field = this.state.fields.find(field => field.name === name);
    field.value = value;
    
    // implicit state change => forceUpdate
    this.forceUpdate(() => {
      this.setState({ allFieldsFilled: this._allFieldsFilled() });
      
      if (field.reloadOnChange || field.autoRefresh) {
        this._reloadOnChange(name);
      }
    });
  },

  _createGroup(curGroup, curGroupId, curGroupName) {
    return (
      <div className='formGroup' ref={curGroupId}>
        <h3>{curGroupName}</h3>
        {curGroup}
      </div>
    );
  },
  
  _createFields() {
    let curGroup = [];
    let curGroupName = null, curGroupId = null;
    let result = [];

    const finishGroup = () => {
      if(curGroup.length > 0) {
        if(curGroupId) {
          result.push(this._createGroup(curGroup, curGroupId, curGroupName));
        } else {
          Array.prototype.push.apply(result, curGroup);
        }
      }
      curGroup = [];
    };
    //TODO не заполняется value у comboBox при открытии формы первой страницей - при обновлении страницы например
    for(const json of this.state.fields) {
      const newGroup = json.group;
      const newGroupName = newGroup ? newGroup.name : null;
      const newGroupId = newGroup ? newGroup.id : null;
      if(newGroupId != curGroupId) {
        finishGroup();
        curGroupName = newGroupName;
        curGroupId = newGroupId;
      }
      const field = (<Field value={json} ref={json.name} key={json.name} onChange={this._onFieldChange}/>);
      curGroup.push(field);
    }
    finishGroup();
    return result;
  },
  
  _createFormActions() {
    if (this.state.hideActions === true) {
      return null;
    }
    return (
      <div className="formActions">
        {this._createOkAction()}
        {' '}
        {this._createCancelAction()}
      </div>
    );
  },
  
  _createOkAction() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.apply} disabled={!this.state.allFieldsFilled}>
        {be5.messages.OK}
      </button>
    );
  },
  
  _createCancelAction() {
    if (!this.props.value.showCancel) {
      return null;
    }
    
    return (
      <button type="button" className="btn btn-secondary" onClick={() => history.back()}>
        {be5.messages.cancel}
      </button>
    );
  },
  
  _allFieldsFilled() {
    return this._getRequredValues().every(field => field.value !== '' );
  }
});

const HtmlResult = React.createClass({
  
  displayName: 'HtmlResult',
  
  propTypes: {
    content: React.PropTypes.string.isRequired
  },
  
  render() {
    const back = () => { history.back(); };
    const content = $('<div/>').html(this.props.content);
    be5.ui.convertLinks(content);
    
    return (
      <div>
        <div className="content" dangerouslySetInnerHTML={{__html: content.html()}}/>
        <div className="linkBack">
          <button className="btn btn-secondary btn-sm" onClick={back}>
            {be5.messages.back}
          </button>
        </div>
      </div>
    );
  }
  
});

const defaultProps = { showCancel: true };

// TODO define Form's properties explicitly
be5.ui.registerDocumentType('form', value => ( <Form value={_.extend({}, defaultProps, value)} key="form"/> ));
registerDocumentType('htmlResult', HtmlResult);

be5.registerAction('form', function(entity, query, operation, operationParams) {
  const selectedRows = (operationParams === undefined || operationParams.selectedRows === undefined)
  			? be5.tableState.selectedRows.join() : operationParams.selectedRows;
  if(operationParams !== undefined && operationParams.selectedRows !== undefined){
    delete operationParams.selectedRows;  	
  }  
  const params = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    values: be5.net.paramString(operationParams),
    selectedRows: selectedRows
  };
  Forms.load(params, document => {
    if (document.type === 'form') {
      changeDocument(document);
    } else {
      performOperationFrontendAction(document);
    }
  });
});

export default Form;

