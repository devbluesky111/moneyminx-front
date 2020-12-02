import { Dropdown } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import React, { useEffect, useState } from 'react';

import { Account } from 'auth/auth.types';
import { getAccount } from 'api/request.api';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { arrGroupBy, enumerateStr, serialize } from 'common/common-helper';
import { AccountCategory, TimeIntervalEnum } from 'networth/networth.enum';
import { getDate, getMonthYear, getRelativeDate, getUTC } from 'common/moment.helper';
import { initialState, useNetworthDispatch, useNetworthState } from 'networth/networth.context';

import {
  clearFilter,
  setFilterToDate,
  setFilterAccount,
  setFilterFromDate,
  setFilterCategories,
  setFilterAccountType,
  setFilterTimeInterval,
} from 'networth/networth.actions';
import { NetworthFilterProps, NetworthState, TFilterKey } from 'networth/networth.type';

const NetworthFilter = (props: NetworthFilterProps) => {
  const dispatch = useNetworthDispatch();
  const [currentAccount, setCurrentAccount] = useState<Account[]>();

  const networthState = useNetworthState();
  const { fCategories, fTypes, fAccounts, fFromDate, fToDate, fTimeInterval, networth } = networthState;

  useEffect(() => {
    const fetchCurrentAccount = async () => {
      const { data, error } = await getAccount();

      if (!error) {
        setCurrentAccount(data);
      }
    };

    fetchCurrentAccount();
  }, []);

  const fromInterval = networth?.[0].interval || '';
  const fromDate = getUTC(fromInterval);

  const onChange = (option: string, date: any) => {
    if (option === 'start') {
      props.handleLoad();

      return dispatch(setFilterFromDate(getDate(getUTC(date))));
    }
    if (option === 'end') {
      if (fFromDate !== undefined && getDate(getUTC(date)) > fFromDate) {
        props.handleLoad();

        return dispatch(setFilterToDate(getDate(getUTC(date))));
      }
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleLoad();

    return dispatch(setFilterCategories(event.target.value));
  };

  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleLoad();

    dispatch(setFilterAccount(+event.target.value));
  };

  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleLoad();

    dispatch(setFilterAccountType(event.target.value));
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleLoad();

    dispatch(setFilterTimeInterval(event.target.value as TimeIntervalEnum));
  };

  if (!currentAccount) {
    return <CircularSpinner />;
  }

  const clearNetworthFilter = () => {
    return dispatch(clearFilter());
  };

  const hasFiltered = () => {
    const filterKey: TFilterKey[] = ['fCategories', 'fTypes', 'fAccounts', 'fToDate', 'fFromDate', 'fTimeInterval'];

    return filterKey.some((key) => isFiltered(key));
  };

  const isFiltered = (key: keyof NetworthState) => {
    if (serialize(networthState[key] as any) !== serialize(initialState[key] as any)) {
      return true;
    }
    return false;
  };

  const fc = (key: keyof NetworthState) => (isFiltered(key) ? 'filtered' : '');

  const currentAccountByType = arrGroupBy(currentAccount, 'category.mmAccountType');

  return (
    <div className='row'>
      <div className='col-12 dropdowns-container'>
        <div className='dflex-center mb-15'>
          {hasFiltered() ? (
            <div className='drop-box clear-filter'>
              <button className='dropdown-toggle' onClick={clearNetworthFilter}>
                Clear Filter
              </button>
            </div>
          ) : null}
          <Dropdown className='drop-box'>
            <Dropdown.Toggle variant='' className={fc('fCategories')}>
              All Categories
            </Dropdown.Toggle>
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
            <Dropdown.Toggle variant='' className={fc('fAccounts')}>
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
            <Dropdown.Toggle variant='' className={fc('fTypes')}>
              All Types
            </Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu'>
              <ul className='checkbox-list'>
                {Object.keys(currentAccountByType).map((accountName, index) => {
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
        </div>
        <div className='dflex-center mb-15'>
          <ReactDatePicker
            selected={fFromDate ? getUTC(fFromDate) : fromDate}
            onChange={(date) => onChange('start', date)}
            // selectsStart
            startDate={fFromDate ? getUTC(fFromDate) : fromDate}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            minDate={getUTC('1900-01-01')}
            maxDate={getUTC()}
            className='m-l-3'
            // selectsRange
            customInput={
              <div className='drop-box'>
                <div className='date-box'>
                  <input
                    type='text'
                    className={['month_year', fc('fFromDate')].join(' ')}
                    value={fFromDate ? getMonthYear(fFromDate) : getMonthYear(fromDate)}
                  />
                </div>
              </div>
            }
          />
          <span className='date-separator'>to</span>
          <ReactDatePicker
            selected={fToDate ? getUTC(fToDate) : null}
            onChange={(date) => onChange('end', date)}
            // selectsStart
            startDate={fToDate ? getUTC(fToDate) : null}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            minDate={fFromDate ? getUTC(fFromDate) : null}
            maxDate={getUTC()}
            className='m-l-1'
            // selectsRange
            customInput={
              <div className='drop-box'>
                <div className='date-box'>
                  <input
                    type='text'
                    className={['month_year', fc('fToDate')].join(' ')}
                    value={getMonthYear(fToDate)}
                  />
                </div>
              </div>
            }
          />
          <Dropdown className='drop-box m-l-2'>
            <Dropdown.Toggle className={fc('fTimeInterval')}>{fTimeInterval || 'Monthly'}</Dropdown.Toggle>
            <Dropdown.Menu className='mm-dropdown-menu dropsm'>
              <ul className='radiolist'>
                {enumerateStr(TimeIntervalEnum).map((interval, index) => {
                  return (
                    <li key={interval}>
                      <label>
                        <input
                          type='radio'
                          name='m-list'
                          aria-checked={fTimeInterval === interval}
                          value={interval}
                          checked={fTimeInterval === interval}
                          onChange={handleIntervalChange}
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
    </div>
  );
};

export default NetworthFilter;
