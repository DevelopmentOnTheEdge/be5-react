import React, {Component}   from 'react';
import PropTypes            from 'prop-types';
import be5                  from '../be5';
import Document             from '../containers/Document';
import { Collapse, Button } from 'reactstrap';
import classnames           from 'classnames';


class HelpInfo extends React.Component
{
  constructor(props){
    super();
    this.state = {isOpen: props.isOpen};

    this.helpCollapseToggle = this.helpCollapseToggle.bind(this);
  }

  componentDidMount(){
    if (this.props.value) {
      be5.url.process(this.props.documentName, "#!" + this.props.value);
    }
  }

  componentDidUpdate(){
    if (this.props.value) {
      be5.url.process(this.props.documentName, "#!" + this.props.value);
    }
  }

  helpCollapseToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    if (this.props.value) {
      return (
        <div className='helpInfo clearfix'>
          <Button color="info" className={classnames('btn-sm', this.props.className)}
                  onClick={this.helpCollapseToggle} >
            {be5.messages.helpInfo}
          </Button>

          <Collapse isOpen={this.state.isOpen} tag={this.props.tag} >
            <div className="alert alert-success max-width-970" role="alert">
              <Document frontendParams={{documentName: this.props.documentName}} />
            </div>
          </Collapse>
        </div>
      )
    } else {
      return null;
    }
  }
}

HelpInfo.propTypes = {
  value: PropTypes.string,
  documentName: PropTypes.string,
  isOpen: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.node,
};

HelpInfo.defaultProps = {
  isOpen: false,
  tag: 'div',
  documentName: "helpInfo",
};

export default HelpInfo;