import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import BootstrapButton from 'components/bootstrapButton';
import 'bootstrap';

export default React.createClass({
  displayName: 'BootstrapModal',
  
  // The following two methods are the only places we need to
  // integrate with Bootstrap or jQuery!
  componentDidMount() {
    // When the component is added, turn it into a modal
    $(ReactDOM.findDOMNode(this)).modal({backdrop: 'static', keyboard: false, show: false})
  },
  
  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this)).off('hidden', this.handleHidden);
  },
  
  close() {
    $(ReactDOM.findDOMNode(this)).modal('hide');
  },
  
  open() {
    $(ReactDOM.findDOMNode(this)).modal('show');
  },
  
  render() {
    var confirmButton = null;
    var cancelButton = null;
    var restoreButton = null;

    if (this.props.confirm) {
      confirmButton = (
        <BootstrapButton className="btn-primary" onClick={this._handleConfirm}>{this.props.confirm}</BootstrapButton>
      );
    }
    
    if (this.props.cancel) {
      cancelButton = (
        <BootstrapButton className="btn-default" onClick={this._cancel}>{this.props.cancel}</BootstrapButton>
      );
    }

    // Attempt to introduce a button to restore password
    if (this.props.restore) {
      restoreButton = (
        <BootstrapButton className="btn-warning" onClick={this._restore}>{this.props.restore}</BootstrapButton>
      );
    }

    return (
      <div className="modal hide fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this._cancel}>&times;</button>
              <h4>{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {restoreButton}&nbsp;
              {cancelButton}&nbsp;
              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    );
  },
  
  _cancel() {
    this.props.onCancel && this.props.onCancel();
  },
  
  _handleConfirm() {
    this.props.onConfirm && this.props.onConfirm();
  },
 _restore() {
    this.props.onRestore && this.props.onRestore();
  }
});
