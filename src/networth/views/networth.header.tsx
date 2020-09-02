import React from 'react';
import { Link } from 'react-router-dom';

import Logo from 'assets/icons/logo.svg';
import ProBadge from 'assets/images/networth/pro-badge.svg';
import ProfileAvatar from 'assets/images/networth/profile-avatar.png';

interface NetworthHeaderProps {
  toggleMenu: () => void;
}
const NetworthHeader: React.FC<NetworthHeaderProps> = ({ toggleMenu }) => {
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
          <Link to='/' className='navbar-brand'>
            <img src={Logo} alt='Money Minx logo' />
          </Link>
          <div className='headtab'>
            <Link to='#' className='active'>
              Net Worth
            </Link>
            <Link to='#'>Allocation</Link>
          </div>
          <div className='head-right'>
            <button type='button' className='upgrader-btn' data-toggle='modal' data-target='#upgradeModal'>
              Upgrade
            </button>
            <div className='badge-box'>
              <Link to='#'>
                <img src={ProBadge} alt='Pro badge' />
              </Link>
            </div>
            <div className='btn-group'>
              <button type='button' className='profile-toggle' onClick={toggleMenu}>
                <span>
                  <img src={ProfileAvatar} alt='Profile avatar' />
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
