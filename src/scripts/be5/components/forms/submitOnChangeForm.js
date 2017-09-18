import React                from 'react';
import PropTypes            from 'prop-types';
import be5                  from '../../be5';
import Document             from '../../components/document';
import changeDocument       from '../../core/changeDocument';
import BootstrapModal       from '../bootstrapModal';
import Form                 from './form.js';
import formsCollections     from '../../services/formsCollections.js';
import Forms                from '../../services/forms';
import PropertySet          from '../../components/properties/propertySet';
import Properties           from '../../components/properties/properties';
import PropertyInput        from '../../components/properties/propertyInput';
import JsonPointer          from 'json-pointer';
import _                    from 'underscore';

class SubmitOnChangeForm extends Form
{
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.value, { allFieldsFilled: false });


    // this._showAddBuilding = this._showAddBuilding.bind(this);
    // this._showAddApartment = this._showAddApartment.bind(this);
    // this._closeModal = this._closeModal.bind(this);
    // this._confirm = this._confirm.bind(this);
  }




}

export default SubmitOnChangeForm;