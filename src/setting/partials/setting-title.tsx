import React from 'react';

export const SettingTitleSection = () => {
  return (
    <div className='mm-setting-title'>
      <ul className='mm-setting-title--list'>
        <li className='mm-setting-title--type active'>
          <a className='mm-setting-title--link' href='#'>
            Settings
          </a>
        </li>
        <li className='mm-setting-title--type'>
          <a className='mm-setting-title--link' href='#'>
            Profile
          </a>
        </li>
        <li className='mm-setting-title--type'>
          <a className='mm-setting-title--link' href='#'>
            Plan
          </a>
        </li>
        <li className='mm-setting-title--type'>
          <a className='mm-setting-title--link' href='#'>
            Accounts
          </a>
        </li>
        <li className='mm-setting-title--type'>
          <a className='mm-setting-title--link' href='#'>
            Billing
          </a>
        </li>
        <li className='mm-setting-title--type'>
          <a className='mm-setting-title--link' href='#'>
            Invite
          </a>
        </li>
      </ul>
      <div className='mm-setting-title--bar'></div>
    </div>
  );
};

export default SettingTitleSection;
