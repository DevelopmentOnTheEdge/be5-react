import React          from 'react';
import ReactDOM       from 'react-dom';
import be5            from '../be5';
import ext            from '../core/ext';
import bus            from '../core/bus';
import $              from 'jquery';
import BootstrapModal from './bootstrapModal';

import '../../../css/login.css';
  
const Login = React.createClass({
  
  displayName: 'Login',
  
  propTypes: {
    onConfirm: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onSuccess: React.PropTypes.func.isRequired,
  },
  
  getInitialState() {
    return {
      errorMessage: '',
      infoMessage: ''
    };
  },
  
  render() {
    const extensions = ext.get('login').map(e => e(this._onSuccess).render());
    //<a href="#!restore">Forgot password?</a>
    return (
      <div className="login">
        <BootstrapModal title={be5.messages.Login} ref="modal" confirm={be5.messages.Submit} cancel={be5.messages.cancel} onCancel={this._cancel} onConfirm={this._confirm}>
          <form className="login-form">
            <div className="form-group row">
              <label htmlFor="login-username">{be5.messages.Name}</label>
              <input type="text" id="login-username" className="form-control" ref="username" placeholder="" onKeyDown={this._handleKeyDown}/>
            </div>
            <div className="form-group row">
              <label htmlFor="login-password">{be5.messages.Password}</label>
              <input type="password" id="login-password" className="form-control" ref="password" placeholder="" onKeyDown={this._handleKeyDown}/>
            </div>
          </form>

          {extensions}
          {this._getErrorMessage()}
          {this._getInfoMessage()}
        </BootstrapModal>
      </div>
    );
  },
  
  componentDidMount() {
    ext.get('login').forEach(e => e(this._onSuccess).componentDidMount());
  },
  
  show() {
    this.refs.modal.open();
    setTimeout(() => $('#login-username').focus(), 500);
  },
  
  _getErrorMessage() {
    if (this.state.errorMessage) {
      return <div className="alert alert-danger">{this.state.errorMessage}</div>;
    }
    return undefined; 
  },

  _setErrorMessage(message) {
    this.setState({ errorMessage: message});
  },
  
  _getInfoMessage() {
    if (this.state.infoMessage) {
      return <div className="alert alert-info">{this.state.infoMessage}</div>;
    }
    return undefined;
  },

  _setInfoMessage(message) {
    this.setState({ infoMessage: message });
  },

  _cancel() {
    this._close();
    this.props.onCancel();
  },
  
  _handleKeyDown(event) {
    if (event.keyCode == 13) { // Enter
      this._confirm();
    } else if (event.keyCode == 27) { // ESC
      this._cancel();
    } else if (this.state.errorMessage) {
      this._setErrorMessage('');
    }
  },
  
  _confirm() {
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    if(!username || !password) {
       this._setErrorMessage('Enter your username and password');
    } else {
       this.props.onConfirm(username, password, this._onSuccess, this._setErrorMessage);
    }
  },
  
  _onSuccess() {
    this.props.onSuccess();
    this._close();
  },
  
  _close() {
    this.refs.modal.close();
  }
});

export default Login;
