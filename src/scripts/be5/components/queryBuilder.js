import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import React          from 'react';
import CodeMirror     from 'react-codemirror';
import CodeMirrorShowHint     from 'codemirror/addon/hint/show-hint.js';
import CodeMirrorSqlHint     from 'codemirror/addon/hint/sql-hint.js';
import Document       from './document';
import Tables         from '../services/tables';

import '../../../css/qBuilder.css';
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";


class QueryBuilder extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {code: "select * from users"}

    this.updateCode = this.updateCode.bind(this);
  }
  componentDidMount(){
    be5.net.request('queryBuilder', { sql: this.state.code, _ts_: new Date().getTime() }, json => {
      Tables.performData(json, 'queryBuilder-table');
    });
  }

  updateCode(newCode){
    be5.net.request('queryBuilder', { sql: newCode, _ts_: new Date().getTime() }, json => {
      Tables.performData(json, 'queryBuilder-table');
    });
		this.setState({
			code: newCode,
		});
	}

  render() {
    var options = {
      lineNumbers: true,
      mode:  "text/x-pgsql",
      extraKeys: {"Ctrl-Space": "autocomplete"},
      hintOptions: {tables: {
        users: {name: null, score: null, birthDate: null},
        countries: {name: null, population: null, size: null}
      }}
    };
    return (
      <div className="queryBuilder">
        <h1>Query Builder</h1>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        <br/>
        <Document documentName={"queryBuilder-table"} />
      </div>
    );
    //<button>Выполнить</button>
  }
}

export default QueryBuilder;