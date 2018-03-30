import React          from 'react';
//import brace from 'brace';
import be5            from '../be5';
import Document       from '../containers/Document';
import AceEditor from 'react-ace';
import SplitPane from 'react-split-pane';
import ErrorPane from "./ErrorPane";
import changeDocument from "../core/changeDocument";
import {registerDocument} from "../core/documents";
import {getModelByID} from "../utils/documentUtils";

import 'brace/mode/mysql';
import 'brace/theme/xcode';
import 'brace/ext/language_tools';


class QueryBuilder extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      sql: this.props.value.data.attributes,
      value: this.props.value
    };

    this.updateCode = this.updateCode.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount(){
    this.update(this.props.value);
  }

  componentWillReceiveProps(nextProps){
    this.update(nextProps.value);
  }

  updateCode(newSql){
    this.setState({
      sql: newSql,
    });
	}

  submit(){
    be5.net.request('queryBuilder', { sql: this.state.sql, _ts_: new Date().getTime(), values: this.props.value.params }, json => {
      this.update(json);
    });
  }

	update(json){
    this.setState({value: json});
    changeDocument('queryBuilder-finalSql', { value: getModelByID(json.included, json.meta, "finalSql") });

    changeDocument('queryBuilder-table', { value: getModelByID(json.included, json.meta, "queryTable") });
  }

  render() {

    return (
      <div className="queryBuilder">
        <h1>Query Builder</h1>
        <SplitPane split="horizontal" defaultSize={300} >
          <AceEditor
            value={this.state.sql}
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
              $blockScrolling: true,
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
            <Document frontendParams={{documentName: "queryBuilder-table"}} />
            <Document frontendParams={{documentName: "queryBuilder-finalSql"}} />
            <br/>
            <ErrorPane value={this.state.value} />
          </div>
        </SplitPane>

      </div>
    );
    //
  }
}

registerDocument("queryBuilder", QueryBuilder);

export default QueryBuilder;