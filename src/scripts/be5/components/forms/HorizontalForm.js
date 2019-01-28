import React from 'react';
import be5 from '../../be5';
import Form from './Form';
import classNames from 'classnames';
import PropertySet from 'beanexplorer-react';
import {registerDocument} from '../../core/registers/documents';
import {_createBackAction} from "../../utils/documentUtils";


class HorizontalForm extends Form
{
  _createFormProperties() {
    const attributes = this.state.data.attributes;
    return (
      <PropertySet
        bean={attributes.bean}
        onChange={this._onFieldChange}
        reloadOnChange={this._onReloadOnChange}
        localization={be5.messages.property}
        bsSize={attributes.layout.bsSize}
        horizontal={true}
        horizontalColSize={attributes.layout.horizontalColSize || 3}
      />
    );
  }

  _createFormActions() {
    const horizontalColSize = this.state.data.attributes.layout.horizontalColSize || 3;
    const colTag = 'col-lg-' + (12-horizontalColSize);
    const offsetTag = 'offset-lg-' + horizontalColSize;

    return (
      <div className="formActions form-row">
        <div className={classNames(colTag, offsetTag)}>
          {this._createSubmitAction()}
          {' '}
          {_createBackAction(this.state.data.attributes.layout, this.props.frontendParams)}
        </div>
      </div>
    );
  }

}

registerDocument('form', HorizontalForm);

export default HorizontalForm;
