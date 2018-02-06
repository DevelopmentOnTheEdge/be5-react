import React          from 'react';
//import brace from 'brace';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import Document       from './document';
import StaticPage     from './staticPage';
import Tables         from '../services/tables';
import AceEditor from 'react-ace';
import SplitPane from 'react-split-pane';

import '../../../css/qBuilder.css';

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

  updateCode(newSql){
    this.setState({
      sql: newSql,
    });

    be5.net.request('queryBuilder', { sql: newSql, _ts_: new Date().getTime() }, json => {
      this.setState({
        finalSql: json.included[0].attributes.finalSql,
      });
      this.update(json);
    });
	}

	update(json){
    Tables.performData(json, 'queryBuilder-table');
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
            <Document documentName={"queryBuilder-table"} onChange={()=>{}}/>
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