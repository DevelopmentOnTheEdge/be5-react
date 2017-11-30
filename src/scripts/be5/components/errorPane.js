import React          from 'react';
import PropTypes      from 'prop-types';
import be5            from '../be5';
import Document       from '../components/document';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class ErrorPane extends React.Component
{
  constructor(){
    super();
    this.state = {helpCollapse: false};
    this.helpCollapseToggle = this.helpCollapseToggle.bind(this);
  }

  helpCollapseToggle() {
    this.setState({ helpCollapse: !this.state.helpCollapse });
  }

  render() {
    const error = this.props.value.errors ? this.props.value.errors[0] : this.props.value;
    return <div className='errorPane'>
      <h1 className='errorPane__title' >{error.status} - {error.title}</h1>
      <br/>
      {error.code !== undefined ?
        <pre className='errorPane__code' dangerouslySetInnerHTML={ {__html: error.code} }/> : null
      }
      {error.detail !== undefined ?
        <div>
          <Button color="info" className="btn-sm" onClick={this.helpCollapseToggle} style={{ marginBottom: '1rem' }}>
            {be5.messages.details}
          </Button>
          <Collapse isOpen={this.state.helpCollapse}>
            <Card>
              <CardBody>
                <pre className='errorPane__detail' >{error.detail}</pre>
              </CardBody>
            </Card>
          </Collapse>

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