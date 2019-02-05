import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Document from '../containers/Document';
import {processHashUrlForDocument} from "../utils/documentUtils";


class FormWizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      compState: this.props.startAtStep,
      navState: this.getNavStates(this.props.startAtStep, this.props.steps.length),
    };

    this.hidden = {
      display: 'none'
    };

    this.nextTextOnFinalActionStep = (this.props.nextTextOnFinalActionStep) ? this.props.nextTextOnFinalActionStep : this.props.nextButtonText;
  }

  componentDidMount() {
    this.init()
  }

  init() {
    this.setState(this.getPrevNextBtnState(this.props.startAtStep));
    processHashUrlForDocument(this.props.steps[this.state.compState].url, this.props.documentName);
  }

  getNavStates(indx, length) {
    let styles = [];
    for (let i = 0; i < length; i++) {
      if (i === indx) {
        styles.push('doing');
      }
      else if (i < indx) {
        styles.push('done');
      }
      else {
        styles.push('todo');
      }
    }

    return {current: indx, styles}
  }

  getPrevNextBtnState(currentStep) {
    let showPreviousBtn = true;
    let showNextBtn = true;
    let nextStepText = this.props.nextButtonText;

    if (currentStep === 0) {
      showPreviousBtn = false;
    }

    if (currentStep === this.props.steps.length - 2) {
      nextStepText = this.props.nextTextOnFinalActionStep || nextStepText;
    }

    if (currentStep >= this.props.steps.length - 1) {
      showNextBtn = false;
      showPreviousBtn = this.props.prevBtnOnLastStep === true;
    }

    return {
      showPreviousBtn,
      showNextBtn,
      nextStepText
    };

  }

  checkNavState(currentStep) {
    this.setState(this.getPrevNextBtnState(currentStep));
  }

  setNavState(next) {
    this.setState({navState: this.getNavStates(next, this.props.steps.length)});

    if (next < this.props.steps.length) {
      this.setState({compState: next});
    }

    processHashUrlForDocument(this.props.steps[next].url, this.props.documentName);

    this.checkNavState(next);
  }

  jumpToStep(evt) {
    this.setNavState(evt);
  }

  next() {
    if (this.state.compState + 1 < this.props.steps.length) {
      this.setNavState(this.state.compState + 1);
    }
  }

  previous() {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1);
    }
  }

  getClassName(className, i) {
    let liClassName = className + "-" + this.state.navState.styles[i];

    // if step ui based navigation is disabled, then dont highlight step
    if (!this.props.stepsNavigation)
      liClassName += " no-hl";

    return liClassName;
  }

  renderSteps() {
    return this.props.steps.map((s, i) => (
      <li className={this.getClassName("progtrckr", i)} onClick={() => this.jumpToStep(i)} key={i} value={i}>
        <em>{i + 1}</em>
        <span dangerouslySetInnerHTML={{__html: this.props.steps[i].title}}/>
      </li>
      //{this.props.steps[i].name}
    ));
  }

  render() {
    const {props, state} = this;

    return (
      <div className="formWizard">
        {
          this.props.showSteps
            ? <ol className="progtrckr clearfix">
              {this.renderSteps()}
            </ol>
            : <span/>
        }

        <Document frontendParams={{documentName: props.documentName}}/>

        <br/>
        <div style={props.showNavigation ? {} : this.hidden} className="footer-buttons">
          <button
            className={classNames(props.backButtonCls, {disabled: !state.showPreviousBtn})}
            onClick={() => {
              this.previous()
            }}
            id="prev-button"
          >
            {props.backButtonText}
          </button>
          {}
          <button
            className={classNames(props.nextButtonCls, {disabled: !state.showNextBtn})}
            onClick={() => {
              this.next()
            }}
            id="next-button"
          >
            {state.nextStepText}
          </button>
        </div>
      </div>
    );
  }
}

FormWizard.defaultProps = {
  showSteps: true,
  showNavigation: true,
  stepsNavigation: true,
  prevBtnOnLastStep: true,
  startAtStep: 0,
  nextButtonText: "Next",
  nextButtonCls: "btn btn-prev btn-primary pull-right",
  backButtonText: "Previous",
  backButtonCls: "btn btn-next btn-primary pull-left",
  documentName: "FormWizard",
};

FormWizard.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })).isRequired,
  showSteps: PropTypes.bool,
  showNavigation: PropTypes.bool,
  stepsNavigation: PropTypes.bool,
  prevBtnOnLastStep: PropTypes.bool,
  startAtStep: PropTypes.number,
  nextButtonText: PropTypes.string,
  nextButtonCls: PropTypes.string,
  backButtonCls: PropTypes.string,
  backButtonText: PropTypes.string,
  documentName: PropTypes.string
};

export default FormWizard
