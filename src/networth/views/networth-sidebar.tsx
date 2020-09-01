import React from 'react';
import { Link } from 'react-router-dom';

const NetworthSidebar = () => {
  return (
    <>
      <aside className='profilemenu'>
        <ul className='prlist-up'>
          <li>
            <Link to='/abc'>
              <i className='icon-upgrade' /> Upgrade
            </Link>
          </li>
        </ul>
        <ul className='prlist-pro'>
          <li>
            <Link to='#'>
              <i className='icon-profile' />
              Profile
            </Link>
          </li>
          <li>
            <Link to='#'>
              <i className='icon-settings' />
              Settings
            </Link>
          </li>
          <li>
            <Link to='#'>
              <i className='icon-manage-connections' /> Manage Connections
            </Link>
          </li>
          <li>
            <Link to='#'>
              <i className='icon-support' /> Support
            </Link>
          </li>
          <li>
            <Link to='#'>
              <i className='icon-resource-center' /> Resource Center
            </Link>
          </li>
        </ul>
        <ul className='prlist-log'>
          <li>
            <Link to='#'>
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

export default NetworthSidebar;
