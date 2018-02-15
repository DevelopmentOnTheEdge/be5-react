import SubmitOnChangeForm from '../components/forms/SubmitOnChangeForm';
import ModalForm          from '../components/forms/ModalForm';
import Form               from '../components/forms/Form';


const formsCollections = {
  types: {
    form: Form,
    modal: ModalForm,
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
