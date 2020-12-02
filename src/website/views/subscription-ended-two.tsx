import React from 'react';
import Button from 'react-bootstrap/Button';
import PeerStreetLogo from 'assets/images/subscription/peerstreetlogo.png';
import MerrilEdgeLogo from 'assets/images/subscription/merriledgelogo.png';

import { ReactComponent as DeleteIcon } from 'assets/icons/icon-delete.svg';
import { ReactComponent as BackIcon } from 'assets/images/subscription/back-btn.svg';
import { ReactComponent as SubscriptionWarning } from 'assets/images/subscription/warning.svg';
import { ReactComponent as OwnAccountIcon } from 'assets/images/subscription/own-account-icon.svg';

const SubscriptionEnded = () => {
  return (
    <PricingTable />
  );
};

export default SubscriptionEnded;
export const PricingTable = () => {
  return (
    <section>
      <div className='subscription-ended bottom py-5'>
        <div className='container'>
          <div className='row'>
            <div className='subs-ended-msg-box'>
              <div className='subs-ended-left'>
                <h4>Too many connections for current plan!</h4>
                <p>
                  Your current plan only allows for 5 connections, please remove connections to continue using Money Minx.
                </p>
              </div>
              <span className='warning-icon'>
                <SubscriptionWarning />
              </span>
            </div>

            <div className='col-lg-12'>
              <div className='subscription-account-wrap'>
                <div className='subscription-account-wrap__title d-md-flex justify-content-between align-items-center'>
                  <div className='subscription-account-wrap__title--text text-danger'>
                    Connected Accounts (14/5)
                    <small>
                      Upgrade your account to add more connections
                    </small>
                  </div>
                  <Button className='subscription-account-wrap__title--button mt-2' variant='outline-primary'>Upgrade</Button>
                </div>

                <ul className='subscribed-list mm-connected-accounts'>
                  <li>
                    <div className='account-wrap mr-0'>
                      <div className='row no-gutters align-items-center justify-content-between mb-3 account-wrap__header'>
                        <p>
                          <span className='logo-icon'>
                            <img alt='Peer Street' src={PeerStreetLogo} />
                          </span>
                          Peer Street
                        </p>
                        <small className='mt-3 mt-md-0'>Last updated 10 days ago</small>
                      </div>
                      <div className='row no-gutters align-items-center py-3 account-wrap__body'>
                        <div className='col-7 col-md-8'>Account 01 (3432)</div>
                        <div className='col-3 col-md-3'>$1,222</div>
                        <div className='col-auto ml-auto'><DeleteIcon /></div>
                      </div>
                      <div className='row no-gutters align-items-center py-3 account-wrap__body'>
                        <div className='col-7 col-md-8'>Account 02 (1321)</div>
                        <div className='col-3 col-md-3'>$683,086</div>
                        <div className='col-auto ml-auto'><DeleteIcon /></div>
                      </div>
                      <div className='row no-gutters pt-3 account-wrap__footer'>
                        <div className='col-auto ml-md-auto'>
                          <small>
                            Delete account and remove data
                          </small>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className='account-wrap mr-0'>
                      <div className='row no-gutters align-items-center justify-content-between mb-3 account-wrap__header'>
                        <p>
                          <span className='logo-icon'>
                            <img src={MerrilEdgeLogo} alt='Peer Street' />
                          </span>
                          Merill Edge IRA
                        </p>
                        <small className='mt-3 mt-md-0'>Last updated 10 days ago</small>
                      </div>
                      <div className='row no-gutters align-items-center py-3 account-wrap__body'>
                        <div className='col-7 col-md-8'>Account 01 (3212)</div>
                        <div className='col-3 col-md-3'>$4,234</div>
                        <div className='col-auto ml-auto'><DeleteIcon /></div>
                      </div>
                      <div className='row no-gutters align-items-center py-3 account-wrap__body'>
                        <div className='col-7 col-md-8'>Account 02 (2321)</div>
                        <div className='col-3 col-md-3'>$855,345</div>
                        <div className='col-auto ml-auto'><DeleteIcon /></div>
                      </div>
                      <div className='row no-gutters pt-3 account-wrap__footer'>
                        <div className='col-auto ml-md-auto'>
                          <small>
                            Delete account and remove data
                          </small>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

                <div className='subscription-account-wrap__title d-md-flex justify-content-between align-items-center'>
                  <div className='subscription-account-wrap__title--text'>
                    Manual Accounts (3/4)
                  </div>
                  <Button className='subscription-account-wrap__title--button mt-2' variant='outline-primary'>Upgrade</Button>
                </div>

                <ul className='subscribed-list mm-manual-accounts'>
                  <li>
                    <div className='account-wrap mr-0'>
                      <div className='row no-gutters align-items-center justify-content-between mb-3 account-wrap__header'>
                        <p>
                          <span className='logo-icon'>
                            <OwnAccountIcon />
                          </span>
                          Money Minx Manual
                        </p>
                      </div>
                      <div className='row no-gutters align-items-center py-3 account-wrap__body'>
                        <div className='col-7 col-md-8'>Account 01</div>
                        <div className='col-3 col-md-3'>$7,235</div>
                        <div className='col-auto ml-auto'><DeleteIcon /></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='action-overlay'>
          <div className='subscription-bottom-text'>
            <div className='subs-content one'>
              <a href='link12'>
                <span className='back-btn'>
                  <BackIcon />
                </span>
              </a>
            </div>
            <div className='subs-content two'>
              <p>
                4/1 <span className='hidden-text'>connected </span>
                <br />
                5/4 <span className='hidden-text'>manual</span>
              </p>
            </div>
            <div className='subs-content three'>
              <p>You need to delete 3 connected accounts and 1 manual to be able to use this plan.</p>
            </div>
            <div className='subs-content four'>
              <button className='finish-btn'>
                <a href='link11'>Finish</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
