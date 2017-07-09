import be5 from './be5';
import bus      from './core/bus';
import changeDocument from './core/changeDocument';
import initialize     from './core/initialize';
import App            from './components/application';
export { initialize, App, be5, bus, changeDocument };

import SideBar from './components/sideBar';
import Document from './components/document';
import SplitPane from './components/splitPane';

export { SideBar, Document, SplitPane };
//todo files to reg actions
//export Form            from './actions/form';
//export Table            from './actions/table';
//export Login            from './actions/login';


import Form from './actions/form';
import Table from './actions/table';
import Login from './actions/login';

export { Form, Table, Login };