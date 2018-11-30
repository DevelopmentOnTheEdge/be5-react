import React          from 'react';
//import brace from 'brace';
import be5            from '../be5';
import Document       from '../containers/Document';
import AceEditor from 'react-ace';
import SplitPane from 'react-split-pane';
import ErrorPane from "./ErrorPane";
import {registerDocument} from "../core/documents";
import {getModelByID} from "../utils/documentUtils";

//todo create file for BE-SQL
import 'brace/mode/mysql';

import 'brace/theme/xcode';
import 'brace/ext/language_tools';


class QueryBuilder extends React.Component
{
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

  componentDidMount(){
    this.update(this.props.value);
  }

  componentWillReceiveProps(nextProps){
    this.update(nextProps.value);
  }

  updateCode(newSql){
    this.setState({ sql: newSql });
	}

  submit(){
    const requestParams = {
      sql: this.state.sql,
      updateWithoutBeSql: this.state.updateWithoutBeSql,
      values: this.props.value.params,
      _ts_: new Date().getTime()
    };

    be5.net.request('queryBuilder', requestParams, json => {
      this.update(json);
    });
  }

	update(json){
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
                onChange={()=>{
                  this.setState({updateWithoutBeSql: !this.state.updateWithoutBeSql});
                }}
                checked={this.state.updateWithoutBeSql === true}/>
              <label className="form-check-label" htmlFor="updateWithoutBeSql">update without be sql</label>
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
        <SplitPane split="horizontal" defaultSize={300} >
          <AceEditor
            value={sql}
            mode="mysql"
            theme="xcode"
            fontSize={13}
            onChange={this.updateCode}
            name="queryBuilder_editor"
            width='100%'
            height='100%'
            enableBasicAutocompletion={false}
            enableLiveAutocompletion={false}
            editorProps={{
              $blockScrolling: Infinity,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
            commands={[{
              name: 'Submit',
              bindKey: {win: 'Alt-Enter', mac: 'Command-Enter'},
              exec: this.submit
            }]}
          />
          <div>
            <button
              className="btn btn-primary btn-sm mt-2 mb-2"
              onClick={this.submit}
              title='Alt-Enter'
            >
              Выполнить
            </button>
            <Document
              value={getModelByID(value.included, value.meta, "result")}
              frontendParams={{documentName: "queryBuilder-result"}}
            />
            <div>{this.state.value.data.attributes.finalSql}</div>
            <br/>
            <ErrorPane value={value} />
          </div>
        </SplitPane>

      </div>
    );
  }
}

registerDocument("queryBuilder", QueryBuilder);

export default QueryBuilder;
