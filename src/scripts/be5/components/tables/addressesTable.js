import React              from 'react';
import Document           from '../document';
import TableForm          from './tableForm';
import TablesCollections  from '../../services/tablesCollections';


class AddressesTable extends TableForm
{
  render() {
    return (
      <div>
        <Document documentName={"table"} operationDocumentName={"form"} onChange={this.onChange}/>
        <div className="row"><div className="col-xs-12 max-width-970">
          <button className="btn btn-info pull-right float-right" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
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

          <Document documentName={"form"} onChange={this.onChange} />
        </div></div>
      </div>
    );
  }

}

TablesCollections.registerTable("addressesTable", AddressesTable);