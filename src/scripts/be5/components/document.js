import React, {Component} from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import bus from '../core/bus';


class Document extends Component {

  constructor(props) {
    super(props);
    this.state = { value: {} };
  }

  componentDidMount() {
    bus.replaceListeners(this.props.documentName, data => {
      if(this.state.value.meta === undefined || data.value.meta === undefined ||
         data.value.meta._ts_ > this.state.value.meta._ts_){
        this.setState(data);
      }
      // if(!data.loading)this.setState({ loading: false });
      // if(!data.error)this.setState({ error: null });
    });
  }

  render() {
    const loadingItem = null;//this.state.loading
      //? (<div className={"document-loader " + (this.state.error ? "error" : "")}/>): null;

    let contentItem = null;
    if(this.state.value)be5.ui.setTitle(this.state.value.title);

    if(this.state.component){
      if (this.state.component === 'text')
      {
        contentItem = (
           <h1>{this.state.value}</h1>
        );
      }else if (this.state.component !== null) {
        const DocumentContent = this.state.component;
        contentItem = (
          <DocumentContent
                value={this.state.value}
                onChange={this.props.onChange}
                operationDocumentName={this.props.operationDocumentName || this.props.documentName}
          />
        )
      }
    }

    return (
      <div className='document-content' id={'document-content___' + this.props.documentName}>
        {loadingItem}
        {contentItem}
      </div>
    );
  }

}

Document.defaultProps = {
  documentName: 'MainDocument'
};

Document.propTypes = {
  documentName: PropTypes.string
};

export default Document;
