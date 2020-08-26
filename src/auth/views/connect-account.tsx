import React from 'react';
import { AuthLayout } from 'layouts/auth.layout';
import { useModal } from 'common/components/modal';
import FastLinkModal from 'yodlee/fast-link.modal';
import { Link, useHistory } from 'react-router-dom';
import useGetFastlink from 'auth/hooks/useGetFastlink';
import { FastLinkOptionsType } from 'yodlee/yodlee.type';
import { appRouteConstants } from 'app/app-route.constant';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as ZillowIcon } from 'assets/images/signup/zillow.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';

import { ConnectAccountStepsSection } from './inc/connect-steps';

const ConnectAccount = () => {
  return (
    <AuthLayout>
      <ConnectAccountMainSection />
    </AuthLayout>
  );
};
export default ConnectAccount;
export const ConnectAccountMainSection = () => {
  const { error, data, loading } = useGetFastlink();
  const fastlinkModal = useModal();
  const history = useHistory();

  const handleConnectAccount = () => {
    fastlinkModal.open();
  };

  const handleConnectAccountSuccess = () => {
    history.push(appRouteConstants.auth.ACCOUNT_SETTING);
  };

  if (loading || error || !data) {
    return <CircularSpinner />;
  }

  const fastLinkOptions: FastLinkOptionsType = {
    fastLinkURL: data?.fastLinkUrl || '',
    token: data?.accessToken || '',
  };

  return (
    <div className='main-table-wrapper'>
      <div className='mm-container mm-container-final'>
        <div className='row login-wrapper'>
          <div className='guide-content'>
            <Link className='logo-img-wrap' to='/'>
              <LogoImg />
            </Link>
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
          <div className='bg-white credintials-wrapper connect-wrap'>
            <div className='credintials-content connect-account'>
              <div className='logo-img-wrapper'>
                <LogoImg />
              </div>
              <h2>Connect banks</h2>
              <p>
                Money Minx partnered with Yodlee, a financial technology industry veteran, to facilitate aggregation of
                your accounts. Your account details are only stored at Yodlee, not in Money Minx’ database.
              </p>
              <button
                className='connect-account-btn bg-primary mm-btn-primary-outline'
                type='button'
                onClick={handleConnectAccount}
              >
                Connect an Account
              </button>
              <div className='manual-account-section'>
                <h2>
                  <span className='manual-heading'>Add a manual account instead</span>
                </h2>
                <p>
                  For the best experience we highly advice that you start with automated accounts first and then add
                  manual accounts.
                </p>
                <button className='manual-account-btn bg-white' type='submit'>
                  Add Manual Account
                </button>
                <h2>
                  <span className='manual-heading'>Add real estate</span>
                </h2>
                <div className='zillow-wrap'>
                  <button className='manual-account-btn bg-white' type='submit'>
                    Add Real Estate
                  </button>
                  <span className='zillow-img'>
                    <ZillowIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConnectAccountStepsSection />
      <FastLinkModal
        fastLinkModal={fastlinkModal}
        fastLinkOptions={fastLinkOptions}
        handleSuccess={handleConnectAccountSuccess}
      />
    </div>
  );
};
