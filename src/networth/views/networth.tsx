import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAlert } from 'common/components/alert';
import NetworthLayout from 'networth/networth.layout';
import MeasureIcon from 'assets/images/networth/measure.svg';
import BlurChart from 'assets/images/networth/chart-blur.png';

import NetworthHead from './inc/networth-head';
import SimpleBarChart from './simple-bar-chart';
import NetworthFilter from './inc/networth-filter';
import ConnectionAlert from './inc/connection-alert';

const Networth = () => {
  const connectionAlert = useAlert();

  useEffect(() => {
    connectionAlert.open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NetworthLayout>
      <section className='content-container'>
        <NetworthHead />
        <div className='content-wraper'>
          <div className='container'>
            <NetworthFilter />
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
                      <img src={MeasureIcon} alt='Measure UP' /> Minx Measure-up
                    </h2>
                    <div
                      className='bgbox'
                      style={{
                        backgroundImage: `url(${BlurChart})`,
                      }}
                    >
                      <p>Portfolio comparisons are coming soon. Complete your profile for better results once live.</p>
                      <Link to='#' className='btn-blue btn-full'>
                        Complete Profile
                      </Link>
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
                            <Link
                              to='#'
                              className='warning-popover'
                              data-className='warning-pop'
                              data-container='body'
                              title='Warning'
                              data-toggle='popover'
                              data-placement='right'
                              data-content=''
                            >
                              Total
                            </Link>
                          </td>
                          <td className='tab-hide'>{''}</td>
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
                          <td className='tab-hide'>{''}</td>
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
                          <td className='tab-hide'>{''}</td>
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
                          <th className='tab-hide'>{''}</th>
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
                          <td className='tab-hide'>{''}</td>
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
                          <td className='tab-hide'>{''}</td>
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
                          <td className='tab-hide'>{''}</td>
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
                          <td className='tab-hide'>{''}</td>
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
        <ConnectionAlert connectionAlert={connectionAlert} message='2 Connections required attention' />
      </section>
    </NetworthLayout>
  );
};

export default Networth;
