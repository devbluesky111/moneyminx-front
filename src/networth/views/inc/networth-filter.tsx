import moment from 'moment';
import { Dropdown } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import React, { useEffect, useState } from 'react';

import { Account } from 'auth/auth.types';
import { getAccount } from 'api/request.api';
import { getRelativeDate } from 'common/moment.helper';
import { arrGroupBy, enumerateStr } from 'common/common-helper';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { AccountCategory, TimeIntervalEnum } from 'networth/networth.enum';
import { useNetworthDispatch, useNetworthState } from 'networth/networth.context';
import { setFilterAccount, setFilterAccountType, setFilterCategories } from 'networth/networth.actions';

const NetworthFilter = () => {
  const dispatch = useNetworthDispatch();
  const [endDate, setEndDate] = useState<any>(null);
  const [startDate, setStartDate] = useState(new Date());
  const [currentAccount, setCurrentAccount] = useState<Account[]>();

  const { fCategories, fTypes, fAccounts } = useNetworthState();

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      const { data, error } = await getAccount();

      if (!error) {
        setCurrentAccount(data);
      }
    };

    fetchCurrentAccount();
  }, []);

  const onChange = (dates: any) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterCategories(event.target.value));
  };

  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterAccount(+event.target.value));
  };

  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterAccountType(event.target.value));
  };

  if (!currentAccount) {
    return <CircularSpinner />;
  }

  const currentAccountByType = arrGroupBy(currentAccount, 'category.mmAccountType');

  return (
    <div className='row'>
      <div className='col-12'>
        <div className='d-flex dropdowns-holder mb-15 networth-filter-wrapper'>
          <Dropdown className='drop-box'>
            <Dropdown.Toggle className='dropdown-toggle'>All Categories</Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu'>
              <ul className='checkbox-list'>
                {enumerateStr(AccountCategory).map((cat, index) => {
                  return (
                    <li key={index}>
                      <label>
                        <input
                          name='category'
                          type='checkbox'
                          aria-describedby={cat}
                          value={cat}
                          aria-checked={fCategories?.includes(cat)}
                          checked={fCategories?.includes(cat)}
                          onChange={handleCategoryChange}
                        />
                        <span>{cat}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='drop-box tab-hide'>
            <Dropdown.Toggle
              type='button'
              className='dropdown-toggle'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              All Accounts
            </Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu'>
              <div className='dropdown-box'>
                <ul className='success'>
                  {currentAccount.map((account, index) => {
                    return (
                      <li key={account.id}>
                        <label>
                          <input
                            name='accBox'
                            type='checkbox'
                            aria-describedby='Investment assets'
                            value={account.id}
                            aria-checked={fAccounts.includes(account.id)}
                            checked={fAccounts.includes(account.id)}
                            onChange={handleAccountChange}
                          />
                          <span />
                        </label>
                        <div>
                          <h5>{account.accountName}</h5>
                          <span>{getRelativeDate(account.balancesFetchedAt)}</span>
                        </div>
                        <div>${account.balance}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className='drop-box'>
            <Dropdown.Toggle
              type='button'
              className='dropdown-toggle'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              All Types
            </Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu'>
              <ul className='checkbox-list'>
                {Object.keys(currentAccountByType)?.map((accountName, index) => {
                  return (
                    <li key={index}>
                      <label>
                        <input
                          name='types'
                          type='checkbox'
                          aria-describedby={accountName}
                          value={accountName}
                          aria-checked={fTypes?.includes(accountName)}
                          checked={fTypes?.includes(accountName)}
                          onChange={handleAccountTypeChange}
                        />
                        <span>{accountName}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Dropdown.Menu>
          </Dropdown>

          <ReactDatePicker
            selected={startDate}
            onChange={onChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            selectsRange
            customInput={
              <div className='drop-box'>
                <div className='date-box'>
                  <input type='text' className='month_year' placeholder={moment(startDate).format('MMM YYYY')} />
                  <span>-</span>
                  <input type='text' className='month_year' placeholder={moment(endDate).format('MMM YYYY') || ''} />
                </div>
              </div>
            }
          />

          <Dropdown className='drop-box'>
            <Dropdown.Toggle
              type='button'
              className='dropdown-toggle'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Monthly
            </Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu dropsm'>
              <ul className='radiolist'>
                {enumerateStr(TimeIntervalEnum).map((interval, index) => {
                  return (
                    <li key={interval}>
                      <label>
                        <input type='radio' name='m-list' aria-checked={false} value='monthly' />
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
    </div>
  );
};

export default NetworthFilter;
