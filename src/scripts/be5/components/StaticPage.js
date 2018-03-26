import React          from 'react';
import PropTypes      from 'prop-types';
import be5            from '../be5';
import {registerDocument} from '../core/documents';


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

  static createValue(title, text)
  {
    return StaticPage.createValue(title, text, {_ts_: new Date().getTime()}, {});
  }

  static createValue(title, text, meta, links)
  {
    return {
      data: {
        type: 'static',
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

StaticPage.propTypes =  {
  value: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.shape({
        title   : PropTypes.string,
        content: PropTypes.string,
      }),
      meta: PropTypes.shape({
        _ts_: PropTypes.isRequired,
      })
    })
  }),
};

registerDocument("static", StaticPage);

export default StaticPage;