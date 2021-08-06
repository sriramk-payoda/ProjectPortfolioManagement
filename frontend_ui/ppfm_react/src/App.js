import React from 'react';
import logo from './ministrylogo.png';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './App.css';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { DatePicker } from '@fluentui/react';
import { Dropdown, IDropdownOption, IDropdownStyles } from '@fluentui/react/lib/Dropdown';

var directionPointer = "ltr";

const dropdownStyles: Partial<IDropdownStyles> = {
  // dropdown: { width: 300 },
};

const lngs = {
  en: { nativeName: 'English' },
  ar: { nativeName: 'عربى' }
};

const stackTokens: IStackTokens = { childrenGap: 20 };

const App: React.FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  var requestorNames = [];
  var selectedRequestorId = null;
  var selectedBusinessPriority = null;

  // const [requestorNameSelectedItem, setSelectedRequestorNameItem] = React.useState<IDropdownOption>();
  const requestorNameOnChange = (event, selectedOption) => {
    selectedRequestorId = selectedOption.key;
  };

  // const [businessPrioritySelectedItem, setSelectedBusinessPriorityItem] = React.useState<IDropdownOption>();
  const businessPriorityOnChange = (event, selectedOption) => {
    selectedBusinessPriority = selectedOption.key;
  };

  const dateToLocalISO = (date) => {
    const off    = date.getTimezoneOffset();
    const absoff = Math.abs(off);
    return (new Date(date.getTime() - off*60*1000).toISOString().substr(0,23));
  }
  

  const changeLanguage = (event) => {
    let selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
    directionPointer = (selectedLang === 'ar') ? 'rtl' : 'ltr';
  }

  const checkFormValidity = (event) => {
    let projectName = document.getElementById("projectName").value;
    let businessUnit = document.getElementById("businessUnit").value;
    let estimatedStart = document.getElementById("estimatedStart-label").value;
    let estimatedEnd = document.getElementById("estimatedEnd-label").value;
    let requestorName = document.getElementById("requestorName-option").textContent;
    let businessPriority = document.getElementById("businessPriority-option").textContent;

    if(requestorName === "Choose a Requestor Name..." || selectedRequestorId == null) {
      selectedRequestorId = null;
    }
    if(businessPriority === "Select a priority..." || selectedBusinessPriority == null) {
      selectedBusinessPriority = null;
    }

    if(projectName !== "" && businessUnit !== "" && estimatedStart !== "" && estimatedEnd !== "" && selectedRequestorId !== null && selectedBusinessPriority !== null) {
      let projectRequestData = {
        "id": "string",
        "projectName": projectName,
        "businessUnit": businessUnit,
        "startDate": estimatedStart,
        "endDate": estimatedEnd,
        "businessPriority": selectedBusinessPriority,
        "requestorId": selectedRequestorId
      };

      axios.post("https://localhost:44388/api/ProjectRequests", projectRequestData, {})
        .then(response => {
          alert("The entries have been recorded successfully!");
          console.log(response);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
    else {
      console.log("Not validated");
      return false;
    }
  }

  const onFormatDate = (date) => {
    return !date ? '' : dateToLocalISO(date);
  };

  const fetchRequestorNames = () => {
    axios.get("https://localhost:44388/api/Requestors")
      .then(res => {
        res.data.forEach(element => {
          requestorNames.push({
            key: element.id,
            text: element.requestorName
          }); 
        });
      });
  }

  const options: IDropdownOption[] = [
    { key: 'low', text: t('message.project_details_form.business_priorities.low') },
    { key: 'medium', text: t('message.project_details_form.business_priorities.medium') },
    { key: 'high', text: t('message.project_details_form.business_priorities.high') }
  ];

  return (
    <div className="App" dir={directionPointer} onLoad={fetchRequestorNames}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-language">
          <label className="App-lang-label">{t("message.toolbar.language") + ":"}</label>
          <select onChange={changeLanguage}>
            {Object.keys(lngs).map((lng) => (
              <option key={lng} value={lng}>{lngs[lng].nativeName}</option>
            ))}
          </select>
        </div>
        <Stack tokens={stackTokens}>
          <TextField
            id="projectName"
            label={t('message.project_details_form.project_name')}
            placeholder={t('message.project_details_form.project_name') + "..."}
          />
          <TextField
            id="businessUnit"
            label={t('message.project_details_form.business_unit')} 
            placeholder={t('message.project_details_form.business_unit') + "..."}
          />
          <DatePicker
            id="estimatedStart"
            formatDate={onFormatDate}
            label={t('message.project_details_form.estimated_start')} 
            ariaLabel={t('message.project_details_form.estimated_start')} 
            placeholder={t('message.project_details_form.estimated_start_ph')} 
          />
          <DatePicker
            id="estimatedEnd"
            formatDate={onFormatDate}
            label={t('message.project_details_form.estimated_end')}
            ariaLabel={t('message.project_details_form.estimated_end')}
            placeholder={t('message.project_details_form.estimated_end_ph')}
          />
          <Dropdown
            id="requestorName"
            label={t('message.project_details_form.requestor_name')}
            onChange={requestorNameOnChange}
            placeholder={t('message.project_details_form.requestor_name_ph')}
            options={requestorNames}
            styles={dropdownStyles}
          />
          <Dropdown
            id="businessPriority"
            label={t('message.project_details_form.business_priority')}
            onChange={businessPriorityOnChange}
            placeholder={t('message.project_details_form.business_priority_ph')}
            options={options}
            styles={dropdownStyles}
          />
          <PrimaryButton
            id="submitButton"
            text={t('message.project_details_form.buttons.submit')}
            onClick={checkFormValidity}
          />
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