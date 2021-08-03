import React from 'react';
import logo from './ministrylogo.png';
import { useTranslation, Trans } from 'react-i18next';
import './App.css';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { DatePicker, Dropdown, IDropdownStyles, IDropdownOption } from '@fluentui/react';

var directionPointer = "ltr";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

const lngs = {
  en: { nativeName: 'English' },
  ar: { nativeName: 'عربى' }
};

const stackTokens: IStackTokens = { childrenGap: 20 };

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    let selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
    directionPointer = (selectedLang === 'ar') ? 'rtl' : 'ltr';
  }

  const options: IDropdownOption[] = [{ key: 'low', text: t('message.project_details_form.business_priorities.low') },
  { key: 'medium', text: t('message.project_details_form.business_priorities.medium') },
  { key: 'high', text: t('message.project_details_form.business_priorities.high') }];

  return (
    <div className="App" dir={directionPointer}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div class="App-language">
          <label class="App-lang-label">{t("message.toolbar.language") + ":"}</label>
          <select onChange={changeLanguage}>
            {Object.keys(lngs).map((lng) => (
              <option key={lng} value={lng}>{lngs[lng].nativeName}</option>
            ))}
          </select>
        </div>
        <Stack tokens={stackTokens}>
          <TextField label={t('message.project_details_form.project_name')} placeholder={t('message.project_details_form.project_name') + "..."} />
          <TextField label={t('message.project_details_form.business_unit')} placeholder={t('message.project_details_form.business_unit') + "..."} />
          <DatePicker label={t('message.project_details_form.estimated_start')} ariaLabel={t('message.project_details_form.estimated_start')} placeholder={t('message.project_details_form.estimated_start_ph')} />
          <DatePicker label={t('message.project_details_form.estimated_end')} ariaLabel={t('message.project_details_form.estimated_end')} placeholder={t('message.project_details_form.estimated_end_ph')} />
          <TextField label={t('message.project_details_form.requestor_name')} placeholder={t('message.project_details_form.requestor_name') + "..."} />
          <Dropdown
            label={t('message.project_details_form.business_priority')}
            placeholder={t('message.project_details_form.business_priority_ph')}
            options={options}
            styles={dropdownStyles}
          />
          <PrimaryButton text={t('message.project_details_form.buttons.submit')} />
        </Stack>
      </header>
    </div>
  );
}

export default App;


// i18n translations might still be loaded by the http backend
// use react's Suspense
// export default function App() {
//   return (
//   );
// }