import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactDatePicker from 'react-datepicker';
import Dropdown from 'react-bootstrap/Dropdown';

import AppFooter from 'common/app.footer';
import { Account } from 'auth/auth.types';
import { fNumber, numberWithCommas } from 'common/number.helper';
import { getMonthYear, getQuarter, getYear } from 'common/moment.helper';
import { getAccountDetails, getAccountHoldings, getAccountActivity } from 'api/request.api';
import { ReactComponent as Info } from 'assets/icons/info.svg';
import { ReactComponent as SettingsGear } from 'assets/icons/icon-settings-gear.svg';
import { ReactComponent as CheckCircle } from 'assets/images/account/check-circle.svg';
import { ReactComponent as CheckCircleGreen } from 'assets/images/account/check-circle-green.svg';

import AccountSubNavigation from './account-sub-navigation';
import AppHeader from '../../common/app.header';
import AccountTable from './account-table';
import ActivityTable from './activity-table';
import AppSidebar from '../../common/app.sidebar';
import AccountBarGraph from './account-bar-graph';
import { AccountItem, AccountProps } from '../account.type';

const AccountDetail: React.FC<AccountProps> = (props: any) => {

  const [openLeftNav, setOpenLeftNav] = useState<boolean>(false);
  const [openRightNav, setOpenRightNav] = useState<boolean>(false);
  const [AccountDetails, setAccountDetails] = useState<Account>();
  const [AccountHoldings, setAccountHoldings] = useState<any>();
  const [AccountActivity, setAccountActivity] = useState<any>();
  const [tableType, setTableType] = useState<string>('holdings');
  const accountId = props.match.params.accountId;

  const fetchAccountDetails = async (accountId: string) => {
    const { data, error } = await getAccountDetails(accountId);
    if (!error) {
      console.log('fetchAccountDetails: ', data);
      setAccountDetails(data);
    }
  };
  const fetchAccountHoldings = async (accountId: string) => {
    const { data, error } = await getAccountHoldings(accountId);
    if (!error) {
      console.log('fetchAccountHoldings: ', data);
      setAccountHoldings(data);
    }
  };

  const fetchAccountActivity = async (accountId: string) => {
    const { data, error } = await getAccountActivity(accountId);
    if (!error) {
      console.log('fetchAccountActivity: ', data);
      setAccountActivity(data);
    }
  };

  React.useEffect(() => {
    fetchAccountDetails(accountId);
    fetchAccountHoldings(accountId);
  }, []);

  const isCurrent = (interval: string) =>
    getMonthYear() === interval || getYear() === interval || getQuarter() === interval;

  let curAccountItem = undefined;
  if (AccountHoldings?.charts) {
    curAccountItem = AccountHoldings?.charts.filter((accountItem: AccountItem) => isCurrent(accountItem.interval));
  }
  // const [curAccountItem] = AccountHoldings?.charts.filter((accountItem: AccountItem) => isCurrent(accountItem.interval));

  return (
    <div className='mm-setting'>
      <AppHeader
        toggleLeftMenu={() => setOpenLeftNav(!openLeftNav)}
        toggleRightMenu={() => setOpenRightNav(!openRightNav)}
        open={openRightNav}
      />
      <AccountSubNavigation />
      <AppSidebar openLeft={openLeftNav} openRight={openRightNav} />
      <div className='mm-account'>
        <div className='mm-account__selection mb-3'>
          <SettingsGear className='float-left mr-3 settings-gear-button' />
          <div className='mm-account__selection--info float-lg-left mr-md-3 d-md-inline-block'>
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
                <ReactDatePicker
                  onChange={(date) => { }}
                  // selectsStart
                  dateFormat='MM/yyyy'
                  showMonthYearPicker
                  minDate={new Date('1900-01-01')}
                  maxDate={new Date()}
                  className='m-l-3'
                  // selectsRange
                  customInput={
                    <div className='drop-box'>
                      <div className='date-box'>
                        <input type='text' className='month_year' />
                      </div>
                    </div>
                  }
                />
                <span className='date-separator'>to</span>
                <ReactDatePicker
                  onChange={(date) => { }}
                  // selectsStart
                  dateFormat='MM/yyyy'
                  maxDate={new Date()}
                  className='m-l-1'
                  // selectsRange
                  customInput={
                    <div className='drop-box'>
                      <div className='date-box'>
                        <input type='text' className='month_year' />
                      </div>
                    </div>
                  }
                />
                <Dropdown className='drop-box m-l-2'>
                  <Dropdown.Toggle variant=''>
                    Monthly
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='mm-dropdown-menu dropsm'>
                    <ul className='radiolist'>
                      {['Yearly', 'Monthly', 'Quarterly'].map((interval, index) => {
                        return (
                          <li key={interval}>
                            <label>
                              <input
                                type='radio'
                                name='m-list'
                                value={interval}
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
        <div className='account-ct-box mb-40'>
          <div className='graphbox'>
            <ul>
              <li className='inv-data'>
                <span>Value</span>
                <h3>${curAccountItem ? numberWithCommas(fNumber(curAccountItem[0].value, 0)) : ''}</h3>
              </li>
            </ul>
            <div className='chartbox'>
              <AccountBarGraph account={AccountHoldings?.charts} />
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
              onClick={(e) => { setTableType('holdings'); fetchAccountHoldings(accountId); }}
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
              onChange={(e) => { setTableType('activity'); fetchAccountActivity(accountId); }}
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
        {tableType === 'holdings' && <AccountTable data={AccountHoldings?.holdings} />}

        {tableType === 'activity' &&
          <div className='mm-account-activity-block'>
            <div className='d-flex align-items-center mb-4'>
              <p className='mb-0'>
                To properly calculate performance make sure that all withdrawals and deposits are accurately tracked below
                as Cash Flow
            </p>
              <div className='ml-2'>
                <Info />
              </div>
            </div>
            <ActivityTable data={AccountActivity?.transactions} />
          </div>
        }

        {/* add activity popup modal section */}
        <div className='mm-add-activity-modal'>
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
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default AccountDetail;
