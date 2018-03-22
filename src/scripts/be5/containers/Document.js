import React, {Component} from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import bus from '../core/bus';
import documentState from '../core/documentState';
import { connect }    from 'react-redux'
import { getCurrentRoles } from '../store/selectors/user.selectors'
import {ROLE_SYSTEM_DEVELOPER} from "../constants";

import reloadImg from '../../../images/reload.png';


class Document extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      frontendParams: props.frontendParams,
      component: props.component
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
        frontendParams: nextProps.frontendParams,
        component: nextProps.component
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
          {value: undefined, frontendParams: undefined, component: undefined},
          data
        ));
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
            {devRole ? devTools : null}
            <DocumentContent
                  ref="documentContent"
                  value={this.state.value}
                  frontendParams={this.getComponentFrontendParams()}
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
  component: PropTypes.func
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
