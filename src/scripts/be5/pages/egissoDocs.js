import React          from 'react';
import be5                  from '../be5';
import changeDocument from '../core/changeDocument';
import Navs             from '../components/navs';

class EgissoDocs extends React.Component {

  help(){
    return (
      <div className="">
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
    )
  }

  render() {
    const help = this.help();
    const steps = [
      {title: 'Категории документов', url: '#!table/categories/Doc categories'},
      {title: 'Документы', url: '#!table/docTypes/All records'},
      {title: 'Отнесение документов к категориям', url: '#!table/classifications/All records'}
    ];
    return (<div>
      {help}
      <Navs steps={steps} tabs/>
    </div>);
  }

}

be5.registerAction('egissoDocs', (documentName) =>{
  changeDocument(documentName, { component: EgissoDocs, value: {} })
});
