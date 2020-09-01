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
            <span className='navbar-toggler-icon' />
          </button>
          <Link to='#' className='navbar-brand'>
            <img src='../src/assets/images/networth/money-mix-logo.svg' alt='Money Minx logo' />
          </Link>
          <div className='headtab'>
            <Link to='#' className='active'>
              Net Worth
            </Link>
            <Link to='/'>Allocation</Link>
          </div>
          <div className='head-right'>
            <button type='button' className='upgrader-btn' data-toggle='modal' data-target='#upgradeModal'>
              Upgrade
            </button>
            <div className='badge-box'>
              <Link to='#'>
                <img src='../src/assets/images/networth/pro-badge.svg' alt='Pro badge' />
              </Link>
            </div>
            <div className='btn-group'>
              <button type='button' className='profile-toggle'>
                <span>
                  <img src='../src/assets/images/networth/profile-avatar.png' alt='Profile avatar' />
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
