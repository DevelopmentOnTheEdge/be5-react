import React          from 'react';
import PropTypes      from 'prop-types';


class ErrorPane extends React.Component
{
  render() {
    const error = this.props.value.errors[0];
    return <div className='errorPane'>
      <h1 className='errorPane__title' >{error.status} - {error.title}</h1>
      <br/>
      {error.code !== undefined ?
        <pre className='errorPane__code' >
          {error.code}
        </pre> : null
      }
      {error.detail !== undefined ?
        <div>
          <a className="" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Details
          </a>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <pre className='errorPane__detail' >{error.detail}</pre>
            </div>
          </div>
        </div>
        : null}
    </div>;
  }

  // static createValue(title, text)
  // {
  //   const date = new Date().getTime();
  //   return {
  //     data: {
  //       type: 'staticPage',
  //       attributes: {
  //         title: title,
  //         content: text
  //       }
  //     },
  //     meta: {_ts_: date}
  //   }
  // }

}

// StaticPage.defaultProps = {
//   value: ''
// };

// ErrorPane.propTypes =  {
//   value: PropTypes.shape({
//     data: PropTypes.shape({
//       attributes: PropTypes.shape({
//         title   : PropTypes.string.isRequired,
//         content: PropTypes.string.isRequired,
//       }),
//       meta: PropTypes.shape({
//         _ts_: PropTypes.isRequired,
//       })
//     })
//   }),
// };

export default ErrorPane;