import React, { useState, useRef } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

import AppFooter from 'common/app.footer';
import { Account } from 'auth/auth.types';
import { getCurrencySymbol } from 'common/currency-helper';
import { fNumber, numberWithCommas } from 'common/number.helper';
import { getDate, getMonthYear, getQuarter, getYear } from 'common/moment.helper';
import { getAccountDetails, getAccountHoldings, getAccountActivity } from 'api/request.api';
import { ReactComponent as SettingsGear } from 'assets/icons/icon-settings-gear.svg';
import { ReactComponent as CheckCircle } from 'assets/images/account/check-circle.svg';
import { ReactComponent as CheckCircleGreen } from 'assets/images/account/check-circle-green.svg';

import AccountSubNavigation from './account-sub-navigation';
import AppHeader from '../../common/app.header';
import AccountTable from './account-table';
import ActivityTable from './activity-table';
import AppSidebar from '../../common/app.sidebar';
import AccountBarGraph from './account-bar-graph';
import MMToolTip from '../../common/components/tooltip';
import { AccountChartItem, AccountProps, AccountHolingsProps, AccountTransactionsProps } from '../account.type';
import { ReactComponent as InfoIcon } from '../../assets/images/signup/info.svg';

const AccountDetail: React.FC<AccountProps> = (props) => {

  const [openLeftNav, setOpenLeftNav] = useState<boolean>(false);
  const [openRightNav, setOpenRightNav] = useState<boolean>(false);
  const [AccountDetails, setAccountDetails] = useState<Account>();
  const [AccountHoldings, setAccountHoldings] = useState<AccountHolingsProps>();
  const [AccountActivity, setAccountActivity] = useState<AccountTransactionsProps>();
  const [fromDate, setFromDate] = useState<string>();
  const [toDate, setToDate] = useState<string>();
  const [timeInterval, setTimeInterval] = useState<string>('Monthly');
  const [tableType, setTableType] = useState<string>('holdings');
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const accountId = props.match.params.accountId;
  const dropdownToggle = useRef(null);

  React.useEffect(() => {
    fetchAccountDetails(accountId);
    if ((fromDate === undefined && toDate === undefined) || (fromDate !== undefined && toDate !== undefined && new Date(toDate) >= new Date(fromDate))) {
      if (tableType === 'holdings') fetchAccountHoldings(accountId, fromDate, toDate, timeInterval);
      if (tableType === 'activity') fetchAccountActivity(accountId, fromDate, toDate, timeInterval);
    }
  }, [accountId, fromDate, toDate, timeInterval, tableType]);

  const clickElement = (dropdownToggle: any) => {
    dropdownToggle.current?.click();
  }

  const fetchAccountDetails = async (accountId: string) => {
    const { data, error } = await getAccountDetails(accountId);
    if (!error) {
      console.log('fetchAccountDetails: ', data);
      setAccountDetails(data);
    }
  };

  const fetchAccountHoldings = async (accountId: string, fromDate: any, toDate: any, timeInterval: string) => {
    const { data, error } = await getAccountHoldings({ accountId, fromDate, toDate, timeInterval });
    if (!error) {
      console.log('fetchAccountHoldings: ', data);
      setAccountHoldings(data);
    }
  };

  const fetchAccountActivity = async (accountId: string, fromDate: any, toDate: any, timeInterval: string) => {
    const { data, error } = await getAccountActivity({ accountId, fromDate, toDate, timeInterval });
    if (!error) {
      console.log('fetchAccountActivity: ', data);
      setAccountActivity(data);
    }
  };

  const isCurrent = (interval: string) =>
    getMonthYear() === interval || getYear() === interval || getQuarter() === interval;

  let curAccountHoldingsItem = undefined;
  if (AccountHoldings?.charts) {
    curAccountHoldingsItem = AccountHoldings?.charts.filter((accountChartItem: AccountChartItem) => isCurrent(accountChartItem.interval));
  }

  const onChange = (option: string, date: any) => {
    setFilterOn(true);
    if (option === 'start') {
      setFromDate(getDate(new Date(date)));
      setToDate(getDate(new Date()));
    } else if (option === 'end') {
      setToDate(getDate(new Date(date)));
    }
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOn(true);
    setTimeInterval(event.target.value);
  };

  const clearFilters = () => {
    setFilterOn(false);
    setToDate(undefined);
    setFromDate(undefined);
    setTimeInterval('Monthly');
  }

  return (
    <div className='mm-setting'>
      <AppHeader
        toggleLeftMenu={() => setOpenLeftNav(!openLeftNav)}
        toggleRightMenu={() => setOpenRightNav(!openRightNav)}
        open={openRightNav}
      />
      {AccountDetails && <AccountSubNavigation providerLogo={AccountDetails?.providerLogo} providerName={AccountDetails?.providerName} />}
      <hr className='mt-0 mb-4' />
      <AppSidebar openLeft={openLeftNav} openRight={openRightNav} />
      <div className='mm-account'>
        <div className='mm-account__selection mb-3'>
          <div className='mm-account__selection--info float-lg-left'>
            <SettingsGear className='float-left mr-2 settings-gear-button' />
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
                {filterOn && <button type="button" className="btn btn-outline-danger clear-filter" onClick={clearFilters}>Clear Filters</button>}
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
                        <input type='text' className={['month_year', filterOn ? 'active' : ''].join(' ')} value={getMonthYear(fromDate)} readOnly />
                      </div>
                    </div>
                  }
                />
                <span className={['date-separator', filterOn ? 'active' : ''].join(' ')}>to</span>
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
                        <input type='text' className={['month_year', filterOn ? 'active' : ''].join(' ')} value={getMonthYear(toDate)} readOnly />
                      </div>
                    </div>
                  }
                />
                <Dropdown className={['drop-box m-l-2', filterOn ? 'active' : ''].join(' ')}>
                  <Dropdown.Toggle variant='' ref={dropdownToggle}>
                    {timeInterval}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='mm-dropdown-menu dropsm'>
                    <ul className='radiolist'>
                      {['Yearly', 'Monthly', 'Quarterly'].map((interval, index) => {
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
              </div>
              <div className='mm-account__selection--type'>
                {AccountDetails?.isManual ? (
                  <>
                    <CheckCircle />
                    <span className='manual'>Manual</span>
                  </>
                ) : (
                    <>
                      <CheckCircleGreen />
                      <span className='good'>Good</span>
                    </>
                  )}
              </div>
            </div>

          </div>
        </div>
        <div className='account-ct-box mb-40'>
          <div className='graphbox'>
            <ul>
              {AccountDetails?.category?.mmCategory === 'Investment Assets' &&
                <li className='inv-data'>
                  <span>Value</span>
                  <h3>{getCurrencySymbol(AccountDetails?.accountDetails?.currency)}{curAccountHoldingsItem?.[0]?.value ? numberWithCommas(fNumber(curAccountHoldingsItem?.[0]?.value, 0)) : 0}</h3>
                </li>
              }
              {AccountDetails?.category?.mmCategory === 'Other Assets' &&
                <li className='other-data'>
                  <span>Value</span>
                  <h3>{getCurrencySymbol(AccountDetails?.accountDetails?.currency)}{curAccountHoldingsItem?.[0].value ? numberWithCommas(fNumber(curAccountHoldingsItem?.[0].value, 0)) : 0}</h3>
                </li>
              }
              {AccountDetails?.category?.mmCategory === 'Liabilities' &&
                <li className='lty-data'>
                  <span>Value</span>
                  <h3>{getCurrencySymbol(AccountDetails?.accountDetails?.currency)}{curAccountHoldingsItem?.[0].value ? numberWithCommas(fNumber(curAccountHoldingsItem?.[0].value, 0)) : 0}</h3>
                </li>
              }
            </ul>
            <div className='chartbox'>
              {(AccountHoldings && curAccountHoldingsItem) &&
                <AccountBarGraph data={AccountHoldings?.charts} curInterval={curAccountHoldingsItem?.[0]?.interval} />
              }
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
          {AccountDetails?.isManual && tableType === 'holdings' &&
            <Button variant='primary' className='mb-4 mm-account__btn'>
              Add Position
          </Button>
          }
          {AccountDetails?.isManual && tableType === 'activity' &&
            <Button variant='primary' className='mb-4 mm-account__btn'>
              Add Activity
          </Button>
          }
        </div>
        {(AccountHoldings && tableType === 'holdings') && <AccountTable holdings={AccountHoldings?.holdings} />}

        {tableType === 'activity' &&
          <div className='mm-account-activity-block'>
            <div className='d-flex align-items-center mb-4'>
              <p className='mb-0'>
                To properly calculate performance make sure that all withdrawals and deposits are accurately tracked below
                as Cash Flow
            </p>
              <MMToolTip placement='top'
                message='Performance calculations are coming soon. To ensure proper performance returns please mark cash flow transactions properly.'>
                <InfoIcon className='mt-n1 ml-2' />
              </MMToolTip>
            </div>
            {AccountActivity && <ActivityTable transactions={AccountActivity?.transactions} />}
          </div>
        }

        {/* add activity popup modal section */}
        {/*<div className='mm-add-activity-modal'>
          <div className='row mb-4'>
            <div className='col-md-5'>
              <div className='d-md-flex align-items-baseline'>
                <p className='mr-xl-5 mb-3 mb-md-0'>
                  <span className='d-block d-md-none'>Date</span>04 / 04 / 2020
                </p>
                <Form.Control as='select' className='mr-sm-2' id='inlineFormCustomSelect' custom>
                  <option value='0'>Choose...</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </Form.Control>
                <Form.Control
                  type='text'
                  placeholder='This is a deposit description'
                  className='mm-add-activity-modal__text d-none d-xl-block'
                />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='d-md-flex align-items-baseline justify-content-between mt-3'>
                <p className='mx-xl-5 mb-3 mb-md-0'>
                  <span className='d-block d-md-none'>Amount</span>$10
                </p>
                <p className='mx-xl-5 mb-3 mb-md-0'>
                  <span className='d-block d-md-none'>Balance</span>$231,234
                </p>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='d-md-flex align-items-baseline'>
                <Form.Control as='select' className='mr-sm-2 mb-3 mb-md-0' id='inlineFormCustomSelect' custom>
                  <option value='0'>Choose...</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </Form.Control>
                <Form.Control as='select' className='mr-sm-2' id='inlineFormCustomSelect' custom>
                  <option value='0'>Choose...</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </Form.Control>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-5'>
              <label className='custom-checkbox'>
                <input type='checkbox' value='true' aria-checked='true' />
                <span className='checkmark mm-add-activity-modal__checkmark' />
              </label>
              <span className='mm-add-activity-modal__checkmark--label'>Ignore this transaction</span>
            </div>
            <div className='col-md-3' />
            <div className='col-md-4'>
              <Button className='mm-add-activity-modal__btn w-100 mt-4 mt-md-0' variant='primary'>
                Save Changes
              </Button>
            </div>
          </div>
        </div>*/}
      </div>
      <AppFooter />
    </div >
  );
};

export default AccountDetail;
