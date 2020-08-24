import React, { useEffect } from 'react';
import { AuthLayout } from 'layouts/auth.layout';
import { groupByProviderName } from 'auth/auth.helper';
import { getRefreshedProfile } from 'auth/auth.service';
import { ConnectAccountStepsSection } from './inc/connect-steps';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import { useAuthState, useAuthDispatch } from 'auth/auth.context';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as ChaseLogo } from 'assets/images/signup/chase.svg';

import { ReactComponent as UsBankLogo } from 'assets/images/signup/usbank.svg';
import { ReactComponent as SecurityIcon } from 'assets/images/signup/security.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as WellsFargoLogo } from 'assets/images/signup/wellsfargo.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

import { SapphireFormSection } from '../sapphire-form';

const AccountSetting = () => {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  useEffect(() => {
    if (!user) {
      const getUser = async () => {
        await getRefreshedProfile({ dispatch });
      };
      getUser();
    }
  }, [user, dispatch]);

  return (
    <AuthLayout>
      <AccountSettingMainSection />
    </AuthLayout>
  );
};
export default AccountSetting;
export const AccountSettingMainSection = () => {
  const { user } = useAuthState();

  if (!user) {
    return <CircularSpinner />;
  }

  const groupedUserProfileByAccountName = groupByProviderName(user, 'accountName');
  const accountNames = Object.keys(groupedUserProfileByAccountName);

  return (
    <div className='main-table-wrapper'>
      <div className='mm-container mm-container-final'>
        <div className='row login-wrapper'>
          <div className='guide-content'>
            <div className='logo-img-wrap'>
              <LogoImg />
            </div>
            <h1>
              <span className='block'>Three easy steps to get </span>started with Money Minx
            </h1>
            <ul>
              <li>Find your accounts</li>
              <li>Connect it securely to Money Minx</li>
              <li>Let Money Minx to the rest</li>
            </ul>
            <div className='guide-bottom'>
              <h4>Serious about security</h4>
              <div className='guide-icon-wrap'>
                <span className='locked-icon'>
                  <LoginLockIcon />
                </span>
                <p>The security of your information is our top priority</p>
              </div>
              <h4>Trusted by investors</h4>
              <div className='guide-icon-wrap'>
                <span className='shield-icon'>
                  <LoginShieldIcon />
                </span>
                <p>Investors from all over the world are using Money Minx</p>
              </div>
            </div>
          </div>

          <div className='bg-white credintials-wrapper account-setting'>
            <div className='credintials-content'>
              <div className='logo-img-wrapper'>
                <LogoImg />
              </div>
              <div className='top-content-wrap'>
                <h2>Organize accounts</h2>
                <p>
                  Great! You connected your banks. Now you can organize your accounts to start getting insights into
                  your portfolio. You can leave this step for later.
                </p>
              </div>

              <div className='form-wrap'>
                <ul className='bank-list'>
                  <li>
                    <a href='/account-setting'>
                      <ChaseLogo />
                    </a>
                  </li>
                  <li>
                    <a href='/account-setting'>
                      <WellsFargoLogo />
                    </a>
                  </li>
                  <li>
                    <a href='/account-setting'>
                      <UsBankLogo />
                    </a>
                  </li>
                </ul>

                <div className='form-heading'>
                  <ul className='nav'>
                    {accountNames.map((accountName, index) => {
                      return (
                        <li key={index}>
                          <button className='account-btn'>{accountName}</button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <SapphireFormSection />

                <p className='flex-box learn-more-security'>
                  <SecurityIcon />
                  <a href='/security'>Learn about our security</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConnectAccountStepsSection />
    </div>
  );
};
