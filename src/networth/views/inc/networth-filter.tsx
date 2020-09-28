import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

import { enumerateStr } from 'common/common-helper';
import { setCategory } from 'networth/networth.actions';
import { AccountCategory } from 'networth/networth.enum';
import { useNetworthDispatch, useNetworthState } from 'networth/networth.context';

const NetworthFilter = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<any>(null);
  const { category } = useNetworthState();
  const dispatch = useNetworthDispatch();

  const onChange = (dates: any) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCategory(event.target.value));
  };

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
                          aria-checked={cat === category}
                          checked={cat === category}
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
              <div className='dropdown-head'>
                <h4>Needs Attention</h4>
              </div>
              <div className='dropdown-box'>
                <ul className='pending'>
                  <li>
                    <label>
                      <input
                        name='accBox'
                        type='checkbox'
                        aria-describedby='Investment assets'
                        value='accBox'
                        aria-checked={false}
                        placeholder=''
                        defaultChecked={false}
                        checked={false}
                      />
                      <span />
                    </label>
                    <div>
                      <h5>Robinhood</h5>
                      <span>10 days ago</span>
                    </div>
                    <div>$2,343</div>
                  </li>
                  <li>
                    <label>
                      <input
                        name='accBox'
                        type='checkbox'
                        aria-describedby='Investment assets'
                        value='accBox'
                        aria-checked={false}
                        placeholder=''
                        defaultChecked={false}
                        checked={false}
                      />
                      <span />
                    </label>
                    <div>
                      <h5>Yieldstreet</h5>
                      <span>12 days ago</span>
                    </div>
                    <div>$2,343</div>
                  </li>
                </ul>
                <ul className='success'>
                  <li>
                    <label>
                      <input
                        name='accBox'
                        type='checkbox'
                        aria-describedby='Investment assets'
                        value='accBox'
                        aria-checked={false}
                        placeholder=''
                        defaultChecked={false}
                        checked={false}
                      />
                      <span />
                    </label>
                    <div>
                      <h5>Robinhood</h5>
                      <span>10 days ago</span>
                    </div>
                    <div>$2,343</div>
                  </li>
                  <li>
                    <label>
                      <input
                        name='accBox'
                        type='checkbox'
                        aria-describedby='Investment assets'
                        value='accBox'
                        aria-checked={false}
                        placeholder=''
                        defaultChecked={false}
                        checked={false}
                      />
                      <span />
                    </label>
                    <div>
                      <h5>Yieldstreet</h5>
                      <span>12 days ago</span>
                    </div>
                    <div>$2,343</div>
                  </li>
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
              <ul className='droplist'>
                <li>
                  <Link to='#'>401K</Link>
                </li>
                <li>
                  <Link to='#'>Cash Management</Link>
                </li>
                <li>
                  <Link to='#'>IRA</Link>
                </li>
                <li>
                  <Link to='#' className='subdrop-toggle'>
                    Loan
                  </Link>
                  <ol className='subdrop-m'>
                    <li>
                      <Link to='#'>Credit</Link>
                    </li>
                    <li>
                      <Link to='#'>Mortgage</Link>
                    </li>
                    <li>
                      <Link to='#'>Car Loan</Link>
                    </li>
                  </ol>
                </li>
                <li>
                  <Link to='#'>Investment Non-Retirement</Link>
                </li>
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
                <li>
                  <label>
                    <input type='radio' name='m-list' aria-checked={false} value='monthly' />
                    <span>Monthly</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type='radio' name='m-list' value='quarterly' aria-checked={false} />
                    <span>Quarterly</span>
                  </label>
                </li>
                <li>
                  <label>
                    <input type='radio' name='m-list' value='yearly' aria-checked={false} />
                    <span>Yearly</span>
                  </label>
                </li>
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NetworthFilter;
