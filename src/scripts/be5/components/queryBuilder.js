import be5            from '../be5';
import React          from 'react';
//import brace from 'brace';
import AceEditor from 'react-ace';
import Document       from './document';
import Tables         from '../services/tables';
import SplitPane from 'react-split-pane';

import '../../../css/qBuilder.css';

import 'brace/mode/mysql';
import 'brace/theme/xcode';


class QueryBuilder extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {code: "select * from users"};

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

    return (
      <div className="queryBuilder">
        <h1>Query Builder</h1>
        <SplitPane split="horizontal" defaultSize={500} >

          <AceEditor
            value={this.state.code}
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
          <Document documentName={"queryBuilder-table"} onChange={()=>{}}/>
        </SplitPane>

      </div>
    );
    //<button>Выполнить</button>
  }
}

export default QueryBuilder;