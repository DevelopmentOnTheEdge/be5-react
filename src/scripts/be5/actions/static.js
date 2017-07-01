import be5            from '../be5';
import React          from 'react';
import changeDocument from '../core/changeDocument';
//import StaticPage from '../components/staticPage';

export default function(page) {
  //console.log("static page:" + page);
  be5.net.request('static/' + page, {}, data => {
    changeDocument({ component: StaticPage, value: data })
  });

};

class StaticPage extends React.Component {

  render() {
    let content = this.props.value.value;
    be5.ui.convertLinks(content);
    return <div className='staticPage' dangerouslySetInnerHTML={ {__html: content} } />;
  }

}