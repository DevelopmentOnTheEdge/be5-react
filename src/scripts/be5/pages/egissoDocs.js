import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import changeDocument from '../core/changeDocument';

class EgissoDocs extends React.Component {

  componentDidMount(){
    be5.url.process("EgissoDocs1", "#!form/categories/All records/Insert");
    be5.url.process("EgissoDocs2", "#!form/docTypes/All records/Insert");
    be5.url.process("EgissoDocs3", "#!form/classifications/All records/Insert");

    be5.url.process("categories", "#!table/categories/All records");
    be5.url.process("docTypes", "#!table/docTypes/All records");
    be5.url.process("classifications", "#!table/classifications/All records");

  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3"><Document documentName={"categories"} /></div>
          <div className="col-md-3"><Document documentName={"docTypes"} /></div>
          <div className="col-md-6"><Document documentName={"classifications"} /></div>
        </div>
      <div className="row">
      <div className="container max-width-970"><div className="row">
        <div className="col-md-12">
          <button className="btn btn-info pull-right btn-sm float-right" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
              Справка
          </button>
          <h1>Документы</h1>
          <div className="collapse" id="collapse1"><div className="alert alert-success" role="alert">
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
          </div></div>
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

      </div></div></div>
      </div>
    );
  }

//        <div className="row"><div className="col-md-12">
//            <div className="col-md-6">
//              <Document documentName={"EgissoDocs1"} />
//            </div>
//            <div className="col-md-6">
//              <button type="button" className="btn btn-primary" >Добавить категорию</button>
//            </div>
//        </div></div>
//        <div className="col-md-12"><p>
//            Созайте документы, которые используются при предоставлении услуг в Вашем муниципалитете, если их
//            еще нет в общем справочнике документов.
//        </p></div>
//        <div className="row"><div className="col-md-12">
//            <div className="col-md-6">
//              <Document documentName={"EgissoDocs2"} />
//            </div>
//            <div className="col-md-6">
//              <button type="button" className="btn btn-primary" >Добавить документ</button>
//            </div>
//        </div></div>
}

be5.registerAction('egissoDocs', (documentName) =>{
  changeDocument(documentName, { component: EgissoDocs, value: {} })
});
