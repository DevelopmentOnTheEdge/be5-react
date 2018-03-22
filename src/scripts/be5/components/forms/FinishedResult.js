import React          from 'react';
import PropTypes      from 'prop-types';
import be5            from '../../be5';
import forms          from '../../services/forms';
import {registerDocument} from "../../core/documents";


class FinishedResult extends React.Component
{
  componentDidMount() {
    forms.changeLocationHash(this.props);
  }

  refresh() {
    console.info("FinishedResult not support refresh");
  }

  render() {
    const back = () => { history.back(); };
    const attributes = this.props.value.data.attributes;

    let message = attributes.message;
    if(attributes.status === 'finished' && attributes.message === undefined){
      message = be5.messages.successfullyCompleted;
    }

    return (
      <div className="finishedResult">
        <div dangerouslySetInnerHTML={{__html: message}}/>
      </div>
    );
//    <div className="linkBack">
//              <button className="btn btn-secondary btn-sm" onClick={back}>
//                {be5.messages.back}
//              </button>
//            </div>
  }
}

FinishedResult.propTypes =  {
  value: PropTypes.shape({
    data: PropTypes.shape({
      attributes: PropTypes.object.isRequired,
      meta: PropTypes.shape({
        _ts_: PropTypes.isRequired
      })
    })
  }),
};

registerDocument('operationResult', FinishedResult);

export default FinishedResult;