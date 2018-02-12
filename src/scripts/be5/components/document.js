import React, {Component} from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import bus from '../core/bus';
import documentState from '../core/documentState';

class Document extends Component {

  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  componentDidMount() {
    bus.replaceListeners(this.props.frontendParams.documentName, data => {
      if(this.state.value.meta !== undefined && !Number.isInteger(Number.parseInt(this.state.value.meta._ts_))){
        console.error("meta._ts_ mast be string of Integer " + this.state.value.meta._ts_);
      }
      if(this.state.value.meta === undefined || data.value.meta === undefined ||
         data.value.meta._ts_ > this.state.value.meta._ts_){
        if(!data.component){
          data.component = undefined
        }
        this.setState(data);
      }
      // if(!data.loading)this.setState({ loading: false });
      // if(!data.error)this.setState({ error: null });
    });
  }

  componentWillUnmount(){
    bus.replaceListeners(this.props.frontendParams.documentName, data => {})
  }

  render() {
    documentState.set(this.props.frontendParams.documentName, this.state);

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
                frontendParams={Object.assign({}, this.props.frontendParams, this.state.frontendParams)}
                onChange={this.props.onChange}
          />
        )
      }
    }else{
      if (this.state.value) {
        contentItem = (
          <h1>{this.state.value}</h1>
        );
      }
    }

    return (
      <div className='document-content' id={'document-content___' + this.props.frontendParams.documentName}>
        {loadingItem}
        {contentItem}
      </div>
    );
  }

}

Document.defaultProps = {
  onChange: () => {}
};

Document.propTypes = {
  frontendParams: PropTypes.shape({
    documentName: PropTypes.string.isRequired,
    operationDocumentName: PropTypes.string,
    parentDocumentName: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

export default Document;
