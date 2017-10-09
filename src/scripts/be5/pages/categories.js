import React          from 'react';
import be5            from '../be5';
import Document       from '../components/document';
import Navs           from '../components/navs';
import changeDocument from '../core/changeDocument';


class Categories extends React.Component
{
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.refs.navs.refresh();
  }

  render() {
    const steps = [
      {title: be5.messages.privilegeTypes__All_records_Master, url: '#!table/privilegeTypes/All records Master'},
      {title: be5.messages.categoryRules__All_records, url: '#!table/categoryRules/All records'},
    ];

    return (
      <div>
        <h1 style={{marginBottom: 13 + 'px'}}>Категории граждан</h1>
        <Navs ref="navs" steps={steps} tabs startAtStep={0} />
      </div>
    );
  }

}

be5.registerAction('categories', (documentName) =>{
  changeDocument(documentName, { component: Categories, value: {} })
});
