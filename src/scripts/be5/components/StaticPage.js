import React          from 'react';
import PropTypes      from 'prop-types';
import be5            from '../be5';

class StaticPage extends React.Component
{
  render() {
    const attributes = this.props.value.data.attributes;

    const title = attributes.title ? (<h1 className='staticPage__title' >{attributes.title}</h1>) : null;

    return <div className='staticPage'>
      {title}
      <div className='staticPage__text' dangerouslySetInnerHTML={ {__html: attributes.content} } />
    </div>;
  }

  refresh() {
    if(this.props.value.data.links.self !== undefined) {
      be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.data.links.self);
    }else{
      console.info("staticPage without links.self");
    }
  }

  static createValue(title, text)
  {
    return StaticPage.createValue(title, text, {_ts_: new Date().getTime()}, {});
  }

  static createValue(title, text, meta, links)
  {
    return {
      data: {
        type: 'staticPage',
        attributes: {
          title: title,
          content: text
        }
      },
      meta: meta,
      links: links
    }
  }

}

// StaticPage.defaultProps = {
//   value: ''
// };

StaticPage.propTypes =  {
  value: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.shape({
        title   : PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
      meta: PropTypes.shape({
        _ts_: PropTypes.isRequired,
      })
    })
  }),
};

export default StaticPage;