import React, { useState } from 'react';

import NavBarSection from './inc/setting.header';
import FooterSection from './inc/setting.footer';
import PlanOverview from './pages/plan-overview';
import SettingOverview from './pages/setting-overview';
import ProfileOverview from './pages/profile-overview';
import { AccountOverview } from './pages/account-overview';
import SettingTitleSection from './partials/setting-title';
import { SettingsProps, SettingPageEnum } from './setting.type';

const Settings: React.FC<SettingsProps> = () => {
  const [page, setPage] = useState<SettingPageEnum>(SettingPageEnum.ACCOUNTS);

  const handlePageSelect = (pageName: SettingPageEnum) => {
    setPage(pageName);
  };

  const containerClass =
    page === SettingPageEnum.PLAN ? 'mm-setting-container mm-profile-container' : 'mm-setting-container';

  const renderTabContent = () => {
    switch (page) {
      case SettingPageEnum.SETTINGS: {
        return <SettingOverview changeTab={handlePageSelect} />;
      }
      case SettingPageEnum.PROFILE: {
        return <ProfileOverview />;
      }
      case SettingPageEnum.PLAN: {
        return <PlanOverview />;
      }
      case SettingPageEnum.ACCOUNTS: {
        return <AccountOverview />;
      }

      default: {
        return <AccountOverview />;
      }
    }
  };

  return (
    <div className='mm-setting'>
      <NavBarSection />

      <div className={containerClass}>
        <SettingTitleSection handlePageSelect={handlePageSelect} pageTitle={page} />
        {renderTabContent()}
      </div>
      <FooterSection />
    </div>
  );
};
export default Settings;
