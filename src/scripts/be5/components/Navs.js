import React from 'react';
import PropTypes from 'prop-types';
import Document from '../containers/Document';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {processHashUrlForDocument} from "../utils/documentUtils";
import be5 from "../be5";


class Navs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      compState: this.props.startAtStep
    };

    this.init = this.init.bind(this);
    this.setNavState = this.setNavState.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    if (this.props.baseUrl !== undefined && this.state.compState !== this.props.startAtStep) {
      this.setState({compState: this.props.startAtStep}, () => {
        this.init();
      });
    }
  }

  init() {
    processHashUrlForDocument(this.props.steps[this.state.compState].url, this.props.documentName);
  }

  setNavState(e) {
    e.preventDefault();
    const id = this.getIDbyUrl(e.target.getAttribute("href"));

    if (this.props.onOpenNav !== undefined) this.props.onOpenNav(id);

    if (this.props.baseUrl !== undefined && this.getUrl(id) !== be5.url.get()) {
      processHashUrlForDocument(this.getUrl(id), this.props.parentDocumentName);
    } else {
      processHashUrlForDocument(e, this.props.documentName);
      this.setState({compState: id});
    }
  }

  getUrl(id) {
    if (id === 0)
      return "#!" + this.props.baseUrl;
    else
      return "#!" + this.props.baseUrl + "/" + id;
  }

  getIDbyUrl(url) {
    for (let i = 0; i < this.props.steps.length; i++) {
      if (this.props.steps[i].url === url) return i;
    }
    return 0;
  }

  renderSteps() {
    return this.props.steps.map((s, i) => (
      <NavItem key={"NavItem" + i}>
        <NavLink href={this.props.steps[i].url} active={i === this.state.compState} onClick={this.setNavState}
                 key={"NavLink" + i}>{this.props.steps[i].title}</NavLink>
      </NavItem>
    ));
  }

  render() {
    const navProps = {
      tabs: this.props.tabs,
      pills: this.props.pills,
      vertical: this.props.vertical,
      navbar: this.props.navbar,
      tag: this.props.tag
    };

    return (
      <div className="navs-component">
        <Nav {...navProps}>
          {this.renderSteps()}
        </Nav>
        <div className="tab-content">
          <Document frontendParams={{documentName: this.props.documentName}}/>
        </div>
      </div>
    );
  }

}

Navs.defaultProps = {
  startAtStep: 0,
  documentName: "navs",
};

Navs.propTypes = {
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  vertical: PropTypes.bool,
  navbar: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onOpenNav: PropTypes.func,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  startAtStep: PropTypes.number,
  baseUrl: PropTypes.string,
  parentDocumentName: PropTypes.string,
  documentName: PropTypes.string
};


export default Navs;
