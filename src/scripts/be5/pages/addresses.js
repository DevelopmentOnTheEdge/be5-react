import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import changeDocument from '../core/changeDocument';
import BootstrapModal from '../components/bootstrapModal';


class Addresses extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    be5.url.process("table", "#!table/occupancies/For companies");
    be5.url.process("form", "#!form/_test_/Test%201D/InsertOccupancy");
  }

  render() {
    return (
      <div>
        <Document documentName={"table"} operationDocumentName={"form"}/>
        <div className="row"><div className="col-xs-12 max-width-970">
          <button className="btn btn-info pull-right btn-sm float-right" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
              Справка
          </button>
          <h1>&nbsp;</h1>
          <div className="collapse" id="collapse1">
            <div className="alert alert-success" role="alert">
              <p>Заполните сведения об адресах организации и адресах мест обращения за услугами.<br/>
                 Обязательно необходимо заполнить сведения об адресах следующего типа:</p>
              <ul>
                <li>Юридический адрес</li>
                <li>Фактический адрес</li>
                <li>Место подачи заявлений</li>
              </ul>
              Адресов с типом “Место подачи заявлений” может быть несколько.<br/>
              При создании адреса заполните последовательно поля: Дата начала, Регион, Район (при необходимости), Город (при необходимости), Населенный пункт (при необходимости), Улица, Дом, Квартира.<br/>
              Если в списке домов и квартир нет нужных, добавьте их с помощью операции “Добавить”.<br/>
              Если адреса совпадают, выполните операцию “Копия записи”, изменив только тип адреса.
            </div>
          </div>

          <Document documentName={"form"} onChange={()=>{
            be5.url.process("table", "#!table/occupancies/For companies");
          }} />
        </div></div>
      </div>
    );
  }

}

be5.registerAction('addresses', (documentName) =>{
  changeDocument(documentName, { component: Addresses, value: {} })
});
