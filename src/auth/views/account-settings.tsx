import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { AuthLayout } from 'layouts/auth.layout';
import { useAuthState } from 'auth/auth.context';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

import ConnectAccountSteps from './inc/connect-steps';
import AccountSettingsSideBar from './account-settings-sidebar';

const AccountSettings = () => {
  const history = useHistory();
  const location = useLocation();
  const { onboarded } = useAuthState();
  const [finish, setFinish] = useState<boolean>(false);

  const params = new URLSearchParams(location.search);
  const action = params.get('action');

  const isFromNetworth = action === 'addMoreAccount';

  const navigateToNetworth = () => {
    return history.push('/net-worth?from=accountSettings');
  };

  const hasOverlaySteps = () => {
    if (isFromNetworth) {
      return false;
    }
    if (onboarded) {
      return false;
    }

    return true;
  };

  return (
    <AuthLayout>
      <div className='main-table-wrapper'>
        <div className=''>
          <div className='row login-wrapper'>
            <div className='guide-content'>
              <Link to='/'>
                <LogoImg className='icon auth-logo' />
              </Link>

              <div className='auth-left-content'>
                <h1>Three easy steps to get started with Money Minx</h1>
                <ul>
                  <li>Find your accounts</li>
                  <li>Connect it securely to Money Minx</li>
                  <li>Let Money Minx do the rest</li>
                </ul>
                <div className='guide-bottom'>
                  <h2>Serious about security</h2>
                  <div className='guide-icon-wrap'>
                    <span className='locked-icon'>
                      <LoginLockIcon />
                    </span>
                    <p>The security of your information is our top priority</p>
                  </div>
                  <h2>Trusted by investors</h2>
                  <div className='guide-icon-wrap'>
                    <span className='shield-icon'>
                      <LoginShieldIcon />
                    </span>
                    <p>Investors from all over the world are using Money Minx</p>
                  </div>
                </div>
              </div>
            </div>

            <AccountSettingsSideBar setFinish={() => setFinish(true)} />
          </div>
        </div>
        {hasOverlaySteps() ? (
          <ConnectAccountSteps
            isAccountSettings
            onSkip={navigateToNetworth}
            isCompleted={finish}
            onFinish={navigateToNetworth}
          />
        ) : null}
      </div>
    </AuthLayout>
  );
};

export default AccountSettings;
