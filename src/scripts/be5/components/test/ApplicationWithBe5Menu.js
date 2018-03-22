import React from 'react';
import bus from '../../core/bus';
import be5 from '../../be5';
import Be5Menu from '../be5Menu/Be5Menu';
import Document from '../../containers/Document';
import Be5Components from "../Be5Components";


class ApplicationWithBe5Menu extends React.Component
{
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    bus.listen('RefreshAll', this.refresh);
  }

  render() {
    return (
      <div>
        <Be5Components/>
        <Be5Menu ref="menu" show={true}/>
        <div className="container">
          <div className="row">
            <Document ref="document" frontendParams={{documentName: be5.MAIN_DOCUMENT}} />
          </div>
        </div>
      </div>
    );

  }

  refresh() {
    this.refs.menu.refresh();
  }
}

export default ApplicationWithBe5Menu;