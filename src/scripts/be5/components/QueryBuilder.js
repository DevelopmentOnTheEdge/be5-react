import React from 'react';
import be5 from '../be5';
import Document from '../containers/Document';
import SplitPane from 'react-split-pane';
import ErrorPane from "./ErrorPane";
import {registerDocument} from "../core/registers/documents";
import {getModelByID} from "../utils/documentUtils";

import {CONTEXT_PARAMS, TIMESTAMP_PARAM} from "../constants";
import BeSqlMode, {tableNamesCompleter, upperCaseKeyWordCompleter} from "../utils/BeSqlMode";

let AceEditor;
try {
  require('brace/mode/sql');
  require('brace/theme/xcode');
  require('brace/ext/language_tools');
  AceEditor = require("react-ace").default;
} catch (e) {
  console.log('AceEditor (brace) is not available, use textarea')
}

class QueryBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sql: this.props.value.data.attributes.sql,
      value: this.props.value
    };

    this.updateCode = this.updateCode.bind(this);
    this.submit = this.submit.bind(this);
    this.setSqlFromHistory = this.setSqlFromHistory.bind(this);
  }

  componentDidMount() {
    this.initBeSqlMode();
    this.update(this.props.value);
  }

  initBeSqlMode() {
    if (AceEditor !== undefined) {
      const beSqlMode = new BeSqlMode();
      this.refs.aceEditor.editor.getSession().setMode(beSqlMode);
      const langTools = window.ace.acequire('ace/ext/language_tools');
      langTools.addCompleter(upperCaseKeyWordCompleter);
      langTools.addCompleter(tableNamesCompleter);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.update(nextProps.value);
  }

  updateCode(newSql) {
    this.setState({sql: newSql});
  }

  submit() {
    const requestParams = {
      sql: this.state.sql,
      updateWithoutBeSql: this.state.updateWithoutBeSql,
      [CONTEXT_PARAMS]: this.props.value.params,
      [TIMESTAMP_PARAM]: new Date().getTime()
    };

    be5.net.request('queryBuilder', requestParams, json => {
      this.update(json);
    });
  }

  update(json) {
    this.setState({value: json});
  }

  setSqlFromHistory(event) {
    this.setState({sql: event.target.value});
  }

  render() {
    const {
      value,
      sql
    } = this.state;

    return (
      <div className="queryBuilder">
        <div className="row">
          <div className="col-md-6">
            <h1>Query Builder</h1>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="updateWithoutBeSql"
                onChange={() => {
                  this.setState({updateWithoutBeSql: !this.state.updateWithoutBeSql});
                }}
                checked={this.state.updateWithoutBeSql === true}/>
              <label className="form-check-label" htmlFor="updateWithoutBeSql">raw sql</label>
            </div>
          </div>
          <div className="col-md-6">
            <select
              multiple={true}
              style={{width: '100%'}}
              onClick={this.setSqlFromHistory}
            >
              {value.data.attributes.history.slice().reverse().map((value, i) => (
                <option value={value} key={i}>{value}</option>
              ))}
            </select>
            <br/>
            <br/>
          </div>
        </div>
        <SplitPane split="horizontal" defaultSize={300}>
          {this.getEditor(sql)}
          <div>
            <button
              className="btn btn-primary btn-sm mt-2 mb-2"
              onClick={this.submit}
              title='Alt-Enter - submit, Ctrl + space - auto completion'
            >
              Submit
            </button>
            <QueryBuilderOutput
              value={value}
              finalSql={this.state.value.data.attributes.finalSql}
            />
          </div>
        </SplitPane>

      </div>
    );
  }

  getEditor(sql) {
    if (AceEditor === undefined) {
      return <textarea
        rows={10}
        onChange={(e) => this.updateCode(e.target.value)}
        value={sql}
        style={{width: '100%'}}
      />;
    }

    return <AceEditor
      ref="aceEditor"
      value={sql}
      mode="sql"
      theme="xcode"
      fontSize={13}
      onChange={this.updateCode}
      name="queryBuilder_editor"
      width='100%'
      height='100%'
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      editorProps={{
        $blockScrolling: Infinity,
      }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2
      }}
      commands={[{
        name: 'Submit',
        bindKey: {win: 'Alt-Enter', mac: 'Command-Enter'},
        exec: this.submit
      }]}
    />;
  }
}

class QueryBuilderOutput extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.value.meta._ts_ > this.props.value.meta._ts_;
  }

  render() {
    const {value} = this.props;
    return <div>
      <Document
        value={getModelByID(value.included, value.meta, "result")}
        frontendParams={{documentName: "queryBuilder-result"}}
      />
      <div>{value.data.attributes.finalSql}</div>
      <br/>
      <ErrorPane value={value}/>
    </div>
  }
}

registerDocument("queryBuilder", QueryBuilder);

export default QueryBuilder;
