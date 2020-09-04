import React from 'react';

export const SettingOverview = () => {
  return (
    <section>
      <div className='card mm-setting-card'>
        <div className='card-body'>
          <form>
            <div className='mm-setting-card--title'>Preferences</div>
            <div className='mm-setting-form form-group mt-3 row'>
              <label className='col-sm-3 col-md-3'>Notification</label>
              <div className='col-sm-9 col-md-9'>
                <label className='custom-checkbox'>
                  <input type='checkbox' />
                  <span className='checkmark'></span>
                </label>
                <span className='checkbox-custom-label mm-setting-form-info'>
                  Get out diversified investor newsletter
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='card mm-setting-card'>
        <div className='card-body'>
          <form>
            <div className='mm-setting-card--title'>Security</div>
            <div className='mm-setting-form form-group row mt-3'>
              <label className='col-sm-3 col-md-3 col-form-label'>Email</label>
              <div className='col-sm-9 mb-4 col-md-9'>
                <input type='email' className='form-control' placeholder='Enter email' value='hussein@moneyminx.com' />
              </div>

              <label className='col-4 col-sm-3 col-md-3 col-form-label'>Password</label>
              <div className='col-8 col-sm-5 col-md-5 mb-4'>
                <input type='password' className='form-control mm-setting-form-pw' value='moneyminx' />
              </div>

              <div className='col'>
                <button type='button' className='btn btn-outline-primary mm-button float-right'>
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='card mm-setting-card'>
        <div className='card-body'>
          <form>
            <div className='mm-setting-card--title'>Subscription</div>
            <div className='mm-setting-form form-group row mt-3'>
              <div className='col-8 col-sm-3 col-md-3'>
                <label className=''>Current plan</label>
              </div>
              <div className='col-4 col-sm-5 col-md-5'>
                <span className='mm-setting-form-info ml-0 mb-4'>FREE</span>
              </div>
              <div className='col'>
                <button type='button' className='btn btn-outline-primary mm-button float-right'>
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='card mm-setting-card'>
        <div className='card-body'>
          <a className='mm-setting-card--subscription' href='#'>
            Cancle subscription
          </a>
        </div>
      </div>
    </section>
  );
};

export default SettingOverview;
