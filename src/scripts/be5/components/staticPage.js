import React          from 'react';
import PropTypes      from 'prop-types';


class StaticPage extends React.Component
{
  render() {
    const attributes = this.props.value.data.attributes;
    return <div className='staticPage'>
      <h1 className='staticPage__title' >{attributes.title}</h1>
      <div className='staticPage__text' dangerouslySetInnerHTML={ {__html: attributes.content} } />
    </div>;
  }

  static createValue(title, text)
  {
    const date = new Date().getTime();
    return {
      data: {
        type: 'staticPage',
        attributes: {
          title: title,
          content: text
        }
      },
      meta: {_ts_: date}
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