import React, {Component} from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import bus from '../core/bus';
import documentState from '../core/documentState';
import { connect }    from 'react-redux'
import { getCurrentRoles } from '../store/selectors/user.selectors'
import {ROLE_SYSTEM_DEVELOPER} from "../constants";
import {getDocument} from "../core/documents";

import reloadImg from '../../../images/reload.png';
import StaticPage from "../components/StaticPage";


class Document extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      frontendParams: props.frontendParams
    };

    this.reload = this.reload.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== undefined &&
      (this.props.value.meta === undefined ||
        nextProps.value.meta === undefined ||
        nextProps.value.meta._ts_ > this.props.value.meta._ts_))
    {
      this.setState({
        value: nextProps.value || "",
        frontendParams: nextProps.frontendParams
      });
    }
  }

  componentDidMount() {
    bus.replaceListeners(this.props.frontendParams.documentName, data =>
    {
      if(this.state.value.meta !== undefined && !Number.isInteger(Number.parseInt(this.state.value.meta._ts_)))
      {
        console.error("meta._ts_ mast be string of Integer " + this.state.value.meta._ts_);
      }

      if(this.state.value.meta === undefined || data.value.meta === undefined
          || data.value.meta._ts_ > this.state.value.meta._ts_)
      {
        this.setState(Object.assign(
          {value: undefined, frontendParams: undefined},
          data
        ));
      }
      // if(!data.loading)this.setState({ loading: false });
      // if(!data.error)this.setState({ error: null });
    });

    bus.replaceListeners(this.props.frontendParams.documentName + be5.DOCUMENT_REFRESH_SUFFIX, () => {
      this.refresh();
    });
  }

  componentWillUnmount(){
    bus.replaceListeners(this.props.frontendParams.documentName, data => {});
    bus.replaceListeners(this.props.frontendParams.documentName + be5.DOCUMENT_REFRESH_SUFFIX, data => {});
  }

  reload() {
    if(this.state.value.data.links.self !== undefined)
    {
      be5.url.process(this.props.frontendParams.documentName, "#!" + this.state.value.data.links.self);
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

    const devRole = this.props.currentRoles && this.props.currentRoles.indexOf(ROLE_SYSTEM_DEVELOPER) !== -1;

    const devTools = (
      <span onClick={this.refresh} className={"document-reload float-right"}>
        <img src={reloadImg} alt={be5.messages.reload}
             title={be5.messages.reload + " " + this.props.frontendParams.documentName}/>
      </span>
    );

    let contentItem = null;
    if(this.state.value)be5.ui.setTitle(this.state.value.title);

    if(this.state.value.data && this.state.value.data.type)
    {
      const documentType = this.getDocumentName();
      const DocumentContent = getDocument(this.getDocumentName(documentType));

      if(DocumentContent === undefined)
      {
        const value = StaticPage.createValue(
          be5.messages.componentForTypeNotRegistered.replace( '$type', documentType), '');

        contentItem = (
          <StaticPage
            ref="documentContent"
            value={value}
            frontendParams={this.getComponentFrontendParams()}
          />
        )
      }
      else
      {
        contentItem = (
          <div>
            {devRole ? devTools : null}
            <DocumentContent
              ref="documentContent"
              value={this.state.value}
              frontendParams={this.getComponentFrontendParams()}
            />
          </div>
        )
      }
    }
    else if(this.state.value.errors)
    {
      const ErrorPane = getDocument("errorPane");
      contentItem = (
        <ErrorPane
          ref="documentContent"
          value={this.state.value}
          frontendParams={this.getComponentFrontendParams()}
        />
      )
    }
    else{
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

  getDocumentName() {
    if(this.props.documentType)
    {
      return this.props.documentType;
    }

    if(this.state.value.data.attributes.layout !== undefined &&
      this.state.value.data.attributes.layout.type !== undefined)
    {
      return this.state.value.data.attributes.layout.type;
    }

    if(this.props.frontendParams.documentName === be5.MAIN_MODAL_DOCUMENT)
    {
      return 'modalForm';
    }

    return this.state.value.data.type;
  }

  getComponentFrontendParams() {
    return Object.assign({}, this.state.frontendParams, this.props.frontendParams);
  }
}

Document.propTypes = {
  frontendParams: PropTypes.shape({
    documentName: PropTypes.string.isRequired,
    operationDocumentName: PropTypes.string,
    parentDocumentName: PropTypes.string,
    onSuccess: PropTypes.function
  }),
  value: PropTypes.object,
  documentType: PropTypes.string
};

export {
  Document
};

const mapStateToProps = state => ({
  currentRoles: getCurrentRoles(state)
});

export default connect(
  mapStateToProps
)(Document)
