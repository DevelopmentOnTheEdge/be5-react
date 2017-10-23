import React          from 'react';
import be5            from '../be5';
import Document       from '../components/document';
import changeDocument from '../core/changeDocument';
import Navs           from '../components/navs';
import { Collapse, Button } from 'reactstrap';

class EgissoDocs extends React.Component
{
  constructor(){
    super();
    this.state = {helpCollapse: false};
    this.helpCollapseToggle = this.helpCollapseToggle.bind(this);
  }

  componentDidMount(){
    be5.url.process("wizard-page-help", "#!static/egissoDocs.be");
  }

  helpCollapseToggle() {
    this.setState({ helpCollapse: !this.state.helpCollapse });
  }

  help()
  {
    return (
      <div className="">
        <div className="clearfix">
          <h1 className="wizard-page-title">Документы</h1>
          <Button color="info" className="wizard-page-help btn-sm" onClick={this.helpCollapseToggle} style={{ marginBottom: '1rem' }}>
            {be5.messages.helpInfo}
          </Button>
        </div>
        <Collapse isOpen={this.state.helpCollapse}>
          <div className="alert alert-success" role="alert">
            <Document documentName={"wizard-page-help"} />
          </div>
        </Collapse>
      </div>
    )
  }

  render() {
    const help = this.help();
    const steps = [
      {title: be5.messages.categories__Doc_records, url: '#!table/categories/Doc categories'},
      {title: be5.messages.docTypes__All_records, url: '#!table/docTypes/All records'},
      {title: be5.messages.classifications__All_records, url: '#!table/classifications/All records'}
    ];
    return (<div>
      {help}
      <Navs steps={steps} tabs/>
    </div>);
  }

}

be5.registerAction('egissoDocs', (documentName) =>{
  changeDocument(documentName, { component: EgissoDocs, value: {} })
});
