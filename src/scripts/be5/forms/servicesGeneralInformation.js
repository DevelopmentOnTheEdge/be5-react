import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import changeDocument from '../core/changeDocument';

class ServicesGeneralInformation extends React.Component {

  componentDidMount(){
    be5.url.process("table", "#!table/companies/All records");
    be5.url.process("table", "#!table/companies/All records");
  }

  render() {
    return (<div>
      <Document documentName={"table"} />
      <div className="row"><div className="container max-width-970"><div className="row">
        <div className="col-md-12">
          <h1>Документы</h1>
          <div className="alert alert-success alert-dismissible show" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            Заполните сведения о документах, которые требуются при определении права на предоставление услуг.
            Категории документов необходимы для того, чтобы группировать взаимозаменяемые документы, которые
            может предоставить гражданин при обращении за предоставлением услуги.
            По умолчанию для примера добавлены следующе категории документов:
            <ol>
                <li>
                    Категория “Документ, удостоверяющий личность граждан РФ”. К ней относятся следующие документы:
                    <ol className="lower-alpha">
                        <li>Паспорт гражданина РФ</li>
                        <li>Свидетельство о рождении</li>
                        <li>Военный билет</li>
                        <li>Удостоверение личности военнослужащего</li>
                        <li>Иной документ, удостоверяющий личность</li>
                    </ol>
                </li>

                <li>
                    Категория “Документы, подтверждающие доходы”. К ней относятся следующие документы:
                    <ol className="lower-alpha">
                        <li>Справка о заработной плате</li>
                    </ol>
                </li>
            </ol>
          </div>
        </div>
        <div className="col-md-12">
          <p>Для начала создайте категории документов, которые необходимы для предоставления услуг в Вашем муниципалитете.</p>
        </div>


        <div className="row"><div className="col-md-12">
            <div className="col-md-6">
              <div className="property-set row"><div className="form-group property col-md-12 required"><label htmlFor="categorynameField" className="form-control-label">Наименование категории документов</label><div className="controls"><input type="text" id="categorynameField" value="" className="form-control"/></div></div></div>
            </div>
            <div className="col-md-6">
              <label className="form-control-label">&nbsp;</label>
              <button type="button" className="btn btn-primary" >Добавить категорию</button>
            </div>
        </div></div>

        <div className="col-md-12"><p>
            Созайте документы, которые используются при предоставлении услуг в Вашем муниципалитете, если их
            еще нет в общем справочнике документов.
        </p></div>

        <div className="row"><div className="col-md-12">
            <div className="col-md-6">
              <div className="property-set row"><div className="col-md-12"><div></div></div><div className="form-group property col-md-12 required"><label htmlFor="namenewdocumentField" className="form-control-label">Наименование нового документа</label><div className="controls"><input type="text" id="namenewdocumentField" value="" className="form-control"/></div></div></div>
            </div>
            <div className="col-md-6">
              <label className="form-control-label">&nbsp;</label>
              <button type="button" className="btn btn-primary" >Добавить документ</button>
            </div>
        </div></div>

        <div className="col-md-12">
          <Document documentName={"EgissoDocs3"} />
        </div>

        <div className="col-md-12">
          <br/>
          <Document documentName={"EgissoDocs4"} />
        </div>
      </div></div></div>

     </div>);
  }

}

be5.registerAction('servicesGeneralInformation', (documentName) =>{
  changeDocument(documentName, { component: ServicesGeneralInformation, value: {} })
});

export default ServicesGeneralInformation;