import React from 'react';
import AccountTable from './account-table';
import Button from 'react-bootstrap/Button';
import { AccountProps } from '../account.type';
import Dropdown from 'react-bootstrap/Dropdown';
import AccountSubNavigation from './account-sub-navigation';
import NavBarSection from '../../setting/inc/setting.header';
import FooterSection from '../../setting/inc/setting.footer';
import { ReactComponent as Edit } from '../../assets/images/account/edit.svg';
import { ReactComponent as Chart } from '../../assets/images/account/chart.svg';
import { ReactComponent as ChartTab } from '../../assets/images/account/chart-tab.svg';
import { ReactComponent as ChartMobile } from '../../assets/images/account/chart-mobile.svg';
import { ReactComponent as CheckCircle } from '../../assets/images/account/check-circle.svg';

const Account: React.FC<AccountProps> = () => {
  return (
    <div className='mm-setting'>
      <NavBarSection />
      <AccountSubNavigation />
      <div className='mm-account'>
        <div className='mm-account__selection mb-3'>
          <Edit className='float-left mr-3' />
          <div className='mm-account__selection--info float-lg-left mr-md-3 d-md-inline-block'>
            <ul>
              <li>401K - Job 1</li>
              <li>Investment Assets</li>
              <li>401K</li>
              <li>Retirement</li>
              <li>USD</li>
            </ul>
          </div>
          <div className='d-md-flex justify-content-between mt-3'>
            <div className='d-flex'>
              <div className=''>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-year">
                    Dropdown Button
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-month">
                    Dropdown Button
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className='mm-account__selection--type float-right'>
              <CheckCircle />
              <span>Manual</span>
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <Chart className='w-100 d-none d-xl-block' />
          <ChartTab className='w-100 d-none d-md-block d-xl-none' />
          <ChartMobile className='w-100 d-md-none' />
        </div>
        <div className='d-flex justify-content-between flex-wrap'>
          <div className="mm-plan-radios mb-4">
            <input type="radio" id="mm-account-holding" value="holdings" name='mm-radio-time-interval'
              aria-checked="true" />
            <label className="labels" htmlFor="mm-account-holding">Holdings</label>
            <input type="radio" id="mm-account-activity" value="activity"
              name='mm-radio-time-interval' aria-checked="false" />
            <label className="labels" htmlFor="mm-account-activity">Activity</label>
            <div className="mm-radio-bg" />
          </div>
          <Button variant="primary" className='mb-4 mm-account__btn'>Add Position</Button>
        </div>
        <AccountTable />
      </div>
      <FooterSection />
    </div>
  );
  };

export default Account;
