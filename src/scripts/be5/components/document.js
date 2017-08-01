import React, {Component} from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import bus from '../core/bus';

import '../../../css/document.css';

class Document extends Component {

  constructor(props) {
    super(props);

    this.state = { component: 'text', value: "Page is loading..." };
  }

  componentDidMount() {
    bus.listen(this.props.listenEventName, data => this.setState(data));
  }

  componentWillUnmount(){
    bus.notListen(this.props.listenEventName);
  }

  render() {
    be5.ui.setTitle(this.state.value.title);

    if (this.state.component === 'text')
    {
      return <div className="document-content">
               <h1>{this.state.value}</h1>
             </div>
    }

    const DocumentContent = this.state.component;
    if(DocumentContent !== null) {
      return (
        <div className="document-content">
          <DocumentContent value={this.state.value}/>
        </div>
      )
    }
    return null;
  }

}

Document.defaultProps = {
  listenEventName: 'DocumentChange'
};

Document.propTypes = {
  listenEventName: PropTypes.string
}

export default Document;
