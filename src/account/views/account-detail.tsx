import React, { useState, useRef, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Button, Dropdown } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

import AppFooter from 'common/app.footer';
import AccountSettingsSideBar from 'auth/views/account-settings-sidebar';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import FastLinkModal from 'yodlee/fast-link.modal';
import useGetFastlink from 'auth/hooks/useGetFastlink';
import useAnalytics from 'common/hooks/useAnalytics';
import { Account } from 'auth/auth.types';
import { appRouteConstants } from 'app/app-route.constant';
import { events } from '@mm/data/event-list';
import { enumerateStr } from 'common/common-helper';
import { getCurrencySymbol } from 'common/currency-helper';
import { fNumber, numberWithCommas } from 'common/number.helper';
import { FastLinkOptionsType } from 'yodlee/yodlee.type';
import { getDate, getMonthYear, getQuarter, getRelativeDate, getYear } from 'common/moment.helper';
import { getAccountDetails, getAccountHoldings, getAccountActivity } from 'api/request.api';
import { ReactComponent as SettingsGear } from 'assets/icons/icon-settings-gear.svg';
import { ReactComponent as CheckCircle } from 'assets/images/account/check-circle.svg';
import { ReactComponent as CheckCircleGreen } from 'assets/images/account/check-circle-green.svg';
import { ReactComponent as NotLinked } from 'assets/images/account/Not Linked.svg';
import { ReactComponent as NeedsInfo } from 'assets/images/account/Needs Info.svg';
import { storage } from 'app/app.storage';
import { TimeIntervalEnum } from 'networth/networth.enum';
import { useModal } from 'common/components/modal';

import ActivityDetailsModal from './activity-details.modal';
import ActivityTable from './activity-table';
import AccountTable from './account-table';
import AppHeader from '../../common/app.header';
import AppSidebar from '../../common/app.sidebar';
import AccountBarGraph from './account-bar-graph';
import AccountSubNavigation from './account-sub-navigation';
import MMToolTip from '../../common/components/tooltip';
import HoldingsDetailsModal from './holdings-details.modal';
import { AccountChartItem, AccountHolingsProps, AccountTransactionsProps } from '../account.type';
import { ReactComponent as InfoIcon } from '../../assets/images/signup/info.svg';

const AccountDetail: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { event } = useAnalytics();
  const { data } = useGetFastlink();
  const [openLeftNav, setOpenLeftNav] = useState<boolean>(false);
  const [openRightNav, setOpenRightNav] = useState<boolean>(false);
  const [AccountDetails, setAccountDetails] = useState<Account>();
  const [AccountHoldings, setAccountHoldings] = useState<AccountHolingsProps>();
  const [AccountActivity, setAccountActivity] = useState<AccountTransactionsProps>();
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [timeInterval, setTimeInterval] = useState<string>('Monthly');
  const [tableType, setTableType] = useState<string>('holdings');
  const [dateFromFilterOn, setDateFromFilterOn] = useState<boolean>(false);
  const [dateToFilterOn, setDateToFilterOn] = useState<boolean>(false);
  const [intervalFilterOn, setIntervalFilterOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterloading, setFilterLoading] = useState<boolean>(false);
  const [accSetting, setAccSetting] = useState<boolean>(false);
  const [newPositonModalOpen, setNewPositonModalOpen] = useState<boolean>(false);
  const [editPositonModalOpen, setEditPositonModalOpen] = useState<boolean>(false);
  const [newActivityModalOpen, setNewActivityModalOpen] = useState<boolean>(false);
  const [editActivityModalOpen, setEditActivityModalOpen] = useState<boolean>(false);
  const [baseCurrency, setBaseCurrency] = useState<boolean>(false);
  const [currencySymbol, setCurrencySymbol] = useState<string>('');
  const [popup, setPopup] = useState<boolean>(false);

  const { pathname } = useLocation();
  const accountId = pathname.split('/')[2];
  const dropdownToggle = useRef(null);
  const holdingsDetailsModal = useModal();
  const activityDetailsModal = useModal();
  const fastlinkModal = useModal();

  const fastLinkOptions: FastLinkOptionsType = {
    fastLinkURL: data?.fastLinkUrl || '',
    token: data?.accessToken || '',
  };

  useEffect(() => {
    fetchAccountDetails(accountId, baseCurrency);
    if (
      (fromDate === undefined && toDate === undefined) ||
      (fromDate !== undefined && toDate !== undefined && new Date(toDate) >= new Date(fromDate))
    ) {
      setFilterLoading(true);
      if (tableType === 'holdings') fetchAccountHoldings(accountId, fromDate, toDate, timeInterval, baseCurrency);
      if (tableType === 'activity') fetchAccountActivity(accountId, fromDate, toDate, timeInterval, baseCurrency);
    }
  }, [accountId, fromDate, toDate, timeInterval, tableType, accSetting, newPositonModalOpen, editPositonModalOpen, newActivityModalOpen, editActivityModalOpen, baseCurrency]);

  useEffect(() => {
    if (AccountDetails) {
      setCurrencySymbol(getCurrencySymbol(AccountDetails.currency));
    }
  }, [AccountDetails])

  const handleConnectAccountSuccess = () => {
    location.pathname = appRouteConstants.auth.ACCOUNT_SETTING;

    return history.push(location);
  };

  const handleConnectAccount = () => {
    event(events.connectAccount);

    return fastlinkModal.open();
  };

  const clickElement = (dropdownToggle: any) => {
    dropdownToggle.current?.click();
  };

  const fetchAccountDetails = async (accountId: string, baseCurrency: boolean) => {
    const { data, error } = await getAccountDetails(accountId, baseCurrency);
    if (!error) {
      setAccountDetails(data);
    }
  };

  const fetchAccountHoldings = async (accountId: string, fromDate: any, toDate: any, timeInterval: string, baseCurrency: boolean) => {
    const { data, error } = await getAccountHoldings({ accountId, fromDate, toDate, timeInterval, baseCurrency });
    if (!error) {
      setAccountHoldings(data);
      setLoading(false);
      setFilterLoading(false);
      if (storage.get('isNew').data) {
        setAccSetting(true);
      }
    }
  };

  const fetchAccountActivity = async (accountId: string, fromDate: any, toDate: any, timeInterval: string, baseCurrency: boolean) => {
    const { data, error } = await getAccountActivity({ accountId, fromDate, toDate, timeInterval, baseCurrency });
    if (!error) {
      setAccountActivity(data);
      setFilterLoading(false);
    }
  };

  const isCurrent = (interval: string) =>
    getMonthYear() === interval || getYear() === interval || getQuarter() === interval;

  let curAccountHoldingsItem = undefined;
  if (AccountHoldings?.charts) {
    curAccountHoldingsItem = AccountHoldings?.charts.filter((accountChartItem: AccountChartItem) =>
      isCurrent(accountChartItem.interval)
    );
  }

  const onChange = (option: string, date: any) => {
    if (option === 'start') {
      setDateFromFilterOn(true);
      setFromDate(getDate(new Date(date)));
    } else if (option === 'end') {
      setDateToFilterOn(true);
      setToDate(getDate(new Date(date)));
    }
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntervalFilterOn(true);
    setTimeInterval(event.target.value);
  };

  const clearFilters = () => {
    setDateFromFilterOn(false);
    setDateToFilterOn(false);
    setIntervalFilterOn(false);
    setToDate(undefined);
    setFromDate(undefined);
    setTimeInterval('Monthly');
    setFilterLoading(false);
  };

  const closeSidebar = () => {
    setAccSetting(false);
    storage.clear('isNew');
  }

  const openNewPositonModal = () => {
    setNewPositonModalOpen(true);
    holdingsDetailsModal.open();
  }

  const openNewActivityModal = () => {
    setNewActivityModalOpen(true);
    activityDetailsModal.open();
  }

  return (
    <div className='mm-setting'>
      <aside className='setting-aside' style={{ left: accSetting ? '0' : '-665px' }}>
        <AccountSettingsSideBar closeSidebar={closeSidebar} selectedAccount={AccountDetails} />
      </aside>
      {accSetting && <div className='backdrop' onClick={closeSidebar}></div>}
      <AppHeader
        toggleLeftMenu={() => setOpenLeftNav(!openLeftNav)}
        toggleRightMenu={() => setOpenRightNav(!openRightNav)}
        open={openRightNav}
      />
      {!loading && AccountDetails && (
        <AccountSubNavigation providerLogo={AccountDetails?.providerLogo} providerName={AccountDetails?.providerName} baseCurrency={baseCurrency} toggleBaseCurrency={() => setBaseCurrency(!baseCurrency)} />
      )}
      <hr className='mt-0 mb-4' />
      <AppSidebar openLeft={openLeftNav} openRight={openRightNav} />
      {loading ? (
        <CircularSpinner />
      ) : (
          <div className='content-wrapper'>
            <div className='container'>
              <div className='mm-account'>
                <div className='mm-account__selection mb-3'>
                  <div className='mm-account__selection--info float-lg-left'>
                    <SettingsGear className='float-left mr-2 settings-gear-button' onClick={() => setAccSetting(true)} />
                    <ul>
                      <li>{AccountDetails?.accountName}</li>
                      <li>{AccountDetails?.category?.mmCategory}</li>
                      <li>{AccountDetails?.category?.mmAccountType}</li>
                      {AccountDetails?.category?.mmAccountSubType && <li>{AccountDetails?.category?.mmAccountSubType}</li>}
                      <li>{AccountDetails?.accountDetails?.currency}</li>
                    </ul>
                  </div>
                  <div className='d-md-flex justify-content-between mt-3'>
                    <div className='d-flex'>
                      <div className='dflex-center'>
                        {(dateFromFilterOn || dateToFilterOn || intervalFilterOn) && (
                          <button type='button' className='btn btn-outline-danger clear-filter' onClick={clearFilters}>
                            Clear Filters
                          </button>
                        )}
                        <ReactDatePicker
                          selected={fromDate ? new Date(fromDate) : null}
                          onChange={(date) => onChange('start', date)}
                          // selectsStart
                          startDate={fromDate ? new Date(fromDate) : null}
                          dateFormat='MM/yyyy'
                          showMonthYearPicker
                          minDate={new Date('1900-01-01')}
                          maxDate={new Date()}
                          // selectsRange
                          customInput={
                            <div className='drop-box'>
                              <div className='date-box'>
                                <input
                                  type='text'
                                  className={['month_year', dateFromFilterOn ? 'active' : ''].join(' ')}
                                  value={getMonthYear(fromDate)}
                                  readOnly
                                />
                              </div>
                            </div>
                          }
                        />
                        <span className={['date-separator', dateFromFilterOn && dateToFilterOn ? 'active' : ''].join(' ')}>
                          to
                  </span>
                        <ReactDatePicker
                          selected={toDate ? new Date(toDate) : null}
                          onChange={(date) => onChange('end', date)}
                          // selectsStart
                          startDate={toDate ? new Date(toDate) : null}
                          dateFormat='MM/yyyy'
                          showMonthYearPicker
                          minDate={fromDate ? new Date(fromDate) : null}
                          maxDate={new Date()}
                          className='m-l-1'
                          // selectsRange
                          customInput={
                            <div className='drop-box'>
                              <div className='date-box'>
                                <input
                                  type='text'
                                  className={['month_year', dateToFilterOn ? 'active' : ''].join(' ')}
                                  value={getMonthYear(toDate)}
                                  readOnly
                                />
                              </div>
                            </div>
                          }
                        />
                        <Dropdown className={['drop-box m-l-2', intervalFilterOn ? 'active' : ''].join(' ')}>
                          <Dropdown.Toggle variant='' ref={dropdownToggle}>
                            {timeInterval}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className='mm-dropdown-menu dropsm'>
                            <ul className='radiolist'>
                              {enumerateStr(TimeIntervalEnum).map((interval, index) => {
                                return (
                                  <li key={index}>
                                    <label>
                                      <input
                                        type='radio'
                                        name='m-list'
                                        aria-checked={timeInterval === interval}
                                        value={interval}
                                        checked={timeInterval === interval}
                                        onChange={handleIntervalChange}
                                        onClick={() => clickElement(dropdownToggle)}
                                      />
                                      <span>{interval}</span>
                                    </label>
                                  </li>
                                );
                              })}
                            </ul>
                          </Dropdown.Menu>
                        </Dropdown>
                        {filterloading && <CircularSpinner />}
                      </div>
                      <div className='mm-account__selection--type'>
                        {AccountDetails?.isManual ? (
                          <>
                            <CheckCircle />
                            <span className='manual'>Manual</span>
                          </>
                        ) : (
                            <>
                              {(AccountDetails?.providerAccount?.status === 'LOGIN_IN_PROGRESS' ||
                                AccountDetails?.providerAccount?.status === 'IN_PROGRESS' ||
                                AccountDetails?.providerAccount?.status === 'PARTIAL_SUCCESS' ||
                                AccountDetails?.providerAccount?.status === 'SUCCESS') ?
                                <>
                                  <CheckCircleGreen />
                                  <span className='good'>Good</span>
                                </>
                                : (AccountDetails?.providerAccount?.status === 'USER_INPUT_REQUIRED') ?
                                  <div className='attention-section' onMouseEnter={() => setPopup(true)} onMouseLeave={() => setPopup(false)}>
                                    <NeedsInfo />
                                    <span className='needsInfo'>Needs Info</span>
                                    {popup &&
                                      <Popup AccountDetails={AccountDetails} handleConnectAccount={handleConnectAccount} />
                                    }
                                  </div> : (AccountDetails) ?
                                    <div className='attention-section' onMouseEnter={() => setPopup(true)} onMouseLeave={() => setPopup(false)}>
                                      <NotLinked />
                                      <span className='attention'>Attention</span>
                                      {popup &&
                                        <Popup AccountDetails={AccountDetails} handleConnectAccount={handleConnectAccount} />
                                      }
                                    </div> :
                                    <></>
                              }
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='account-ct-box mb-40'>
                  <div className='graphbox'>
                    <ul>
                      {AccountDetails?.category?.mmCategory === 'Investment Assets' && (
                        <li className='inv-data'>
                          <span>Value</span>
                          <h3>
                            {currencySymbol}
                            {curAccountHoldingsItem?.[0]?.value
                              ? numberWithCommas(fNumber(curAccountHoldingsItem?.[0]?.value, 0))
                              : 0}
                          </h3>
                        </li>
                      )}
                      {AccountDetails?.category?.mmCategory === 'Other Assets' && (
                        <li className='other-data'>
                          <span>Value</span>
                          <h3>
                            {currencySymbol}
                            {curAccountHoldingsItem?.[0].value
                              ? numberWithCommas(fNumber(curAccountHoldingsItem?.[0].value, 0))
                              : 0}
                          </h3>
                        </li>
                      )}
                      {AccountDetails?.category?.mmCategory === 'Liabilities' && (
                        <li className='lty-data'>
                          <span>Value</span>
                          <h3>
                            {currencySymbol}
                            {curAccountHoldingsItem?.[0].value
                              ? numberWithCommas(fNumber(curAccountHoldingsItem?.[0].value, 0))
                              : 0}
                          </h3>
                        </li>
                      )}
                    </ul>
                    <div className='chartbox'>
                      {AccountHoldings && curAccountHoldingsItem && (
                        <AccountBarGraph data={AccountHoldings?.charts} curInterval={curAccountHoldingsItem?.[0]?.interval} currencySymbol={currencySymbol} />
                      )}
                    </div>
                  </div>
                </div>

                <div className='d-flex justify-content-between flex-wrap'>
                  <div className='mm-plan-radios mb-4'>
                    <input
                      type='radio'
                      id='mm-account-holding'
                      value='holdings'
                      name='mm-radio-holding-activity'
                      aria-checked='true'
                      checked={tableType === 'holdings' ? true : false}
                      onChange={(e) => setTableType('holdings')}
                    />
                    <label className='labels' htmlFor='mm-account-holding'>
                      Holdings
              </label>
                    <input
                      type='radio'
                      id='mm-account-activity'
                      value='activity'
                      name='mm-radio-holding-activity'
                      aria-checked='false'
                      checked={tableType === 'activity' ? true : false}
                      onChange={(e) => setTableType('activity')}
                    />
                    <label className='labels' htmlFor='mm-account-activity'>
                      Activity
              </label>
                    <div className='mm-radio-bg' />
                  </div>
                  {AccountDetails?.isManual && tableType === 'holdings' && (
                    <Button variant='primary' className='mb-4 mm-account__btn' onClick={openNewPositonModal}>
                      Add Position
                    </Button>
                  )}
                  {AccountDetails?.isManual && tableType === 'activity' && (
                    <Button variant='primary' className='mb-4 mm-account__btn' onClick={openNewActivityModal}>
                      Add Activity
                    </Button>
                  )}
                </div>
                {AccountHoldings && tableType === 'holdings' && <AccountTable holdingsData={AccountHoldings?.holdings} openEditPositionModalFun={() => setEditPositonModalOpen(true)} closeEditPositionModalFun={() => setEditPositonModalOpen(false)} currencySymbol={currencySymbol} />}

                {tableType === 'activity' && (
                  <div className='mm-account-activity-block'>
                    <div className='d-flex align-items-center mb-4'>
                      <p className='mb-0'>
                        To properly calculate performance make sure that all withdrawals and deposits are accurately tracked
                        below as Cash Flow
                </p>
                      <MMToolTip
                        placement='top'
                        message='Performance calculations are coming soon. To ensure proper performance returns please mark cash flow transactions properly.'
                      >
                        <InfoIcon className='mt-n1 ml-2' />
                      </MMToolTip>
                    </div>
                    {AccountActivity && <ActivityTable transactionsData={AccountActivity?.transactions} openEditActivityModalFun={() => setEditActivityModalOpen(true)} closeEditActivityModalFun={() => setEditActivityModalOpen(false)} currencySymbol={currencySymbol} />}
                  </div>
                )}
                {newPositonModalOpen && <HoldingsDetailsModal holdingsDetailsModal={holdingsDetailsModal} accountId={AccountDetails?.id} closeNewPositionModal={() => setNewPositonModalOpen(false)} currencySymbol={currencySymbol} />}
                {newActivityModalOpen && <ActivityDetailsModal activityDetailsModal={activityDetailsModal} accountId={AccountDetails?.id} closeNewActivityModal={() => setNewActivityModalOpen(false)} currencySymbol={currencySymbol} />}
              </div>
            </div>
          </div>
        )}
      {data &&
        <FastLinkModal
          fastLinkModal={fastlinkModal}
          fastLinkOptions={fastLinkOptions}
          handleSuccess={handleConnectAccountSuccess}
        />}
      {!loading && <AppFooter />}
    </div>
  );
};

export default AccountDetail;

export interface PopupProps {
  AccountDetails: Account;
  handleConnectAccount: () => void;
}

const Popup: React.FC<PopupProps> = ({ AccountDetails, handleConnectAccount }) => {

  return (
    <div className='popup'>
      <span className='pb-2'>Connection Status</span>
      <span className='pb-2'>Last updated {AccountDetails?.providerAccount?.updatedAt ? getRelativeDate(AccountDetails?.providerAccount?.updatedAt.toString()) : getRelativeDate(AccountDetails?.providerAccount?.createdAt.toString())}</span>
      <span className='pt-2 pb-3'>Reauthorize your connection to continue syncing your account</span>
      <button
        type='button'
        className='btn btn-primary'
        onClick={handleConnectAccount}
      >
        Fix Connection
      </button>
    </div>
  )
}
