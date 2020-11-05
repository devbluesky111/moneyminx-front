import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from 'assets/icons/logo.svg';
import { useAuthState } from 'auth/auth.context';
import { capitalize } from 'common/common-helper';
// TODO Badge depends on the plan level
import ProBadge from 'assets/images/networth/pro-badge.svg';
import DefaultAvatar from 'assets/icons/default-avatar.svg';

import useGetSubscription from 'auth/hooks/useGetSubscription';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';

interface AppHeaderProps {
  toggleMenu: () => void;
}
const AppHeader: React.FC<AppHeaderProps> = ({ toggleMenu }) => {
  const { user } = useAuthState();
  const { pathname } = useLocation();

  // const { fetchingSubscription, subError, subscription } = useGetSubscription();
  const { currentSubscription } = useCurrentSubscription();
  const { subscription } = useGetSubscription(currentSubscription?.priceId);
  console.log('subscription', JSON.stringify(subscription?.details));
  const navClass = (label: string) => (pathname.includes(label) ? 'mm-app-nav-item active' : 'mm-app-nav-item');

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
          <Link to='/net-worth' className='navbar-brand'>
            <img src={Logo} alt='Money Minx logo' />
          </Link>
          <div className='headtab'>
            <Link to='/net-worth' className={navClass('net-worth')}>
              Net Worth
            </Link>
            <Link to='/allocation' className={navClass('allocation')}>Allocation</Link>
          </div>
          <div className='head-right'>
            {currentSubscription?.subscriptionStatus === 'trialing' ? (
              <Link to='/settings' type='button' className='upgrader-btn' data-toggle='modal' data-target='#upgradeModal'>
                Upgrade
              </Link>
            ): null}
            <div className='badge-box'>
              <img src={ProBadge} alt='Pro badge' />
            </div>
            <div className='btn-group'>
              <button type='button' className='profile-toggle' onClick={toggleMenu}>
                <span>
                  <img src={user?.picture || DefaultAvatar} alt='Profile avatar' />
                </span>
                <span>{capitalize(user?.firstName || user?.username || 'My Account')}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
