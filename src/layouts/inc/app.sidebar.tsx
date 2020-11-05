import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logout } from 'assets/icons/logout.svg';
import { ReactComponent as Upgrade } from 'assets/icons/upgrade.svg';
import { ReactComponent as Profile } from 'assets/icons/profile.svg';
import { ReactComponent as Support } from 'assets/icons/support.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as ResourceCenter } from 'assets/icons/resource-center.svg';
import { ReactComponent as ManageConnection } from 'assets/icons/manage-connection.svg';

interface AppSidebarProps {
  open: boolean;
}
const AppSidebar: React.FC<AppSidebarProps> = ({ open }) => {
  return (
    <>
      <aside className='profilemenu' style={{ right: open ? 0 : -300 }}>
        <ul className='prlist-up mb-0 mt-2'>
          <li>
            <Link to='/plan'>
              <Upgrade />
              <i className='icon-upgrade' /> Upgrade
            </Link>
          </li>
        </ul>
        <hr className='sidebar-custom-hr' />
        <ul className='prlist-pro mb-0'>
          <li>
            <Link to='/profile'>
              <Profile />
              <i className='icon-profile' />
              Profile
            </Link>
          </li>
          <li>
            <Link to='/settings'>
              <Settings />
              <i className='icon-settings' />
              Settings
            </Link>
          </li>
          <li>
            <Link to='/connections'>
              <ManageConnection />
              <i className='icon-manage-connections' /> Manage Connections
            </Link>
          </li>
          <li>
            <Link to='mailto:hello@moneyminx.com'>
              <Support />
              <i className='icon-support' /> Support
            </Link>
          </li>
          <li>
            <Link to='/blog'>
              <ResourceCenter />
              <i className='icon-resource-center' /> Resource Center
            </Link>
          </li>
        </ul>
        <hr className='sidebar-custom-hr' />
        <ul className='prlist-log mb-0'>
          <li>
            <Link to='#'>
              <Logout />
              <i className='icon-logout' /> Logout
            </Link>
          </li>
        </ul>
      </aside>
      <aside className='mobmenu collapse' id='headerMenu'>
        <div className='headtab'>
          <Link to='#' className='active'>
            Net Worth
          </Link>
          <Link to='#'>Allocation</Link>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
