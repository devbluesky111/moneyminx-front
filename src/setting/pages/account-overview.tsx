import React from 'react';
import { ReactComponent as Edited } from 'assets/icons/edited.svg';
import { ReactComponent as Merill } from 'assets/icons/merill.svg';
import { ReactComponent as Refresh } from 'assets/icons/refresh.svg';
import { ReactComponent as PeerStreet } from 'assets/icons/peer-street.svg';
import { ReactComponent as WealthLogo } from 'assets/icons/wealth-logo.svg';

export const accountOverview = () => {
  return (
    <section className='mm-account-overview'>
      <div className='card mm-setting-card'>
        <div className='card-body'>
          <div className='d-md-flex flex-wrap justify-content-between align-items-center'>
            <div className='mm-account-overview__add-account m-b-8 mb-md-0'>Connected Accounts (3/5)</div>
            <div>
              <button type='button' className='btn btn-outline-primary mm-button btn-lg'>
                Add Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='card mm-setting-card mm-account-overview__error'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='mm-account-overview__error-title'>Connection error</div>
            <div>
              <button type='button' className='btn btn-outline-primary mm-button btn-lg'>
                Fix Connection
              </button>
            </div>
          </div>

          <hr />

          <div className='row pb-2 pt-1'>
            <div className='col-10 col-md-6'>
              <div>
                <WealthLogo className='mr-3 mr-md-4' />
                <span className='mm-account-overview__block-title'>Wealthfront</span>
              </div>
            </div>
            <div className='col-2 col-md-1 order-md-2 text-right'>
              <Refresh />
            </div>
            <div className='col-12 col-md-5 order-md-1 text-md-right pt-2 pt-md-0'>
              <small className='text-gray'>Last updated 10 days ago</small>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col col-md-8'>
              <div className='d-flex justify-content-between justify-content-md-start align-items-center'>
                <span className='mm-switch-block mr-md-4'>
                  <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                  <label className='mm-switch' htmlFor='mc3'></label>
                </span>
                <span>Account 01</span>
              </div>
            </div>
            <div className='col col-md-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mm-account-overview__amount'>$2,343</div>
                <Edited />
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col col-md-8'>
              <div className='d-flex justify-content-between justify-content-md-start'>
                <span className='mm-switch-block mr-md-4'>
                  <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                  <label className='mm-switch' htmlFor='mc3'></label>
                </span>
                <span>Account 02</span>
              </div>
            </div>
            <div className='col col-md-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mm-account-overview__amount'>$123,245</div>
                <Edited />
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col-12 col-md-6'>
              <div className='text-primary mm-account-overview__update-link mb-3 mb-md-0'>Update Credentials</div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='text-danger text-md-right mm-account-overview__delete-link'>
                Delete account and remove data
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card mm-setting-card mm-account-overview__info'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='mm-account-overview__info-title'>Needs more info</div>
            <div>
              <button type='button' className='btn btn-outline-primary mm-button btn-lg'>
                Fix Connection
              </button>
            </div>
          </div>

          <hr />

          <div className='row pb-2 pt-1'>
            <div className='col-10 col-md-6'>
              <div>
                <WealthLogo className='mr-3 mr-md-4' />
                <span className='mm-account-overview__block-title'>Wealthfront</span>
              </div>
            </div>
            <div className='col-2 col-md-1 order-md-2 text-right'>
              <Refresh />
            </div>
            <div className='col-12 col-md-5 order-md-1 text-md-right pt-2 pt-md-0'>
              <small className='text-gray'>Last updated 10 days ago</small>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col col-md-8'>
              <div className='d-flex justify-content-between justify-content-md-start align-items-center'>
                <span className='mm-switch-block mr-md-4'>
                  <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                  <label className='mm-switch' htmlFor='mc3'></label>
                </span>
                <span>Account 01</span>
              </div>
            </div>
            <div className='col col-md-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mm-account-overview__amount'>$2,343</div>
                <Edited />
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col col-md-8'>
              <div className='d-flex justify-content-between justify-content-md-start'>
                <span className='mm-switch-block mr-md-4'>
                  <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                  <label className='mm-switch' htmlFor='mc3'></label>
                </span>
                <span>Account 02</span>
              </div>
            </div>
            <div className='col col-md-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mm-account-overview__amount'>$123,245</div>
                <Edited />
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col-12 col-md-6'>
              <div className='text-primary mm-account-overview__update-link mb-3 mb-md-0'>Update Credentials</div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='text-danger text-md-right mm-account-overview__delete-link'>
                Delete account and remove data
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card mm-setting-card mm-account-overview__peer-street'>
        <div className='card-body'>
          <div className='row pb-2 pt-1'>
            <div className='col-10 col-md-6'>
              <div>
                <PeerStreet className='mr-3 mr-md-4' />
                <span className='mm-account-overview__block-title'>Peer Street</span>
              </div>
            </div>
            <div className='col-2 col-md-1 order-md-2 text-right'>
              <Refresh />
            </div>
            <div className='col-12 col-md-5 order-md-1 text-md-right pt-2 pt-md-0'>
              <small className='text-gray'>Last updated 10 days ago</small>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col col-md-8'>
              <div className='d-flex justify-content-between justify-content-md-start align-items-center'>
                <span className='mm-switch-block mr-md-4'>
                  <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                  <label className='mm-switch' htmlFor='mc3'></label>
                </span>
                <span>Account 01</span>
              </div>
            </div>
            <div className='col col-md-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mm-account-overview__amount'>$1,222</div>
                <Edited />
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col col-md-8'>
              <div className='d-flex justify-content-between justify-content-md-start'>
                <span className='mm-switch-block mr-md-4'>
                  <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                  <label className='mm-switch' htmlFor='mc3'></label>
                </span>
                <span>Account 02</span>
              </div>
            </div>
            <div className='col col-md-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mm-account-overview__amount'>$683,086</div>
                <Edited />
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col-12 col-md-6'>
              <div className='text-primary mm-account-overview__update-link mb-3 mb-md-0'>Update Credentials</div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='text-danger text-md-right mm-account-overview__delete-link'>
                Delete account and remove data
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card mm-setting-card mm-account-overview__peer-street'>
        <div className='card-body'>
          <div className='row pb-2 pt-1'>
            <div className='col-10 col-md-6'>
              <div>
                <Merill className='mr-3 mr-md-4' />
                <span className='mm-account-overview__block-title'>Merill Edge IRA</span>
              </div>
            </div>
            <div className='col-2 col-md-1 order-md-2 text-right'>
              <Refresh />
            </div>
            <div className='col-12 col-md-5 order-md-1 text-md-right pt-2 pt-md-0'>
              <small className='text-gray'>Last updated 10 days ago</small>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col col-md-8'>
              <div className='d-flex justify-content-between justify-content-md-start align-items-center'>
                <span className='mm-switch-block mr-md-4'>
                  <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                  <label className='mm-switch' htmlFor='mc3'></label>
                </span>
                <span>Account 01</span>
              </div>
            </div>
            <div className='col col-md-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mm-account-overview__amount'>$4,234</div>
                <Edited />
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col col-md-8'>
              <div className='d-flex justify-content-between justify-content-md-start'>
                <span className='mm-switch-block mr-md-4'>
                  <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                  <label className='mm-switch' htmlFor='mc3'></label>
                </span>
                <span>Account 02</span>
              </div>
            </div>
            <div className='col col-md-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mm-account-overview__amount'>$855,345</div>
                <Edited />
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col-12 col-md-6'>
              <div className='text-primary mm-account-overview__update-link mb-3 mb-md-0'>Update Credentials</div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='text-danger text-md-right mm-account-overview__delete-link'>
                Delete account and remove data
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card mm-setting-card'>
        <div className='card-body'>
          <div className='d-md-flex flex-wrap justify-content-between align-items-center'>
            <div className='mm-account-overview__add-account m-b-8 mb-md-0'>Manual Accounts (1/3)</div>
            <div>
              <button type='button' className='btn btn-outline-primary mm-button btn-lg'>
                Add Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='card mm-setting-card mm-account-overview__account'>
        <div className='card-body'>
          <div className='row pb-2 pt-1'>
            <div className='col-10 col-md-6'>
              <div>
                <span className='mm-account-overview__block-title'>My own account</span>
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col col-md-8'>
              <div className='d-flex justify-content-between justify-content-md-start align-items-center'>
                <span className='mm-switch-block mr-md-4'>
                  <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                  <label className='mm-switch' htmlFor='mc3'></label>
                </span>
                <span>Account 01</span>
              </div>
            </div>
            <div className='col col-md-4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mm-account-overview__amount'>$4,234</div>
                <Edited />
              </div>
            </div>
          </div>

          <div className='row py-3'>
            <div className='col-12 col-md-6'></div>
            <div className='col-12 col-md-6'>
              <div className='text-danger text-md-right mm-account-overview__delete-link'>
                Delete account and remove data
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default accountOverview;
