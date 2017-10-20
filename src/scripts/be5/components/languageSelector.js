import PropTypes            from 'prop-types';
import React, { Component } from 'react';
import be5 from '../be5';
 
import '../../../css/languageSelector.css';

class Language extends Component {
  constructor(props) {
    super(props);
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

class LanguageList extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const selected = this.props.data.selected;
    const onLanguageClick = this.props.onLanguageClick;
    const languageNodes = this.props.data.languages.map((language) =>
        <Language key={language} code={language} selected={language == selected} onLanguageClick={onLanguageClick}/>
    );
    return (
      <div className={"languageList"}>{languageNodes}</div>
    );
  }
}

 class LanguageBox extends Component {
  constructor(props) {
    super(props);

    this.state = {data: { languages: [], selected: '' }}
  };

  componentDidMount() {
    this.refresh();
  };
  
  refresh() {
    be5.net.request('languageSelector', {}, function(data) {
        be5.locale.set(data.selected, data.messages);
        this.setState({ data: {selected: data.selected, languages: data.languages} });
      }.bind(this));
  };
  
  changeLanguage(language) {
    be5.net.request('languageSelector/select', { language: language }, function(data) {
        this.setState({ data: {selected: data.selected, languages: data.languages} });
        be5.locale.set(language, data.messages);
      }.bind(this));
  };
  
  render() {
    return (
      <div className={"languageBox"}>
        <LanguageList data={this.state.data} onLanguageClick={this.changeLanguage}/>
      </div>
    );
  }
}

export default LanguageBox;