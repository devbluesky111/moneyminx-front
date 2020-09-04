import React from 'react';
import { SettingsProps } from './setting.type';
import NavBarSection from './inc/setting.header';
import FooterSection from './inc/setting.footer';
import SettingTitleSection from './partials/setting-title';
import SettingOverview from './pages/setting-overview';

const Settings: React.FC<SettingsProps> = () => {
  return (
    <div className='mm-setting'>
      <NavBarSection />
      <div className='mm-setting-container'>
        <SettingTitleSection />
        <SettingOverview />
      </div>
      <FooterSection />
    </div>
  );
};
export default Settings;
