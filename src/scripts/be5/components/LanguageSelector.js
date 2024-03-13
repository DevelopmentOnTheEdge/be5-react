import PropTypes from 'prop-types';
import React from 'react';
import be5 from '../be5';
import classNames from 'classnames';
import {fetchMenu, fetchUserInfo, MAIN_DOCUMENT} from "..";

class Language extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  };

  onClick(e) {
    this.props.onLanguageClick(this.props.code);
  };

  render() {
    if (this.props.selected) {
      return (
        <div className={"language selectedLanguage"}>{this.props.code}</div>
      );
    }
    return (
      <div className={"language"} onClick={this.onClick}>{this.props.code}</div>
    );
  }
}

Language.propTypes = {
  onLanguageClick: PropTypes.func.isRequired
};

class LanguageList extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let selected = this.props.data.selected;
    selected = selected ? selected.toUpperCase() : selected;
    const onLanguageClick = this.props.onLanguageClick;
    const languageNodes = this.props.data.languages.map((language) =>
      <Language key={language} code={language} selected={language.toUpperCase() === selected} onLanguageClick={onLanguageClick}/>
    );
    return (
      <div className={"languageList"}>{languageNodes}</div>
    );
  }
}

class LanguageSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: {languages: [], selected: ''}}
    this.changeLanguage = this.changeLanguage.bind(this);
  };

  componentDidMount() {
    if (be5.locale.languages && be5.locale.get()) {
      this.setState({data: {languages: be5.locale.languages, selected: be5.locale.get()}})
    }
  };

  changeLanguage(language) {
    be5.net.request('languageSelector/select', {language: language}, (data) => {
      this.setState({data: {selected: data.selected, languages: data.languages}});
      be5.locale.set(language, data.messages);
      if(be5.store){
        be5.store.dispatch(fetchUserInfo());
        be5.store.dispatch(fetchMenu('menu'));
      }
      if(be5.url.get()){
        be5.url.process({documentName: MAIN_DOCUMENT}, be5.url.get());
      }
    });
  };

}

class LanguageBox extends LanguageSelector {

  constructor(props) {
    super(props);
  };

  render() {
    if (this.state.data && this.state.data.languages.length <= 1) {
      return null;
    }
    return (
        <div className={classNames('languageBox', this.props.className)}>
          <LanguageList data={this.state.data} onLanguageClick={this.changeLanguage}/>
        </div>
    );
  }
}

class LanguageDropdown extends LanguageSelector {

  constructor(props) {
    super(props);
  };

  render() {
    if (this.state.data && this.state.data.languages.length <= 1) {
      return null;
    }
    return (
        <div className={classNames('languageDropdown', this.props.className)}>
          <select className="form-control" name="languages" defaultValue={this.state.data.selected}
                  onChange={e => this.changeLanguage(e.target.value)}>
            {
              this.state.data.languages.map((language) => 
              <option key={language} value={language}> {language} </option>)
            }
          </select>
        </div>
    );
  }
}

export {LanguageBox, LanguageDropdown};
