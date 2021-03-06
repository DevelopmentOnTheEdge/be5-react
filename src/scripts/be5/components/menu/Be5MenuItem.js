// import React from 'react';
// import {DEFAULT_VIEW} from '../../constants';
// import actions from '../../services/actions';
//
// export default React.createClass({
//   displayName: 'Be5MenuItem',
//
//   propTypes: {
//     entity: React.PropTypes.string,
//     view: React.PropTypes.string,
//     op: React.PropTypes.string
//   },
//
//   getInitialState() {
//     return { available: false, title: '' };
//   },
//   //
//   // componentDidMount() {
//   //   this._onMenuChanged(Be5MenuHolder.getMenu());
//   //   Be5MenuHolder.addListener(this._onMenuChanged);
//   // },
//
//   render() {
//     if (!this.state.available) {
//       return ( <span></span> );
//     }
//     const { href, target } = actions.parse(Be5MenuHolder.getMenu().find(this._getCoordinates()).action);
//     console.log(href, target);
//     return (
//       <a className="menu-item" href={href} target={target}>{this.state.title}</a>
//     );
//   },
//
//   _onMenuChanged(menu) {
//     var item = Be5MenuHolder.getMenu().find(this._getCoordinates());
//     if (!item) {
//       this.setState({ available: false });
//     } else {
//       this.setState({ available: true, title: item.title });
//     }
//   },
//
//   // Translates "op" to "_on_" and "view" to "_qn_"
//   // Don't read it, it's boring.
//   _getCoordinates() {
//     if (this.props.view && this.props.op) {
//       return {
//         entity: this.props.entity, query: this.props.view, operation: this.props.op
//       };
//     }
//     if (this.props.op) {
//       return {
//         entity: this.props.entity, operation: this.props.op
//       };
//     }
//     return {
//       entity: this.props.entity,
//       query: this.props.view || DEFAULT_VIEW
//     };
//   }
// });
