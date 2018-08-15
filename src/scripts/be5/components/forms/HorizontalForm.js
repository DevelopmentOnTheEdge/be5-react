import React           from 'react';
import be5             from '../../be5';
import classNames      from 'classnames';
import Form            from './Form';
import PropertySet     from 'beanexplorer-react';
import {registerDocument} from '../../core/documents';


class HorizontalForm extends Form
{
  _createFormActions() {
    const horizontalColSize = this.state.data.attributes.layout.horizontalColSize || 2;

    return (
      <div className="formActions row">
        <div className={'col-lg-' + horizontalColSize}>&nbsp;</div>
        <div className={'col-lg-' + (12-horizontalColSize)}>
        {this._createOkAction()}
        {' '}
        {this._createCancelAction()}
        </div>
      </div>
    );
  }

  render() {
    const attributes = this.state.data.attributes;
    const horizontalColSize = attributes.layout.horizontalColSize || 2;

    return (
      <div className="row">
        <div className={'formBox ' + (attributes.layout.formBoxCssClasses || 'col-12 max-width-970 formBoxDefault')}>
          <h1 className="form-component__title">{attributes.title}</h1>
          <form
            id={this.state.meta._ts_}
            onSubmit={this._applyOnSubmit}
            className={classNames(
              this.state.wasValidated ? 'was-validated' : '',
              attributes.layout.formClassName
            )}
          >
            <PropertySet
              bean={attributes.bean}
              onChange={this._onFieldChange}
              localization={be5.messages.property}
              bsSize={attributes.layout.bsSize}
              horizontal={true}
              horizontalColSize={horizontalColSize}
            />
            {this._createFormActions()}
          </form>
          <br/>
        </div>
        <div className="col-12">
          {this._getErrorPane()}
        </div>
      </div>
    );
  }

}

registerDocument('form', HorizontalForm);

export default HorizontalForm;
