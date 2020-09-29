import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fNumber } from 'common/number.helper';
import { useAlert } from 'common/components/alert';
import { getMonthYear } from 'common/moment.helper';
import useNetworth from 'networth/hooks/useNetworth';
import NetworthLayout from 'networth/networth.layout';
import { AccountCategory } from 'networth/networth.enum';
import MeasureIcon from 'assets/images/networth/measure.svg';
import BlurChart from 'assets/images/networth/chart-blur.png';
import CircularSpinner from 'common/components/spinner/circular-spinner';

import NetworthHead from './inc/networth-head';
import SimpleBarChart from './simple-bar-chart';
import NetworthFilter from './inc/networth-filter';
import ConnectionAlert from './inc/connection-alert';
import { useNetworthState } from 'networth/networth.context';

const Networth = () => {
  const connectionAlert = useAlert();

  const { loading } = useNetworth();
  const { accounts, networth } = useNetworthState();

  useEffect(() => {
    connectionAlert.open();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !networth || !accounts) {
    return <CircularSpinner />;
  }

  const otherAssets = accounts[AccountCategory.OTHER_ASSETS];
  const liabilities = accounts[AccountCategory.LIABILITIES];
  const investmentAssets = accounts[AccountCategory.INVESTMENT_ASSETS];

  const gc = (interval: string) => {
    if (interval && getMonthYear() === interval) {
      return 'current-m';
    }

    return 'tab-hide';
  };

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

            {investmentAssets?.length ? (
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

                            {investmentAssets?.[0]?.balances.map((item, idx) => (
                              <th key={idx} className={gc(item.interval)}>
                                {item.interval}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {investmentAssets?.map((iAsset, index) => {
                            return (
                              <tr key={index}>
                                <td>{iAsset.accountName}</td>
                                <td>{iAsset.accountType}</td>
                                {iAsset.balances.map((b, idx) => (
                                  <td key={`${index}-${idx}`} className={gc(b.interval)}>
                                    {b.balance}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
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
                            <td>{''}</td>
                            {networth?.map((nItem, idx) => (
                              <td key={idx} className={gc(nItem.interval)}>
                                {fNumber(nItem.investmentAssets)}
                              </td>
                            ))}
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {otherAssets?.length ? (
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
                            {otherAssets?.[0]?.balances.map((item, idx) => (
                              <th key={idx} className={gc(item.interval)}>
                                {item.interval}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {otherAssets?.map((iAsset, index) => {
                            return (
                              <tr key={index}>
                                <td>{iAsset.accountName}</td>
                                <td>{iAsset.accountType}</td>
                                {iAsset.balances.map((b, idx) => (
                                  <td key={`${index}-${idx}`} className={gc(b.interval)}>
                                    {b.balance}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr data-href='#'>
                            <td>Total</td>
                            <td>{''}</td>
                            {networth?.map((nItem, idx) => (
                              <td key={idx} className={gc(nItem.interval)}>
                                {fNumber(nItem.otherAssets)}
                              </td>
                            ))}
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {liabilities?.length ? (
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
                            {liabilities?.[0]?.balances.map((item, idx) => (
                              <th key={idx} className={gc(item.interval)}>
                                {item.interval}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {liabilities?.map((iAsset, index) => {
                            return (
                              <tr key={index}>
                                <td>{iAsset.accountName}</td>
                                <td>{iAsset.accountType}</td>
                                {iAsset.balances.map((b, idx) => (
                                  <td key={`${index}-${idx}`} className={gc(b.interval)}>
                                    {b.balance}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>Total</td>
                            <td>{''}</td>
                            {networth?.map((nItem, idx) => (
                              <td key={idx} className={gc(nItem.interval)}>
                                {fNumber(nItem.liabilities)}
                              </td>
                            ))}
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

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
                          {networth?.map((nItem, idx) => (
                            <th key={idx} className={gc(nItem.interval)}>
                              {nItem.interval}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr data-href='#'>
                          <td>Investment Assets</td>
                          <td className='tab-hide'>{''}</td>
                          {networth?.map((nItem, idx) => (
                            <td key={idx} className={gc(nItem.interval)}>
                              {fNumber(nItem.investmentAssets)}
                            </td>
                          ))}
                        </tr>
                        <tr data-href='#'>
                          <td>Other Assets</td>
                          <td className='tab-hide'>{''}</td>

                          {networth?.map((nItem, idx) => (
                            <td key={idx} className={gc(nItem.interval)}>
                              {fNumber(nItem.otherAssets)}
                            </td>
                          ))}
                        </tr>
                        <tr data-href='#'>
                          <td>Liabilities</td>
                          <td className='tab-hide'>{''}</td>

                          {networth?.map((nItem, idx) => (
                            <td key={idx} className={gc(nItem.interval)}>
                              {fNumber(nItem.liabilities)}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td>Net Worth</td>
                          <td className='tab-hide'>{''}</td>
                          {networth?.map((nItem, idx) => (
                            <td key={idx} className={gc(nItem.interval)}>
                              {fNumber(nItem.networth)}
                            </td>
                          ))}
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
