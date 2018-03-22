import be5 from './be5.js';
import be5init from './be5init.js';
//import be5styles from './be5styles.js';
import * as constants from './constants.js';
import preconditions from './utils/preconditions.js';
import * as documentUtils from './utils/documentUtils.js';
import * as utils from './utils/utils.js';

// core
import bus from './core/bus.js';
import changeDocument from './core/changeDocument.js';
import * as documents from './core/documents.js';
import * as routes  from './core/routes.js';

// components
import Application      from './components/Application.js';
import Be5Menu          from './components/be5Menu/Be5Menu.js';
import Be5MenuHolder    from './components/be5Menu/Be5MenuHolder.js';
import Be5MenuItem      from './components/be5Menu/Be5MenuItem.js';
import HelpInfo         from './components/HelpInfo.js';
import LanguageSelector from './components/LanguageSelector.js';
import SideBar          from './components/SideBar.js';
import Sorter           from './components/Sorter.js';
import StaticPage       from './components/StaticPage.js';
import ErrorPane        from './components/ErrorPane.js';
import TreeMenu         from './components/TreeMenu.js';
import FormWizard       from './components/FormWizard.js';
import Navs             from './components/Navs.js';
import Be5Components    from './components/Be5Components.js';
import RoleSelector     from './components/RoleSelector.js';
import UserControl   from './components/UserControl.js';

import Document         from './containers/Document.js';
import UserControlContainer from './containers/UserControlContainer.js';

// forms
import Form               from './components/forms/Form.js';
import SubmitOnChangeForm from './components/forms/SubmitOnChangeForm.js';
import ModalForm          from './components/forms/ModalForm.js';
import InlineForm         from './components/forms/InlineForm.js';
import FinishedResult     from './components/forms/FinishedResult.js';

// tables
import Table           from './components/tables/Table.js';
import QuickColumns    from './components/tables/QuickColumns.js';
import OperationBox    from './components/tables/OperationBox.js';
import FormTable       from './components/tables/FormTable.js';
import TableForm       from './components/tables/TableForm.js';
import TableFormRow    from './components/tables/TableFormRow.js';

// menu
import Menu            from './components/menu/Menu.js';
import MenuBody        from './components/menu/MenuBody.js';
import MenuSearchField from './components/menu/MenuSearchField.js';
import MenuFooter      from './components/menu/MenuFooter.js';
import MenuNode        from './components/menu/MenuNode.js';

// actions
import formAction      from './routes/form.js';
import loadingAction   from './routes/loading.js';
import loginAction     from './routes/login.js';
import logoutAction    from './routes/logout.js';
import queryBuilderAction  from './routes/queryBuilder.js';
import staticAction    from './routes/static.js';
import tableAction     from './routes/table.js';
import textAction      from './routes/text.js';

// services
import action            from './services/actions.js';
import forms             from './services/forms.js';
import tables            from './services/tables.js'


export {
  be5,
  be5init,
  constants,
  preconditions,
  utils,
  documentUtils,

  // core
  bus,
  changeDocument,
  documents,
  routes,

  // components
  Application,
  Be5Components,
  Be5Menu,
  Be5MenuHolder,
  Be5MenuItem,
  HelpInfo,
  LanguageSelector,
  SideBar,
  Sorter,
  StaticPage,
  ErrorPane,
  TreeMenu,
  FormWizard,
  Navs,
  RoleSelector,
  UserControl,

  // containers
  Document,
  UserControlContainer,

  // forms
  Form,
  SubmitOnChangeForm,
  ModalForm,
  InlineForm,
  FinishedResult,

  // tables
  Table,
  QuickColumns,
  OperationBox,
  FormTable,
  TableForm,
  TableFormRow,

  // menu
  Menu,
  MenuBody,
  MenuSearchField,
  MenuFooter,
  MenuNode,

  // actions
  formAction,
  loadingAction,
  loginAction,
  logoutAction,
  queryBuilderAction,
  staticAction,
  tableAction,
  textAction,

  // services
  action,
  forms,
  tables
}