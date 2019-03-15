import React, {Component} from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import bus from '../core/bus';
import {getCurrentRoles} from '../store/selectors/user.selectors'
import {DOCUMENT_REFRESH_SUFFIX, MAIN_MODAL_DOCUMENT, ROLE_SYSTEM_DEVELOPER} from "../constants";
import {getDocument} from "../core/registers/documents";

import reloadImg from '../../../images/reload.png';
import StaticPage from "../components/StaticPage";
import {createStaticValue, getSelfUrl} from "../utils/documentUtils";


class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || null,
      frontendParams: props.frontendParams || {}
    };

    this.refresh = this.refresh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps &&
      (!this.props.value || this.props.value.meta === undefined ||
        !nextProps.value || nextProps.value.meta === undefined ||
        nextProps.value.meta._ts_ > this.props.value.meta._ts_)) {
      this.setState({
        value: nextProps.value || "",
        frontendParams: nextProps.frontendParams
      });
    }
  }

  componentDidMount() {
    bus.replaceListeners(this.props.frontendParams.documentName, data => {
      if (this.state.value && this.state.value.meta && !Number.isInteger(Number.parseInt(this.state.value.meta._ts_))) {
        console.error("meta._ts_ mast be string of Integer " + this.state.value.meta._ts_);
      }

      if (!this.state.value || !this.state.value.meta || !data.value || !data.value.meta
        || data.value.meta._ts_ > this.state.value.meta._ts_) {
        this.setState(Object.assign(
          {value: {}, frontendParams: {}},
          data
        ));
      }
      // if(!data.loading)this.setState({ loading: false });
      // if(!data.error)this.setState({ error: null });
    });

    bus.replaceListeners(this.props.frontendParams.documentName + DOCUMENT_REFRESH_SUFFIX, () => {
      this.refresh();
    });
  }

  componentWillUnmount() {
    bus.replaceListeners(this.props.frontendParams.documentName, data => {
    });
    bus.replaceListeners(this.props.frontendParams.documentName + DOCUMENT_REFRESH_SUFFIX, data => {
    });
  }

  render() {
    const loadingItem = null;//this.state.loading
    //? (<div className={"document-loader " + (this.state.error ? "error" : "")}/>): null;

    //if(this.state.value)be5.ui.setTitle(this.state.value.title);

    const document = this.getDocument();
    if (document === null) {
      return null;
    }

    return (
      <div className='document-content' id={'document-content___' + this.props.frontendParams.documentName}>
        {loadingItem}
        {document}
      </div>
    );
  }

  getDocument() {
    const documentType = this.getDocumentName();
    if (documentType === null) {
      return null;
    }

    const DocumentContent = getDocument(documentType);

    if (DocumentContent === undefined) {
      const title = be5.messages.componentForTypeNotRegistered.replace('$type', documentType);
      const value = createStaticValue(title, '', {self: "#!"});

      return (
        <StaticPage
          value={value}
          frontendParams={this.getComponentFrontendParams()}
        />
      )
    }

    return (
      <div>
        {this.getDevTools()}
        <DocumentContent
          value={this.state.value}
          frontendParams={this.getComponentFrontendParams()}
        />
      </div>
    )

  }

  getDocumentName() {
    if (!this.state.value) {
      return null;
    }

    if (this.props.type) {
      return this.props.type;
    }

    if (this.state.frontendParams.type) {
      return this.state.frontendParams.type;
    }

    if (this.state.value.data) {
      if (this.state.value.data.attributes && this.state.value.data.attributes.layout &&
        this.state.value.data.attributes.layout.type !== undefined) {
        return this.state.value.data.attributes.layout.type;
      }

      if (this.state.value.data.type === 'form' && this.props.frontendParams.documentName === MAIN_MODAL_DOCUMENT) {
        return 'modalForm';
      }

      if (this.state.value.data.type === 'table' && this.props.frontendParams.documentName === MAIN_MODAL_DOCUMENT) {
        return 'modalTable';
      }

      return this.state.value.data.type;
    }

    if (this.state.value.errors) {
      return 'errorPane';
    }

    return undefined;
  }

  getDevTools() {
    if (!hasDevRole() || !getSelfUrl(this.state.value)) {
      return null;
    }

    return (
      <span onClick={this.refresh} className={"document-reload float-right"}>
        <img src={reloadImg} alt={be5.messages.reload}
             title={be5.messages.reload + " " + this.props.frontendParams.documentName + " - " + getSelfUrl(this.state.value)}/>
      </span>
    );
  }

  refresh() {
    be5.url.process(this.props.frontendParams, "#!" + getSelfUrl(this.state.value));
  }

  getComponentFrontendParams() {
    return Object.assign({}, this.state.frontendParams, this.props.frontendParams);
  }
}

function hasDevRole() {
  return be5.store && getCurrentRoles(be5.store.getState()).indexOf(ROLE_SYSTEM_DEVELOPER) !== -1
}

Document.propTypes = {
  frontendParams: PropTypes.shape({
    documentName: PropTypes.string.isRequired,
    operationDocumentName: PropTypes.string,
    parentDocumentName: PropTypes.string,
    onSuccess: PropTypes.function
  }),
  value: PropTypes.object,
  type: PropTypes.string
};

export {
  Document
};

export default Document;
