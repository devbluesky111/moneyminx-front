import React from 'react';
import { SettingsProps } from './setting.type';
import NavBarSection from './inc/setting.header';
import FooterSection from './inc/setting.footer';
import SettingTitleSection from './partials/setting-title';
import SettingOverview from './pages/setting-overview';
// import ProfileOverview from './pages/profile-overview';

const Settings: React.FC<SettingsProps> = () => {
  return (
    <div className='mm-setting'>
      <NavBarSection />
      <div className='mm-setting-container'>
        <SettingTitleSection />
        <SettingOverview />
        {/* <ProfileOverview /> */}
      </div>
      <div className='card mm-setting-card'>
        <div className='card-body text-right'>
          <button type='button' className='btn btn-primary btn-lg mm-button'>
            Save changes
          </button>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};
export default Settings;
