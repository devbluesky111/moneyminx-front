import React from 'react';
import { Link } from 'react-router-dom';

export const SettingTitleSection = () => {
  return (
    <div className='mm-setting-title'>
      <ul className='mm-setting-title--list'>
        <li className='mm-setting-title--type active'>
          <Link className='mm-setting-title--link' to="#">
            Settings
          </Link>
        </li>
        <li className='mm-setting-title--type'>
          <Link className='mm-setting-title--link' to="#">
            Profile
          </Link>
        </li>
        <li className='mm-setting-title--type'>
          <Link className='mm-setting-title--link' to="#">
            Plan
          </Link>
        </li>
        <li className='mm-setting-title--type'>
          <Link className='mm-setting-title--link' to="#">
            Accounts
          </Link>
        </li>
        <li className='mm-setting-title--type'>
          <Link className='mm-setting-title--link' to="#">
            Billing
          </Link>
        </li>
        <li className='mm-setting-title--type'>
          <Link className='mm-setting-title--link' to="#">
            Invite
          </Link>
        </li>
      </ul>
      <div className='mm-setting-title--bar'></div>
    </div>
  );
};

export default SettingTitleSection;
