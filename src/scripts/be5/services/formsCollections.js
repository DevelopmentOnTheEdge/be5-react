import AddressesForm from '../components/forms/addressesForm.js'


// todo move to Redux
const formsCollections = {
  types: {
    addresses: AddressesForm,
  },

  getForm(actionName) {
    return this.types[actionName];
  },

  registerForm(actionName, fn) {
    this.types[actionName] = fn;
  }
};

export default formsCollections;
