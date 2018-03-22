import PropTypes  from 'prop-types';
import React, {Component} from 'react';
import MenuBody        from './MenuBody';
import MenuSearchField from './MenuSearchField';
import {arraysEqual}    from '../../utils';


const propTypes = {
  menu: PropTypes.shape({}).isRequired,
  currentRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchMenu: PropTypes.func.isRequired,
};

class Menu extends Component {
  constructor(props) {
    super(props);

    this._handleQueryChange = this._handleQueryChange.bind(this);
  }

  componentWillMount() {
    // this.props.fetchMenu();
  }

  componentWillReceiveProps(nextProps) {
    const { currentRoles, fetchMenu } = this.props;
    if (!arraysEqual(currentRoles, nextProps.currentRoles)) {
      fetchMenu();
    }
  }

  render() {
    return (
      <div className="menuContainer">
        <MenuSearchField ref="searchfield" onChange={this._handleQueryChange}/>
        <MenuBody ref="menubody" menu={this.props.menu} />
      </div>
    );
  };

  _handleQueryChange(query) {
    this.refs.menubody.setState({ query: query });
  }
}

Menu.propTypes = propTypes;

export default Menu;