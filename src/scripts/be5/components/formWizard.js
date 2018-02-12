import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import classNames           from 'classnames';
import be5                  from '../be5';
import Document             from './document';

class FormWizard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compState: this.props.startAtStep,
      navState: this.getNavStates(this.props.startAtStep, this.props.steps.length),
    };

    this.hidden = {
      display: 'none'
    };

    // if user did not give a custom nextTextOnFinalActionStep, the nextButtonText becomes the default
    this.nextTextOnFinalActionStep = (this.props.nextTextOnFinalActionStep) ? this.props.nextTextOnFinalActionStep : this.props.nextButtonText;

    //this.applyValidationFlagsToSteps();
  }

  componentDidMount(){
    this.setState(this.getPrevNextBtnState(this.props.startAtStep));
    be5.url.process(this.props.documentName, this.props.steps[this.state.compState].url);
  }

  // update the header nav states via classes so they can be styled via css
  getNavStates(indx, length) {
    let styles = [];
    for (let i = 0; i<length; i++) {
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

    return { current: indx, styles }
  }

  getPrevNextBtnState(currentStep) {
    // first set default values
    let showPreviousBtn = true;
    let showNextBtn = true;
    let nextStepText = this.props.nextButtonText;

    // first step hide previous btn
    if (currentStep === 0) {
      showPreviousBtn = false;
    }

    // second to last step change next btn text if supplied as props
    if (currentStep === this.props.steps.length - 2 ) {
      nextStepText = this.props.nextTextOnFinalActionStep || nextStepText;
    }

    // last step hide next btn, hide previous btn if supplied as props
    if (currentStep >= this.props.steps.length - 1) {
      showNextBtn = false;
      showPreviousBtn = this.props.prevBtnOnLastStep === false ? false : true;
    }

    return {
      showPreviousBtn,
      showNextBtn,
      nextStepText
    };

  }

  // which step are we in?
  checkNavState(currentStep) {
    this.setState(this.getPrevNextBtnState(currentStep));
  }

  // set the nav state
  setNavState(next) {
    this.setState({navState: this.getNavStates(next, this.props.steps.length)});

    if (next < this.props.steps.length) {
      this.setState({compState: next});
    }

    be5.url.process(this.props.documentName, this.props.steps[next].url);

    this.checkNavState(next);
  }

  // handles keydown on enter being pressed in any Child component input area. in this case it goes to the next (ignore textareas as they should allow line breaks)
  handleKeyDown(evt) {
    if (evt.which === 13) {
      if (!this.props.preventEnterSubmission && evt.target.type !== 'textarea') {
        this.next();
      }
      else if (evt.target.type !== 'textarea') {
        evt.preventDefault();
      }
    }
  }

  // this utility method lets Child components invoke a direct jump to another step
  jumpToStep(evt) {
    //if (evt.target == undefined) {
      // a child step wants to invoke a jump between steps. in this case 'evt' is the numeric step number and not the JS event
      this.setNavState(evt);
    //}
//    else { // the main navigation step ui is invoking a jump between steps
//      if (!this.props.stepsNavigation || evt.target.value == this.state.compState) { // if stepsNavigation is turned off or user clicked on existing step again (on step 2 and clicked on 2 again) then ignore
//        evt.preventDefault();
//        evt.stopPropagation();
//
//        return;
//      }
//
//      evt.persist(); // evt is a react event so we need to persist it as we deal with aync promises which nullifies these events (https://facebook.github.io/react/docs/events.html#event-pooling)
//
//      const movingBack = evt.target.value < this.state.compState; // are we trying to move back or front?
//      let passThroughStepsNotValid = false; // if we are jumping forward, only allow that if inbetween steps are all validated. This flag informs the logic...
//      let proceed = false; // flag on if we should move on
//
//      this.abstractStepMoveAllowedToPromise(movingBack)
//        .then((valid = true) => { // validation was a success (promise or sync validation). In it was a Promise's resolve() then proceed will be undefined, so make it true. Or else 'proceed' will carry the true/false value from sync v
//          proceed = valid;
//
//          if (!movingBack) {
//            this.updateStepValidationFlag(proceed);
//          }
//
//          if (proceed) {
//            if (!movingBack) {
//              // looks like we are moving forward, 'reduce' a new array of step>validated values we need to check and 'some' that to get a decision on if we should allow moving forward
//              passThroughStepsNotValid = this.props.steps
//                .reduce((a, c, i) => {
//                  if (i >= this.state.compState && i < evt.target.value) {
//                    a.push(c.validated);
//                  }
//                  return a;
//                }, [])
//                .some((c) => {
//                  return c === false
//                })
//            }
//          }
//        })
//        .catch((e) => {
//          // Promise based validation was a fail (i.e reject())
//          if (!movingBack) {
//            this.updateStepValidationFlag(false);
//          }
//        })
//        .then(() => {
//          // this is like finally(), executes if error no no error
//          if (proceed && !passThroughStepsNotValid) {
//            if (evt.target.value === (this.props.steps.length - 1) &&
//              this.state.compState === (this.props.steps.length - 1)) {
//                this.setNavState(this.props.steps.length);
//            }
//            else {
//              this.setNavState(evt.target.value);
//            }
//          }
//        })
//        .catch(e => {
//          if (e) {
//            // see note below called "CatchRethrowing"
//            // ... plus the finally then() above is what throws the JS Error so we need to catch that here specifically
//            setTimeout(function() { throw e; });
//          }
//        });
//    }
  }

  // move next via next button
  next() {
    if (this.state.compState + 1 < this.props.steps.length) {
      this.setNavState(this.state.compState + 1);
    }
//    this.abstractStepMoveAllowedToPromise()
//      .then((proceed = true) => {
//        // validation was a success (promise or sync validation). In it was a Promise's resolve() then proceed will be undefined, so make it true. Or else 'proceed' will carry the true/false value from sync validation
//        this.updateStepValidationFlag(proceed);
//
//        if (proceed) {
//          this.setNavState(this.state.compState + 1);
//        }
//      })
//      .catch((e) => {
//        if (e) {
//          // CatchRethrowing: as we wrap StepMoveAllowed() to resolve as a Promise, the then() is invoked and the next React Component is loaded.
//          // ... during the render, if there are JS errors thrown (e.g. ReferenceError) it gets swallowed by the Promise library and comes in here (catch)
//          // ... so we need to rethrow it outside the execution stack so it behaves like a notmal JS error (i.e. halts and prints to console)
//          //
//          setTimeout(function() { throw e; });
//        }
//
//        // Promise based validation was a fail (i.e reject())
//        this.updateStepValidationFlag(false);
//      });
  }

  // move behind via previous button
  previous() {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1);
    }
  }

  // update step's validation flag
//  updateStepValidationFlag(val = true) {
//    this.props.steps[this.state.compState].validated = val; // note: if a step component returns 'underfined' then treat as "true".
//  }

  // are we allowed to move forward? via the next button or via jumpToStep?
//  stepMoveAllowed(skipValidationExecution = false) {
//    let proceed = false;
//
//    if (this.props.dontValidate) {
//      proceed = true;
//    }
//    else {
//      if (skipValidationExecution) {
//        // we are moving backwards in steps, in this case dont validate as it means the user is not commiting to "save"
//        proceed = true;
//      }
//      else if (this.isStepAtIndexHOCValidationBased(this.state.compState)) {
//        // the user is using a higer order component (HOC) for validation (e.g react-validation-mixin), this wraps the StepZilla steps as a HOC,
//        // so use hocValidationAppliedTo to determine if this step needs the aync validation as per react-validation-mixin interface
//        proceed = this.refs.activeComponent.refs.component.isValidated();
//      }
//      else if (Object.keys(this.refs).length == 0 || typeof this.refs.activeComponent.isValidated == 'undefined') {
//        // if its a form component, it should have implemeted a public isValidated class (also pure componenets wont even have refs - i.e. a empty object). If not then continue
//        proceed = true;
//      }
//      else {
//        // user is moving forward in steps, invoke validation as its available
//        proceed = this.refs.activeComponent.isValidated();
//      }
//    }
//
//    return proceed;
//  }

//  isStepAtIndexHOCValidationBased(stepIndex) {
//    return (this.props.hocValidationAppliedTo.length > 0 && this.props.hocValidationAppliedTo.indexOf(stepIndex) > -1);
//  }

  // a validation method is each step can be sync or async (Promise based), this utility abstracts the wrapper stepMoveAllowed to be Promise driven regardless of validation return type
//  abstractStepMoveAllowedToPromise(movingBack) {
//    return Promise.resolve(this.stepMoveAllowed(movingBack));
//  }

  // get the classname of steps
  getClassName(className, i){
    let liClassName = className + "-" + this.state.navState.styles[i];

    // if step ui based navigation is disabled, then dont highlight step
    if (!this.props.stepsNavigation)
        liClassName += " no-hl";

    return liClassName;
  }

  // render the steps as stepsNavigation
  renderSteps() {
    return this.props.steps.map((s, i)=> (
      <li className={this.getClassName("progtrckr", i)} onClick={() => this.jumpToStep(i)} key={i} value={i}>
          <em>{i+1}</em>
          <span dangerouslySetInnerHTML={{__html: this.props.steps[i].title}}/>
      </li>
      //{this.props.steps[i].name}
    ));
  }

  render() {
    const { props } = this;
    //let compToRender;

    // clone the step component dynamically and tag it as activeComponent so we can validate it on next. also bind the jumpToStep piping method
//    let cloneExtensions = {
//      jumpToStep: (t) => {
//        this.jumpToStep(t);
//      }
//    };

//    const componentPointer = this.props.steps[this.state.compState].component;
//
//    // can only update refs if its a regular React component (not a pure component), so lets check that
//    if (componentPointer instanceof Component || // unit test deteceted that instanceof Component can be in either of these locations so test both (not sure why this is the case)
//        (componentPointer.type && componentPointer.type.prototype instanceof Component)) {
//          cloneExtensions.ref = 'activeComponent';
//    }

    //compToRender = React.cloneElement(componentPointer, cloneExtensions);
//{compToRender}

    return (
      <div className="formWizard" onKeyDown={(evt) => {this.handleKeyDown(evt)}}>
          {
              this.props.showSteps
                  ? <ol className="progtrckr clearfix">
                      {this.renderSteps()}
                  </ol>
              : <span></span>
          }

        <Document frontendParams={{documentName: this.props.documentName}} />

        <br/>
        <div style={this.props.showNavigation ? {} : this.hidden} className="footer-buttons">
          <button
            className={classNames(props.backButtonCls, {disabled: !this.state.showPreviousBtn})}
            onClick={() => {this.previous()}}
            id="prev-button"
          >
            {this.props.backButtonText}
          </button> { }
          <button
            className={classNames(props.nextButtonCls, {disabled: !this.state.showNextBtn})}
            onClick={() => {this.next()}}
            id="next-button"
          >
            {this.state.nextStepText}
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
  preventEnterSubmission: false,
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
  preventEnterSubmission: PropTypes.bool,
  startAtStep: PropTypes.number,
  nextButtonText: PropTypes.string,
  nextButtonCls: PropTypes.string,
  backButtonCls: PropTypes.string,
  backButtonText: PropTypes.string,
  documentName: PropTypes.string
};

export default FormWizard