import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import classNames           from 'classnames';
import be5                  from '../be5';
import Document             from './document';
import { Nav, NavItem, NavLink } from 'reactstrap';


class Navs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      compState: this.props.startAtStep
    };

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(){
    this.refresh();
  }

  refresh() {
    be5.url.process(this.props.documentName, this.props.steps[this.state.compState].url);
  }
  
  setNavState(id) {
    this.setState({compState: id});
    be5.url.process(this.props.documentName, this.props.steps[id].url);
  }
  
  renderSteps(){
    return this.props.steps.map((s, i)=> (
        <NavItem key={"NavItem"+i}>
          <NavLink href="#" active={i == this.state.compState} onClick={() => this.setNavState(i)}
                   key={"NavLink"+i} >{this.props.steps[i].title}</NavLink>
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
    }

    return (
      <div className="navs-component">
        <Nav {...navProps}>
          {this.renderSteps()}
        </Nav>
        <div className="tab-content">
          <Document documentName={this.props.documentName} />
        </div>
     </div>
    );
  }

}

Navs.defaultProps = {
  startAtStep: '0',
  documentName: "navs",
};

Navs.propTypes = {
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  vertical: PropTypes.bool,
  navbar: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  startAtStep: PropTypes.string,
  documentName: PropTypes.string
};


export default Navs;