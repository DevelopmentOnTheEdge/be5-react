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
    be5.url.process("Addresses1", "#!form/_test_/Test%201D/Addresses");
  }

  render() {
    return (
      <div className="row"><div className="container max-width-970">
        <h1>Организация - Адреса</h1>
        <div className="alert alert-success alert-dismissible show" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <p>Заполните сведения об адресах организации и адресах мест обращения за услугами. <br/>
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

        <Document documentName={"Addresses1"} />
      </div></div>
    );
  }

}

be5.registerAction('addresses', (documentName) =>{
  changeDocument(documentName, { component: Addresses, value: {} })
});
