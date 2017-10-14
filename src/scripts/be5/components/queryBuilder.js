import React          from 'react';
import CodeMirror     from 'react-codemirror';
import CodeMirrorShowHint     from 'codemirror/addon/hint/show-hint.js';
import CodeMirrorSqlHint     from 'codemirror/addon/hint/sql-hint.js';
import Document       from './document';

import '../../../css/splitPane.css';
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";


class QueryBuilder extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {code: "select * from us"}

    this.updateCode = this.updateCode.bind(this);
  }

  updateCode(newCode) {
//    const requestParams = {
//      _ts_: new Date().getTime()
//    };
//    be5.net.request('qBuilder', requestParams, data => {
//      changeDocument(documentName, { component: QueryBuilder, value: data })
//    });
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
      <div className="editor-table">
        <h1>Query Builder</h1>
        <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
        <button>Выполнить</button>
        <Document documentName={"table"} />
      </div>
    );
  }
}

export default QueryBuilder;