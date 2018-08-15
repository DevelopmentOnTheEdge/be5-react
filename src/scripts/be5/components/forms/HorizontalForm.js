import React from 'react';
import be5 from '../../be5';
import Form from './Form';
import PropertySet from 'beanexplorer-react';
import {registerDocument} from '../../core/documents';


class HorizontalForm extends Form
{
  _createFormProperties() {
    const attributes = this.state.data.attributes;
    return (
      <PropertySet
        bean={attributes.bean}
        onChange={this._onFieldChange}
        localization={be5.messages.property}
        bsSize={attributes.layout.bsSize}
        horizontal={true}
        horizontalColSize={attributes.layout.horizontalColSize || 2}
      />
    );
  }

  _createFormActions() {
    const horizontalColSize = this.state.data.attributes.layout.horizontalColSize || 2;

    return (
      <div className="formActions row">
        <div className={'col-lg-' + horizontalColSize}>&nbsp;</div>
        <div className={'col-lg-' + (12-horizontalColSize)}>
        {this._createSubmitAction()}
        {' '}
        {this._createCancelAction()}
        </div>
      </div>
    );
  }

}

registerDocument('form', HorizontalForm);

export default HorizontalForm;
