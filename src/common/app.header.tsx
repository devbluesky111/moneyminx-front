import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from 'assets/icons/logo.svg';
import LogoIcon from 'assets/icons/money-minx-icon.svg';
import { useAuthState } from 'auth/auth.context';
import { capitalize } from 'common/common-helper';
import GreenBadge from 'assets/badges/green-badge.svg';
import PlusBadge from 'assets/badges/plus-badge.svg';
import ProBadge from 'assets/badges/pro-badge.svg';
import VipBadge from 'assets/badges/vip-badge.svg';
import DefaultAvatar from 'assets/icons/default-avatar.svg';
import { BreakPoint } from 'app/app.constant';

import useGetSubscription from 'auth/hooks/useGetSubscription';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import useSize from './hooks/useSize';

interface AppHeaderProps {
  toggleLeftMenu: () => void;
  toggleRightMenu: () => void;
}
const AppHeader: React.FC<AppHeaderProps> = ({ toggleLeftMenu, toggleRightMenu }) => {
  const { user } = useAuthState();
  const { pathname } = useLocation();
  const { width } = useSize();

  // const { fetchingSubscription, subError, subscription } = useGetSubscription();
  const { currentSubscription } = useCurrentSubscription();
  const { subscription } = useGetSubscription(currentSubscription?.priceId);
  // console.log('subscription', subscription?.details?subscription?.details['No of connected accounts']:'');
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
            onClick={toggleLeftMenu}
          >
            <span className='navbar-toggler-icon' />
          </button>
          <Link to='/net-worth' className='navbar-brand'>
            { width >= BreakPoint.MD ? (<img src={Logo} alt='Money Minx Logo' className='mm-app-nav-logo'/>):(<img src={LogoIcon} alt='Money Minx Icon' className='mm-app-nav-icon'/>)}
          </Link>
          <div className='headtab'>
            <Link to='/net-worth' className={navClass('net-worth')}>
              Net Worth
            </Link>
            <Link to='/allocation' className={navClass('allocation')}>Allocation</Link>
          </div>
          <div className='head-right'>
            {currentSubscription?.subscriptionStatus === 'trialing' || (subscription?.details && subscription?.details['No of connected accounts'] !== 'Unlimited') ? (
              <Link to='/settings?active=Plan' type='button' className='upgrader-btn' data-toggle='modal' data-target='#upgradeModal'>
                Upgrade
              </Link>
            ): null}
            <div className='badge-box'>
              { subscription?.details?.Name === 'Green' || subscription?.details?.Name === 'GREEN' ? (<img src={GreenBadge} alt='Green badge' />):null}
              { subscription?.details?.Name === 'Plus' || subscription?.details?.Name === 'PLUS' ? (<img src={PlusBadge} alt='Plus badge' />):null}
              { subscription?.details?.Name === 'Pro' || subscription?.details?.Name === 'PRO' ? (<img src={ProBadge} alt='Pro badge' />):null}
              { subscription?.details?.Name === 'Vip' || subscription?.details?.Name === 'VIP' ? (<img src={VipBadge} alt='Vip badge' />):null}
            </div>
            <div className='btn-group'>
              <button type='button' className='profile-toggle' onClick={toggleRightMenu}>
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
