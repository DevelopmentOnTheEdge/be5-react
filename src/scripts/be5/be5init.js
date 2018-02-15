import be5 from './be5';
import bus from './core/bus';
import documentState      from './core/documentState';
import tablesCollections  from './services/tablesCollections';
import formsCollections   from './services/formsCollections';
import TableForm          from './components/tables/TableForm';
import TableFormRow       from './components/tables/TableFormRow';
import FormTable          from './components/tables/FormTable';
import Table              from './components/tables/Table';
import SubmitOnChangeForm from './components/forms/SubmitOnChangeForm';
import ModalForm          from './components/forms/ModalForm';
import Form               from './components/forms/Form';


tablesCollections.registerTable('tableForm', TableForm);
tablesCollections.registerTable('tableFormRow', TableFormRow);
tablesCollections.registerTable('formTable', FormTable);
tablesCollections.registerTable('table', Table);

formsCollections.registerForm('form', Form);
formsCollections.registerForm('modal', ModalForm);
formsCollections.registerForm('submitOnChange', SubmitOnChangeForm);

const hashChange = function()
{
  const state = documentState.get(be5.mainDocumentName);

  if(state.value.links !== undefined && "#!" + state.value.links.self === document.location.hash
      && state.value.links.self.startsWith('form'))
  {
    //console.log('skip - form already opened');
  }
  else
  {
    be5.url.process(be5.mainDocumentName, document.location.hash);
  }
};

window.addEventListener("hashchange", hashChange, false);

be5.net.request("appInfo", {}, function(data) {
  be5.appInfo = data;
  be5.ui.setTitle();
});

bus.listen('CallDefaultAction', () => {
  be5.net.request('menu/defaultAction', {}, data => {
    be5.url.set(data.arg)
  });
});

be5.net.request('languageSelector', {}, function(data) {
  be5.locale.set(data.selected, data.messages);
  be5.url.process(be5.mainDocumentName, document.location.hash);
});
