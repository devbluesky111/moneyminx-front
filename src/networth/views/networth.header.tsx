import React from 'react';
import { Link } from 'react-router-dom';

const NetworthHeader = () => {
  return (
    <header>
      <nav className='navbar navbar-expand-lg money-minx-header'>
        <div className='container'>
          <button
            className='navbar-toggler collapsed'
            type='button'
            data-toggle='collapse'
            data-target='#headerMenu'
            aria-expanded='false'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <a className='navbar-brand' href='#'>
            <img src='../src/assets/images/networth/money-mix-logo.svg' alt='' />
          </a>
          <div className='headtab'>
            <a href='#' className='active'>
              Net Worth
            </a>
            <Link to='/'>Allocation</Link>
          </div>
          <div className='head-right'>
            <button type='button' className='upgrader-btn' data-toggle='modal' data-target='#upgradeModal'>
              Upgrade
            </button>
            <div className='badge-box'>
              <a href='#'>
                <img src='../src/assets/images/networth/pro-badge.svg' alt='' />
              </a>
            </div>
            <div className='btn-group'>
              <button type='button' className='profile-toggle'>
                <span>
                  <img src='../src/assets/images/networth/profile-avatar.png' alt='' />
                </span>
                <span>Amy</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NetworthHeader;
