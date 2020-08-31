import React from 'react';

import NetworthLayout from 'networth/networth.layout';
import SimpleBarChart from './simple-bar-chart';

const Networth = () => {
  return (
    <NetworthLayout>
      <div className='modal fade' id='upgradeModal' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Upgrade your account
              </h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>
                Your plan only allows for 1 connected account. Click below to compare plans and upgrade or add a manual
                account instead.
              </p>
              <div className='btnbox'>
                <a href='#' className='btn-com'>
                  Compare Plans
                </a>
                <a href='#' className='btn-normal'>
                  Add Manual Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='content-container'>
        <div
          className='toast warning-toast'
          data-autohide='false'
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
        >
          <div className='toast-body'>2 connections need attention</div>
          <span data-dismiss='toast'>X</span>
        </div>

        <div className='content-head'>
          <div className='container'>
            <div className='left-box'>
              <button className='plus-btn'>+</button>
              <div className='myaccount-drop'>
                <button
                  type='button'
                  className='dropdown-toggle'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  My Accounts
                </button>
                <div className='dropdown-menu'>
                  <div className='dropdown-head'>
                    <h4>Needs Attention</h4>
                  </div>
                  <div className='dropdown-box'>
                    <ul className='pending'>
                      <li>
                        <a href='/kkkk'>
                          <div>
                            <h5>Robinhood</h5>
                            <span>10 days ago</span>
                          </div>
                          <div>$2,343</div>
                        </a>
                      </li>
                      <li>
                        <a href='/abc'>
                          <div>
                            <h5>Yieldstreet</h5>
                            <span>12 days ago</span>
                          </div>
                          <div>$2,343</div>
                        </a>
                      </li>
                    </ul>
                    <ul className='success'>
                      <li>
                        <a href='/Robinhood'>
                          <div>
                            <h5>Robinhood</h5>
                            <span>10 days ago</span>
                          </div>
                          <div>$2,343</div>
                        </a>
                      </li>
                      <li>
                        <a href='/yieldstreet'>
                          <div>
                            <h5>Yieldstreet</h5>
                            <span>12 days ago</span>
                          </div>
                          <div>$2,343</div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='right-box'>
              <button type='button' className='download-btn'>
                <i className='icon-download' />
                <span>Download</span> CSV
              </button>
            </div>
          </div>
        </div>
        <div className='content-wraper'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='d-flex dropdowns-holder mb-15'>
                  <div className='drop-box'>
                    <button
                      type='button'
                      className='dropdown-toggle'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      All Categories
                    </button>
                    <div className='dropdown-menu'>
                      <ul className='checkbox-list'>
                        <li>
                          <label>
                            <input type='checkbox' area-checked='' />
                            <span>Investment Assets</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' />
                            <span>Other Assets</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' />
                            <span>Liabilities</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='checkbox' />
                            <span>Net Worth</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='drop-box tab-hide'>
                    <button
                      type='button'
                      className='dropdown-toggle'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      All Accounts
                    </button>
                    <div className='dropdown-menu'>
                      <div className='dropdown-head'>
                        <h4>Needs Attention</h4>
                      </div>
                      <div className='dropdown-box'>
                        <ul className='pending'>
                          <li>
                            <label>
                              <input type='checkbox' name='accbox' />
                              <span></span>
                            </label>
                            <div>
                              <h5>Robinhood</h5>
                              <span>10 days ago</span>
                            </div>
                            <div>$2,343</div>
                          </li>
                          <li>
                            <label>
                              <input type='checkbox' name='accbox' />
                              <span></span>
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
                              <input type='checkbox' name='accbox' />
                              <span></span>
                            </label>
                            <div>
                              <h5>Robinhood</h5>
                              <span>10 days ago</span>
                            </div>
                            <div>$2,343</div>
                          </li>
                          <li>
                            <label>
                              <input type='checkbox' name='accbox' />
                              <span></span>
                            </label>
                            <div>
                              <h5>Yieldstreet</h5>
                              <span>12 days ago</span>
                            </div>
                            <div>$2,343</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className='drop-box'>
                    <button
                      type='button'
                      className='dropdown-toggle'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      All Types
                    </button>
                    <div className='dropdown-menu'>
                      <ul className='droplist'>
                        <li>
                          <a href='#'>401K</a>
                        </li>
                        <li>
                          <a href='#'>Cash Management</a>
                        </li>
                        <li>
                          <a href='#'>IRA</a>
                        </li>
                        <li>
                          <a className='subdrop-toggle' href='#'>
                            Loan
                          </a>
                          <ol className='subdrop-m'>
                            <li>
                              <a href='#'>Credit</a>
                            </li>
                            <li>
                              <a href='#'>Mortgage</a>
                            </li>
                            <li>
                              <a href='#'>Car Loan</a>
                            </li>
                          </ol>
                        </li>
                        <li>
                          <a href='#'>Investment Non-Retirement</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className='drop-box'>
                    <div className='date-box'>
                      <input type='text' className='month_year' placeholder='Jan 2020' />
                      <span>-</span>
                      <input type='text' className='month_year' placeholder='May 2020' />
                    </div>
                  </div>

                  <div className='drop-box'>
                    <button
                      type='button'
                      className='dropdown-toggle'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      Monthly
                    </button>
                    <div className='dropdown-menu dropsm'>
                      <ul className='radiolist'>
                        <li>
                          <label>
                            <input type='radio' name='m-list' />
                            <span>Monthly</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='radio' name='m-list' />
                            <span>Quarterly</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type='radio' name='m-list' />
                            <span>Yearly</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-40'>
              <div className='col-lg-9 mob-btm'>
                <div className='ct-box'>
                  <div className='graphbox'>
                    <ul>
                      <li className='inv-data'>
                        <span>Investment Assets</span>
                        <h3>$235,000</h3>
                      </li>
                      <li className='other-data'>
                        <span>Other Assets</span>
                        <h3>$735,000</h3>
                      </li>
                      <li className='lty-data'>
                        <span>Liabilities</span>
                        <h3>$1,505,000</h3>
                      </li>
                      <li className='nw-data'>
                        <span>Net Worth</span>
                        <h3>$535,000</h3>
                      </li>
                    </ul>
                    <div className='chartbox'>
                      <SimpleBarChart />
                      <ul className='charttool'>
                        <li className='inv-data'>
                          <span>Investment Assets</span>
                          <h3>$235,000</h3>
                        </li>
                        <li className='other-data'>
                          <span>Other Assets</span>
                          <h3>$735,000</h3>
                        </li>
                        <li className='lty-data'>
                          <span>Liabilities</span>
                          <h3>$1,505,000</h3>
                        </li>
                        <li className='nw-data'>
                          <span>Net Worth</span>
                          <h3>$535,000</h3>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-3 mob-btm'>
                <div className='ct-box padd-20'>
                  <div className='measure-box'>
                    <h2>
                      <img src='../src/assets/images/networth/measure-up-icon.svg' alt='' /> Minx Measure-up
                    </h2>
                    <div
                      className='bgbox'
                      style={{
                        background: 'url(../src/assets/images/networth/blur-img.png) no-repeat 50% 50% / cover',
                      }}
                    >
                      <p>Portfolio comparisons are coming soon. Complete your profile for better results once live.</p>
                      <a href='#' className='btn-blue btn-full'>
                        Complete Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-40'>
              <div className='col-12'>
                <div className='ct-box box-b'>
                  <div className='table-holder'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>
                            <span>Investment Assets</span>
                          </th>
                          <th className='tab-hide'>Type</th>
                          <th className='tab-hide'>Jan 2020</th>
                          <th className='tab-hide'>Feb 2020</th>
                          <th className='tab-hide'>Mar 2020</th>
                          <th>Apr 2020</th>
                          <th>May 2020</th>
                          <th className='current-m'>Jun 2020</th>
                          <th>Jul 2020</th>
                          <th>Aug 2020</th>
                          <th className='tab-hide'>Sep 2020</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr data-href=''>
                          <td>401K</td>
                          <td className='tab-hide'>401k</td>
                          <td className='tab-hide'>$75,000</td>
                          <td className='tab-hide'>$13,000</td>
                          <td className='tab-hide'>$78,000</td>
                          <td data-title4='Apr 2020'>$83,000</td>
                          <td data-title5='May 2020'>$88,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $83,000
                          </td>
                          <td data-title7='Jul 2020'>$94,000</td>
                          <td data-title8='Aug 2020'>$32,000</td>
                          <td className='tab-hide'>$32,000</td>
                        </tr>
                        <tr data-href='#'>
                          <td>WealthFront</td>
                          <td className='tab-hide'>Cash Management</td>
                          <td className='tab-hide'>$73,000</td>
                          <td className='tab-hide'>$64,000</td>
                          <td className='tab-hide'>$83,000</td>
                          <td data-title4='Apr 2020'>$67,000</td>
                          <td data-title5='May 2020'>$24,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $97,000
                          </td>
                          <td data-title7='Jul 2020'>$56,000</td>
                          <td data-title8='Aug 2020'>$13,000</td>
                          <td className='tab-hide'>$65,000</td>
                        </tr>
                        <tr data-href='#'>
                          <td>Merill Edge IRA</td>
                          <td className='tab-hide'>IRA</td>
                          <td className='tab-hide'>$62,000</td>
                          <td className='tab-hide'>$75,000</td>
                          <td className='tab-hide'>$66,000</td>
                          <td data-title4='Apr 2020'>$14,000</td>
                          <td data-title5='May 2020'>$44,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $65,000
                          </td>
                          <td data-title7='Jul 2020'>$12,000</td>
                          <td data-title8='Aug 2020'>$18,000</td>
                          <td className='tab-hide'>$53,000</td>
                        </tr>
                        <tr data-href='#'>
                          <td>Fundrise</td>
                          <td className='tab-hide'>Investment Non-Retirement</td>
                          <td className='tab-hide'>$53,000</td>
                          <td className='tab-hide'>$64,000</td>
                          <td className='tab-hide'>$99,000</td>
                          <td data-title4='Apr 2020'>$89,000</td>
                          <td data-title5='May 2020'>$23,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $61,000
                          </td>
                          <td data-title7='Jul 2020'>$84,000</td>
                          <td data-title8='Aug 2020'>$83,000</td>
                          <td className='tab-hide'>$43,000</td>
                        </tr>
                        <tr data-href='#'>
                          <td>Peer Street</td>
                          <td className='tab-hide'>Investment Non-Retirement</td>
                          <td className='tab-hide'>$12,000</td>
                          <td className='tab-hide'>$69,000</td>
                          <td className='tab-hide'>$24,000</td>
                          <td data-title4='Apr 2020'>$78,000</td>
                          <td data-title5='May 2020'>$39,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $65,000
                          </td>
                          <td data-title7='Jul 2020'>$83,000</td>
                          <td data-title8='Aug 2020'>$41,000</td>
                          <td className='tab-hide'>$55,000</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr data-href='#'>
                          <td>
                            <a
                              className='warning-popover'
                              data-className='warning-pop'
                              data-container='body'
                              title='Warning'
                              data-toggle='popover'
                              data-placement='right'
                              data-content=''
                            >
                              Total
                            </a>
                          </td>
                          <td className='tab-hide'></td>
                          <td className='tab-hide'>$95,000</td>
                          <td className='tab-hide'>$74,000</td>
                          <td className='tab-hide'>$34,000</td>
                          <td data-title4='Apr 2020'>$90,000</td>
                          <td data-title5='May 2020'>$56,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $53,000
                          </td>
                          <td data-title7='Jul 2020'>$23,000</td>
                          <td data-title8='Aug 2020'>$94,000</td>
                          <td className='tab-hide'>$74,000</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-40'>
              <div className='col-12'>
                <div className='ct-box box-g'>
                  <div className='table-holder'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>
                            <span>Other Assets</span>
                          </th>
                          <th className='tab-hide'>Type</th>
                          <th className='tab-hide'>Jan 2020</th>
                          <th className='tab-hide'>Feb 2020</th>
                          <th className='tab-hide'>Mar 2020</th>
                          <th>Apr 2020</th>
                          <th>May 2020</th>
                          <th className='current-m'>Jun 2020</th>
                          <th>Jul 2020</th>
                          <th>Aug 2020</th>
                          <th className='tab-hide'>Sep 2020</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr data-href='#'>
                          <td>Total</td>
                          <td className='tab-hide'></td>
                          <td className='tab-hide'>$95,000</td>
                          <td className='tab-hide'>$74,000</td>
                          <td className='tab-hide'>$34,000</td>
                          <td data-title4='Apr 2020'>$90,000</td>
                          <td data-title5='May 2020'>$56,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $53,000
                          </td>
                          <td data-title7='Jul 2020'>$23,000</td>
                          <td data-title8='Aug 2020'>$94,000</td>
                          <td className='tab-hide'>$74,000</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-40'>
              <div className='col-12'>
                <div className='ct-box box-r'>
                  <div className='table-holder'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>
                            <span>Liabilities</span>
                          </th>
                          <th className='tab-hide'>Type</th>
                          <th className='tab-hide'>Jan 2020</th>
                          <th className='tab-hide'>Feb 2020</th>
                          <th className='tab-hide'>Mar 2020</th>
                          <th>Apr 2020</th>
                          <th>May 2020</th>
                          <th className='current-m'>Jun 2020</th>
                          <th>Jul 2020</th>
                          <th>Aug 2020</th>
                          <th className='tab-hide'>Sep 2020</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Jeep</td>
                          <td className='tab-hide'>Car</td>
                          <td className='tab-hide'>$75,000</td>
                          <td className='tab-hide'>$13,000</td>
                          <td className='tab-hide'>$78,000</td>
                          <td data-title4='Apr 2020'>$83,000</td>
                          <td data-title5='May 2020'>$88,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $83,000
                          </td>
                          <td data-title7='Jul 2020'>$94,000</td>
                          <td data-title8='Aug 2020'>$32,000</td>
                          <td className='tab-hide'>$32,000</td>
                        </tr>
                        <tr>
                          <td>Mustang</td>
                          <td className='tab-hide'>Car</td>
                          <td className='tab-hide'>$73,000</td>
                          <td className='tab-hide'>$64,000</td>
                          <td className='tab-hide'>$83,000</td>
                          <td data-title4='Apr 2020'>$67,000</td>
                          <td data-title5='May 2020'>$24,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $97,000
                          </td>
                          <td data-title7='Jul 2020'>$56,000</td>
                          <td data-title8='Aug 2020'>$13,000</td>
                          <td className='tab-hide'>$65,000</td>
                        </tr>
                        <tr>
                          <td>Home</td>
                          <td className='tab-hide'>Mortgage</td>
                          <td className='tab-hide'>$62,000</td>
                          <td className='tab-hide'>$75,000</td>
                          <td className='tab-hide'>$66,000</td>
                          <td data-title4='Apr 2020'>$14,000</td>
                          <td data-title5='May 2020'>$44,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $65,000
                          </td>
                          <td data-title7='Jul 2020'>$12,000</td>
                          <td data-title8='Aug 2020'>$18,000</td>
                          <td className='tab-hide'>$53,000</td>
                        </tr>
                        <tr data-href='#'>
                          <td>Chase Saphire</td>
                          <td className='tab-hide'>Credit Card</td>
                          <td className='tab-hide'>$53,000</td>
                          <td className='tab-hide'>$64,000</td>
                          <td className='tab-hide'>$99,000</td>
                          <td data-title4='Apr 2020'>$89,000</td>
                          <td data-title5='May 2020'>$23,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $61,000
                          </td>
                          <td data-title7='Jul 2020'>$84,000</td>
                          <td data-title8='Aug 2020'>$83,000</td>
                          <td className='tab-hide'>$43,000</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>Total</td>
                          <td className='tab-hide'></td>
                          <td className='tab-hide'>$95,000</td>
                          <td className='tab-hide'>$74,000</td>
                          <td className='tab-hide'>$34,000</td>
                          <td data-title4='Apr 2020'>$90,000</td>
                          <td data-title5='May 2020'>$56,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $53,000
                          </td>
                          <td data-title7='Jul 2020'>$23,000</td>
                          <td data-title8='Aug 2020'>$94,000</td>
                          <td className='tab-hide'>$74,000</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className='row mb-40'>
              <div className='col-12'>
                <div className='ct-box box-v'>
                  <div className='table-holder'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>
                            <span>Net Worth</span>
                          </th>
                          <th className='tab-hide'></th>
                          <th className='tab-hide'>Jan 2020</th>
                          <th className='tab-hide'>Feb 2020</th>
                          <th className='tab-hide'>Mar 2020</th>
                          <th>Apr 2020</th>
                          <th>May 2020</th>
                          <th className='current-m'>Jun 2020</th>
                          <th>Jul 2020</th>
                          <th>Aug 2020</th>
                          <th className='tab-hide'>Sep 2020</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr data-href='#'>
                          <td>Investment Assets</td>
                          <td className='tab-hide'></td>
                          <td className='tab-hide'>$75,000</td>
                          <td className='tab-hide'>$13,000</td>
                          <td className='tab-hide'>$78,000</td>
                          <td data-title4='Apr 2020'>$83,000</td>
                          <td data-title5='May 2020'>$88,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $83,000
                          </td>
                          <td data-title7='Jul 2020'>$94,000</td>
                          <td data-title8='Aug 2020'>$32,000</td>
                          <td className='tab-hide'>$32,000</td>
                        </tr>
                        <tr data-href='#'>
                          <td>Other Assets</td>
                          <td className='tab-hide'></td>
                          <td className='tab-hide'>$73,000</td>
                          <td className='tab-hide'>$64,000</td>
                          <td className='tab-hide'>$83,000</td>
                          <td data-title4='Apr 2020'>$67,000</td>
                          <td data-title5='May 2020'>$24,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $97,000
                          </td>
                          <td data-title7='Jul 2020'>$56,000</td>
                          <td data-title8='Aug 2020'>$13,000</td>
                          <td className='tab-hide'>$65,000</td>
                        </tr>
                        <tr data-href='#'>
                          <td>Liabilities</td>
                          <td className='tab-hide'></td>
                          <td className='tab-hide'>$62,000</td>
                          <td className='tab-hide'>$75,000</td>
                          <td className='tab-hide'>$66,000</td>
                          <td data-title4='Apr 2020'>$14,000</td>
                          <td data-title5='May 2020'>$44,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $65,000
                          </td>
                          <td data-title7='Jul 2020'>$12,000</td>
                          <td data-title8='Aug 2020'>$18,000</td>
                          <td className='tab-hide'>$53,000</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>Net Worth</td>
                          <td className='tab-hide'></td>
                          <td className='tab-hide'>$95,000</td>
                          <td className='tab-hide'>$74,000</td>
                          <td className='tab-hide'>$34,000</td>
                          <td data-title4='Apr 2020'>$90,000</td>
                          <td data-title5='May 2020'>$56,000</td>
                          <td data-title6='Jun 2020' className='current-m'>
                            $53,000
                          </td>
                          <td data-title7='Jul 2020'>$23,000</td>
                          <td data-title8='Aug 2020'>$94,000</td>
                          <td className='tab-hide'>$74,000</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </NetworthLayout>
  );
};

export default Networth;
