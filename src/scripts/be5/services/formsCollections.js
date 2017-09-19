import SubmitOnChangeForm from '../components/forms/submitOnChangeForm';
import Form               from '../components/forms/form';


const formsCollections = {
  types: {
    form: Form,
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
