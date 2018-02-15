import React, {Component} from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import bus from '../core/bus';
import documentState from '../core/documentState';

import reloadImg from '../../../images/reload.png';


class Document extends Component
{
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.reload = this.reload.bind(this);
    this.refresh = this.refresh.bind(this);
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
        this.setState({value: data.value, component: data.component});
        if(data.frontendParams && data.frontendParams.parentDocumentName)
        {
          this.setState({frontendParams: {parentDocumentName: data.frontendParams.parentDocumentName}});
        }
      }
      // if(!data.loading)this.setState({ loading: false });
      // if(!data.error)this.setState({ error: null });
    });

    bus.replaceListeners(this.props.frontendParams.documentName + be5.documentRefreshSuffix, () => {
      this.refresh();
    });
  }

  componentWillUnmount(){
    bus.replaceListeners(this.props.frontendParams.documentName, data => {});
    bus.replaceListeners(this.props.frontendParams.documentName + be5.documentRefreshSuffix, data => {});
  }

  reload() {
    if(this.state.value.links.self !== undefined)
    {
      be5.url.process(this.props.frontendParams.documentName, "#!" + this.state.value.links.self);
    }
  }

  refresh() {
    //console.log("refresh() ", JSON.stringify(this.props.frontendParams), JSON.stringify(this.state.frontendParams));
    this.refs.documentContent.refresh();
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
          <div>
            <span onClick={this.refresh} className={"document-reload float-right"}>
              <img src={reloadImg} alt={be5.messages.reload}
                   title={be5.messages.reload + " " + this.props.frontendParams.documentName}/>
            </span>
            <DocumentContent
                  ref="documentContent"
                  value={this.state.value}
                  frontendParams={Object.assign({}, this.props.frontendParams, this.state.frontendParams)}
            />
          </div>
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

Document.propTypes = {
  frontendParams: PropTypes.shape({
    documentName: PropTypes.string.isRequired,
    operationDocumentName: PropTypes.string,
    parentDocumentName: PropTypes.string,
  })
};

export default Document;
