import React from 'react';
import bus from '../../core/bus';
import be5 from '../../be5';
import Be5Menu from '../be5Menu/Be5Menu';
import Document from '../Document';
import Be5Components from "../Be5Components";


class ApplicationWithBe5Menu extends React.Component
{
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    //TODO refactoring to "RefreshAll"
    bus.listen('LoggedOut', this.refresh);
    bus.listen('LoggedIn', this.refresh);
    bus.listen('LanguageChanged', this.refresh);
    bus.listen('RoleChanged', this.refresh);
  }

  render() {
    return (
      <div>
        <Be5Components ref="be5Components"/>
        <Be5Menu ref="menu" show={true}/>
        <div className="container">
          <div className="row">
            <Document ref="document" frontendParams={{documentName: be5.mainDocumentName}} />
          </div>
        </div>
      </div>
    );

  }

  refresh() {
    this.refs.menu.refresh();
    this.refs.be5Components.refresh();
  }
}

export default ApplicationWithBe5Menu;