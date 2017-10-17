import React          from 'react';
import be5            from '../be5';
import changeDocument from '../core/changeDocument';
import Navs           from '../components/navs';


class EgissoDocs extends React.Component
{
  //todo move to static page
  // componentDidMount(){
  //
  // }

  help()
  {
    return (
      <div className="">
        <div className="clearfix">
          <h1 className="wizard-page-title">Документы</h1>
          <button className="wizard-page-help btn btn-info btn-sm" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
            Справка
          </button>
        </div>
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
                <li>Загранпаспорт гражданина РФ</li>
                <li>Временное удостоверение личности гражданина РФ</li>
              </ol>
            </li>
            <li>
              Категория “Заявление на предоставление услуги”. К ней относится документ "Заявление на тестовую услугу".
            </li>
          </ol>
        </div></div>
      </div>
    )
  }

  render() {
    const help = this.help();
    const steps = [
      {title: be5.messages.categories__Doc_records, url: '#!table/categories/Doc categories'},
      {title: be5.messages.docTypes__All_records, url: '#!table/docTypes/All records'},
      {title: be5.messages.classifications__All_records, url: '#!table/classifications/All records'}
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
