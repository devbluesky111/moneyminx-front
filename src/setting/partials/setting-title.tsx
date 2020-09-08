import React from 'react';
import { Link } from 'react-router-dom';
import { SettingTitleProps, SettingPageEnum } from 'setting/setting.type';

export const SettingTitleSection: React.FC<SettingTitleProps> = ({ handlePageSelect, pageTitle }) => {
  const tc = (title: SettingPageEnum) =>
    title === pageTitle ? 'mm-setting-title--type active' : 'mm-setting-title--type';

  return (
    <div className='mm-setting-title'>
      <ul className='mm-setting-title--list'>
        <li
          className={tc(SettingPageEnum.SETTINGS)}
          role='button'
          onClick={() => handlePageSelect(SettingPageEnum.SETTINGS)}
        >
          <Link className='mm-setting-title--link' to='#'>
            Settings
          </Link>
        </li>
        <li
          className={tc(SettingPageEnum.PROFILE)}
          role='button'
          onClick={() => handlePageSelect(SettingPageEnum.PROFILE)}
        >
          <Link className='mm-setting-title--link' to='#'>
            Profile
          </Link>
        </li>
        <li className={tc(SettingPageEnum.PLAN)} role='button' onClick={() => handlePageSelect(SettingPageEnum.PLAN)}>
          <Link className='mm-setting-title--link' to='#'>
            Plan
          </Link>
        </li>
        <li
          className={tc(SettingPageEnum.ACCOUNTS)}
          role='button'
          onClick={() => handlePageSelect(SettingPageEnum.ACCOUNTS)}
        >
          <Link className='mm-setting-title--link' to='#'>
            Accounts
          </Link>
        </li>
      </ul>
      <div className='mm-setting-title--bar' />
    </div>
  );
};

export default SettingTitleSection;
