import React           from 'react';
import be5             from '../../be5';
import Form            from './form.js';
import PropertySet     from '../properties/propertySet';
import Document from "../document";


class ModalForm extends Form
{
  constructor(props) {
    super(props);
  }

  render() {
    const attributes = this.state.data.attributes;
    return (
      <div className="row">
        <div className={'formBox ' + (attributes.layout.formBoxCssClasses || 'col-12 max-width-970 formBoxDefault')}>
          <h1 className="form-component__title">{attributes.title}</h1>
          <form className="" onSubmit={this._applyOnSubmit}>
            <PropertySet bean={attributes.bean} onChange={this._onFieldChange} localization={be5.messages.property}/>
          </form>
          <br/>
        </div>
        <div className="col-12">
          <Document documentName={this.props.value.documentName +"_errors"} onChange={this.onChange} />
        </div>
      </div>
    );
  }

}

export default ModalForm;