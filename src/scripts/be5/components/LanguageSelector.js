import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import be5 from '../be5';
import classNames from 'classnames';
import { fetchMenu, fetchUserInfo, MAIN_DOCUMENT } from "..";

const Language = ({ code, selected, onLanguageClick }) => {
  const handleClick = () => {
    if (!selected) {
      onLanguageClick(code);
    }
  };

  return (
    <div
      className={classNames("language", { selectedLanguage: selected })}
      onClick={handleClick}
    >
      {code}
    </div>
  );
};

Language.propTypes = {
  code: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onLanguageClick: PropTypes.func.isRequired
};

// --- Shared hook for language selector logic ---
function useLanguageSelector() {
  const [data, setData] = useState({ languages: [], selected: '' });

  useEffect(() => {
    if (be5.locale.languages && be5.locale.get()) {
      setData({
        languages: be5.locale.languages,
        selected: be5.locale.get()
      });
    }
  }, []);

  const changeLanguage = useCallback((language) => {
    be5.net.request('languageSelector/select', { language }, (resp) => {
      setData({ selected: resp.selected, languages: resp.languages });
      be5.locale.set(language, resp.messages);

      if (be5.store) {
        be5.store.dispatch(fetchUserInfo());
        be5.store.dispatch(fetchMenu('menu'));
      }
      if (be5.url.get()) {
        be5.url.process({ documentName: MAIN_DOCUMENT }, be5.url.get());
      }
    });
  }, []);

  return { data, changeLanguage };
}

const LanguageList = ({ data, onLanguageClick }) => {
  const selected = data.selected ? data.selected.toUpperCase() : '';
  return (
    <div className="languageList">
      {data.languages.map((language) => (
        <Language
          key={language}
          code={language}
          selected={language.toUpperCase() === selected}
          onLanguageClick={onLanguageClick}
        />
      ))}
    </div>
  );
};

LanguageList.propTypes = {
  data: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string
  }).isRequired,
  onLanguageClick: PropTypes.func.isRequired
};

const LanguageBox = ({ className }) => {
  const { data, changeLanguage } = useLanguageSelector();

  if (!data.languages || data.languages.length <= 1) return null;

  return (
    <div className={classNames('languageBox', className)}>
      <LanguageList data={data} onLanguageClick={changeLanguage} />
    </div>
  );
};

const LanguageDropdown = ({ className }) => {
  const { data, changeLanguage } = useLanguageSelector();
  if (!data.languages || data.languages.length <= 1) return null;

  const selected = data.selected ? data.selected.toUpperCase() : '';

  return (
    <div className={classNames('languageDropdown', className)}>
      <select
        className="form-control"
        name="languages"
        value={selected}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {data.languages.map((language) => (
          <option key={language} value={language.toUpperCase()}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export { LanguageBox, LanguageDropdown };
