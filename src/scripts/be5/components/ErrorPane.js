import React from 'react';
import PropTypes from 'prop-types';
import be5 from '../be5';
import {Button, Card, CardBody, Collapse} from 'reactstrap';
import {registerDocument} from "../core/documents";


class Error extends React.Component
{
  constructor(){
    super();
    this.state = {helpCollapse: false};
    this.helpCollapseToggle = this.helpCollapseToggle.bind(this);
  }

  helpCollapseToggle() {
    this.setState({ helpCollapse: !this.state.helpCollapse });
  }

  render(){
    const {
      status,
      title,
      code,
      detail
    } = this.props;

    return <div className='errorPane__error'>
      <h1 className={'errorPane__title errorPane__title_' + status} >{status} - {title}</h1>
      {this.frontendHelp()}
      <br/>
      {code !== undefined ?
        <pre className='errorPane__code' dangerouslySetInnerHTML={ {__html: code} }/> : null
      }
      {detail !== undefined ?
        <div>
          <Button color="info" className="btn-sm" onClick={this.helpCollapseToggle} style={{ marginBottom: '1rem' }}>
            {be5.messages.details}
          </Button>
          <Collapse isOpen={this.state.helpCollapse}>
            <Card>
              <CardBody>
                <pre className='errorPane__detail' >{detail}</pre>
              </CardBody>
            </Card>
          </Collapse>

        </div>
        : null}
    </div>;
  }

  frontendHelp() {
    const {status} = this.props;
    let content;
    if (status === '404' || status === '403')
    {
      if (status === '404') {
        content = <div>
          <a href="#!" className="btn btn-primary">{be5.messages.goToHomepage}</a>
        </div>
      }
      if (status === '403') {
        content = <div>
          <a href="/" className="btn btn-primary">{be5.messages.goToHomepage}</a>
        </div>
      }
      return <div>
        <br/>
        <h6>{content}</h6>
      </div>
    }
    return null;
  }
}

class ErrorPane extends React.Component
{
  render() {
    const errors = this.props.value.errors;

    if(!errors || errors.length === 0){
      return null;
    }

    return <div className='errorPane'>
      {errors.map((error, i) => <Error {...error} key={i} />)}
    </div>;
  }
}

ErrorPane.propTypes =  {
  value: PropTypes.shape({
    errors: PropTypes.array.isRequired,
    meta: PropTypes.shape({
      _ts_: PropTypes.isRequired,
    })
  }),
};

registerDocument("errorPane", ErrorPane);

export default ErrorPane;
