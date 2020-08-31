import React from 'react';

const NetworthSidebar = () => {
  return (
    <>
      <aside className='profilemenu'>
        <ul className='prlist-up'>
          <li>
            <a href='/abc'>
              <i className='icon-upgrade' /> Upgrade
            </a>
          </li>
        </ul>
        <ul className='prlist-pro'>
          <li>
            <a href='#'>
              <i className='icon-profile'></i> Profile
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='icon-settings'></i> Settings
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='icon-manage-connections'></i> Manage Connections
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='icon-support'></i> Support
            </a>
          </li>
          <li>
            <a href='#'>
              <i className='icon-resource-center'></i> Resource Center
            </a>
          </li>
        </ul>
        <ul className='prlist-log'>
          <li>
            <a href='#'>
              <i className='icon-logout'></i> Logout
            </a>
          </li>
        </ul>
      </aside>
      <aside className='mobmenu collapse' id='headerMenu'>
        <div className='headtab'>
          <a href='#' className='active'>
            Net Worth
          </a>
          <a href='#'>Allocation</a>
        </div>
      </aside>
    </>
  );
};

export default NetworthSidebar;
