import React          from 'react';
//import brace from 'brace';
import be5            from '../be5';
import Document       from './Document';
import Tables         from '../services/tables';
import AceEditor from 'react-ace';
import SplitPane from 'react-split-pane';

import 'brace/mode/mysql';
import 'brace/theme/xcode';


class QueryBuilder extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      sql: this.props.value.included[0].attributes.sql,
      finalSql: this.props.value.included[0].attributes.finalSql
    };

    this.updateCode = this.updateCode.bind(this);
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

    be5.net.request('queryBuilder', { sql: newSql, _ts_: new Date().getTime(), values: this.props.value.params }, json => {
      this.update(json);
    });
	}

	update(json){
    this.setState({
      finalSql: json.included[0].attributes.finalSql,
    });
    Tables._performData(json, 'queryBuilder-table');
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
            name="UNIQUE_ID_OF_DIV"
            width='100%'
            height='100%'
            editorProps={{
              $blockScrolling: true,
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
          <div>
            <br/>
            <Document frontendParams={{documentName: "queryBuilder-table"}} />
            <h2>Final sql</h2>
            <pre>{this.state.finalSql}</pre>
          </div>
        </SplitPane>

      </div>
    );
    //<button>Выполнить</button>
  }
}

export default QueryBuilder;