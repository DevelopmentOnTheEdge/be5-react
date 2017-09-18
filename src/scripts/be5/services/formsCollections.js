import AddressesForm from '../components/forms/addressesForm.js'
import SubmitOnChangeForm from '../components/forms/submitOnChangeForm.js'

const formsCollections = {
  types: {
    addresses: AddressesForm,
    submitOnChange: SubmitOnChangeForm,
  },

  getForm(actionName) {
    return this.types[actionName];
  },

  registerForm(actionName, fn) {
    this.types[actionName] = fn;
  }
};

export default formsCollections;
