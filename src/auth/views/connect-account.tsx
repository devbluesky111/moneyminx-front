import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import Zabo from 'zabo-sdk-js';
import appEnv from 'app/app.env';
import MMToolTip from 'common/components/tooltip';
import FastLinkModal from 'yodlee/fast-link.modal';
import useAnalytics from 'common/hooks/useAnalytics';
import useToast from 'common/hooks/useToast';
import UpgradeAccountModal from 'common/upgrade-account.modal';
import { events } from '@mm/data/event-list';
import { AuthLayout } from 'layouts/auth.layout';
import { getAccount, getCurrentSubscription, getFastlink, getSubscription } from 'api/request.api';
import { useAuthState } from 'auth/auth.context';
import { useModal } from 'common/components/modal';
import { FastLinkOptionsType } from 'yodlee/yodlee.type';
import { appRouteConstants } from 'app/app-route.constant';
import { ReactComponent as LogoImg } from 'assets/icons/logo.svg';
// import { ReactComponent as ZillowIcon } from 'assets/images/signup/zillow.svg';
import { ReactComponent as LoginLockIcon } from 'assets/images/login/lock-icon.svg';
import { ReactComponent as LoginShieldIcon } from 'assets/images/login/shield-icon.svg';
import { pricingDetailConstant } from 'common/common.constant';

import ConnectAccountSteps from './inc/connect-steps';
import ManualAccountModal from './inc/manual-account.modal';
import AppHeader from '../../common/app.header';
import AppSidebar from '../../common/app.sidebar';

const config = {
  clientId: appEnv.ZABO_CONFIGURATION.ZABO_CLIENT_ID,
  env: appEnv.ZABO_CONFIGURATION.ZABO_ENV,
};

const ConnectAccount = () => {
  const { onboarded } = useAuthState();
  const [openRightNav, setOpenRightNav] = useState<boolean>(false);
  const [openLeftNav, setOpenLeftNav] = useState<boolean>(false);

  const closeRightNav = () => {
    setOpenRightNav(false);
  }

  return (
    <AuthLayout>
      {onboarded ?
        <AppHeader
        toggleLeftMenu={() => setOpenLeftNav(!openLeftNav)}
        toggleRightMenu={() => setOpenRightNav(!openRightNav)}
        open={openRightNav}
      /> : null}
      <AppSidebar openLeft={openLeftNav} openRight={openRightNav} />
      <div className='mm-slider-bg-overlay' onClick={closeRightNav} />
      <ConnectAccountMainSection />
    </AuthLayout>
  );
};
export default ConnectAccount;
export const ConnectAccountMainSection = () => {
  const location = useLocation();
  const { mmToast } = useToast();
  const { event } = useAnalytics();
  const { onboarded } = useAuthState();
  const manualAccountModal = useModal();
  const [zabo, setZabo] = useState<Record<string, () => Record<string, any>>>({});
  const [fastLinkOptions, setFastLinkOptions] = useState<FastLinkOptionsType>({ fastLinkURL: '', token: { tokenType: 'AccessToken', tokenValue: '' }, config: { flow: '', configName: 'Aggregation', providerAccountId: 0 } })
  const [availableNumber, setAvailableNumber] = useState<number>(0);
  const [manualMax, setManualMax] = useState<boolean>(false);
  const upgradeAccountModal = useModal();
  const [autoLoading, setAutoLoading] = useState<boolean>(false);
  const [manualLoading, setManualLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeZabo = async () => {
      const zaboConfig = await Zabo.init(config);
      setZabo(zaboConfig);
    };
    initializeZabo();
  }, []);

  const fastlinkModal = useModal();
  const history = useHistory();

  const handleConnectAccount = async () => {
    const { data, error } = await getFastlink();

    if (error) {
      return mmToast('Error Occurred to Get Fastlink', { type: 'error' });;
    }

    const fastLinkOptions: FastLinkOptionsType = {
      fastLinkURL: data.fastLinkUrl,
      token: data.accessToken,
      config: data.params
    };

    setFastLinkOptions(fastLinkOptions);

    event(events.connectAccount);

    return fastlinkModal.open();
  };

  const checkConnectedAccountLimit = async () => {
    setAutoLoading(true);
    const { data } = await getCurrentSubscription();
    if (data?.subscriptionStatus === 'active' || data?.subscriptionStatus === 'trialing') {
      const accounts = await getAccount();
      const autoAccounts = accounts?.data?.filter(
        (account: Record<string, string>) => !account.isManual
      ).length;
      const subscriptionDetails = await getSubscription({ priceId: data.priceId });
      let autoLimit = subscriptionDetails?.data?.details[pricingDetailConstant.CONNECTED_ACCOUNT];
      if (autoLimit === 'Unlimited') autoLimit = 100;
      if (autoAccounts < autoLimit) {
        setAutoLoading(false);
        return handleConnectAccount();
      } else {
        setAvailableNumber(autoLimit);
        setAutoLoading(false)
        return upgradeAccountModal.open();
      }
    }
    setAutoLoading(false);
    return history.push(appRouteConstants.subscription.SUBSCRIPTION);
  }

  const checkManualAccountLimit = async () => {
    setManualLoading(true);
    const { data } = await getCurrentSubscription();
    if (data?.subscriptionStatus === 'active' || data?.subscriptionStatus === 'trialing') {
      const accounts = await getAccount();
      const manualAccounts = accounts?.data?.filter(
        (account: Record<string, string>) => account.isManual
      ).length;
      const subscriptionDetails = await getSubscription({ priceId: data.priceId });
      let manualLimit = subscriptionDetails?.data?.details[pricingDetailConstant.MANUAL_ACCOUNT];
      if (manualLimit === 'Unlimited') manualLimit = 100;
      if (manualAccounts < manualLimit) {
        setManualLoading(false);
        return handleManualAccount();
      } else {
        setManualLoading(false);
        setManualMax(true);
        return upgradeAccountModal.open();
      }
    }
    setManualLoading(false);
    return history.push(appRouteConstants.subscription.SUBSCRIPTION);
  }

  const handleManualAccount = () => {
    event(events.manualConnectAccount);

    return manualAccountModal.open();
  };
  // eslint-disable-next-line
  const handleCryptoExchange = () => {
    event(events.cryptoExchange);

    zabo
      .connect()
      .onConnection((account: Record<string, string>) => {
        // Todo On Connection implementation
        // tslint:disable-next-line:no-console
        console.log('account connected:', account);
      })
      .onError((errorOnConnection: Record<string, string>) => {
        // Todo OnError implementation
      })
      .onEvent((eventName: Record<string, string>, metadata: Record<string, string>) => {
        // Todo On each event implementation
        // tslint:disable-next-line:no-console
        console.info(`[EVENT] ${eventName}`, metadata);
      });
  };

  const handleConnectAccountSuccess = () => {
    location.pathname = appRouteConstants.auth.ACCOUNT_SETTING;

    return history.push(location);
  };

  return (
    <div className='main-table-wrapper'>
      <div>
        <div className='row login-wrapper'>
          <div className='guide-content'>
            {!onboarded ? <Link to='/net-worth'>
              <LogoImg className='icon auth-logo' />
            </Link> : null}
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
          <div className='bg-white credentials-wrapper connect-wrap'>
            <div className='credentials-content connect-account'>
              <div className='logo-img-wrapper'>
                <LogoImg className='auth-logo' />
              </div>
              <h2>Connect accounts</h2>
              <p>
                We partnered with financial technology industry veterans, to facilitate aggregation of your accounts.
                Your account credentials are never shared with Money Minx.
              </p>
              <div className='connect-account-buttons'>
                <button
                  className='connect-account-btn mm-btn-primary mm-btn-animate d-flex align-items-center justify-content-center'
                  type='button'
                  onClick={checkConnectedAccountLimit}
                >
                  {autoLoading && <span className='spinner-grow spinner-grow-sm mr-2' role='status' aria-hidden='true' />}
                  Add Banks and Investments
                </button>
                <MMToolTip
                  placement='top'
                  message='Stay tuned, crypto accounts are almost ready.'
                >
                  <button
                    className='connect-account-btn mm-btn-primary mm-btn-animate mm-btn-crypto'
                    type='button'
                  /*onClick={handleCryptoExchange}*/
                  >
                    Add Crypto Exchanges
                  </button>
                </MMToolTip>
                <span className='badge badge-pill badge-primary mm-coming-soon'>Coming Soon!</span>
              </div>
              <div className='manual-account-section'>
                <h2>
                  <span className='manual-heading'>Add a manual account instead</span>
                </h2>
                <p>
                  If your financial institution is not supported or if you want to track a non traditional asset or
                  liability you can add the details manually.
                </p>
                <button
                  className='connect-account-btn btn-outline-primary mm-btn-animate d-flex align-items-center justify-content-center'
                  type='submit'
                  onClick={checkManualAccountLimit}
                >
                  {manualLoading && <span className='spinner-grow spinner-grow-sm mr-2' role='status' aria-hidden='true' />}
                  Add Manual Account
                </button>
                {/*<h2>
                  <span className='manual-heading'>Add real estate</span>
                </h2>
                <div className='zillow-wrap d-block d-md-flex'>
                  <button className='connect-account-btn btn-outline-primary mm-btn-animate' type='submit'>
                    Add Real Estate
                  </button>
                  <span className='zillow-img'>
                    <ZillowIcon className='mt-2' />
                  </span>
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ManualAccountModal manualAccountModal={manualAccountModal} />
      {!onboarded ? <ConnectAccountSteps isConnectAccount /> : null}
      <FastLinkModal
        fastLinkModal={fastlinkModal}
        fastLinkOptions={fastLinkOptions}
        handleSuccess={handleConnectAccountSuccess}
      />
      {(availableNumber || manualMax) && <UpgradeAccountModal upgradeAccountModal={upgradeAccountModal} availableNumber={availableNumber} manualMax={manualMax} />}
    </div>
  );
};
