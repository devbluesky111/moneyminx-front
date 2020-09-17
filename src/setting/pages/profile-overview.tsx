import React from 'react';

import ProfilePicture from 'setting/inc/profile-picture';
import { ReactComponent as Info } from 'assets/icons/info.svg';
import { ReactComponent as Shield } from 'assets/icons/shield.svg';
import useProfile from 'auth/hooks/useProfile';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { toast } from 'react-toastify';
import { useAuthState } from 'auth/auth.context';

export const ProfileOverview = () => {
  const {
    loading,
    response: { error },
  } = useProfile();

  const { user } = useAuthState();

  if (error) {
    toast('Error occured fetching your profile', { type: 'error' });
  }

  if (loading || !user) {
    return <CircularSpinner />;
  }

  return (
    <section className='mm-profile-overview'>
      <div className='card mm-setting-card'>
        <div className='card-body d-flex justify-content-between align-items-center'>
          <div className='mm-profile-overview__title'>
            Hussein Yahfoufi<span className='text-primary px-2'>#1</span>
            <Info className='mt-n1' />
          </div>
          <div className='d-flex align-items-center'>
            <div className='text--gray mr-4 sm-hide'>Profile complete</div>
            <div className='mm-radial'>
              <div className='mm-radial__progress-bar mm-radial__progress-bar-progress'>
                <div className='mm-radial__progress-bar--overlay'>87%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfilePicture pictureURL={user.picture} />

      <div className='card mm-setting-card'>
        <div className='card-body'>
          <div className='mm-profile-overview__title mm-profile-overview__profile-page'>
            Profile Page
            <span className='mm-profile-overview__profile-page--tag text--primary m-l-15 px-2 py-1'>Comming Soon!</span>
            <p className='text--gray m-t-3 m-b-10'>
              Profile pages and conversations are coming mid-2021. Get a head start by getting your profile ready for
              when we launch.
            </p>
            <p className='m-b-6 d-md-flex align-items-center justify-content-between'>
              Profile page is where you can join the community in discussions about your investments
              <span className='mm-switch-block'>
                <input type='checkbox' className='mm-switch-input' id='mc3' name='Switch' />
                <label className='mm-switch mt-md-0 mt-3' htmlFor='mc3'></label>
              </span>
            </p>
            <div className='m-b-4 d-md-flex align-items-center justify-content-between mm-asset-allocation'>
              <p>
                Do you want to share your asset allocation on your profile page?
                <Info className='mt-n1 ml-2' />
              </p>
              <div className='mm-radio-block mr-n2 ml-n2 ml-md-0'>
                <label className='mm-radio mr-3'>
                  <input type='radio' name='radio-1' defaultChecked />
                  <span className='mm-checkmark'></span>Yes
                </label>
                <label className='mm-radio ml-3'>
                  <input type='radio' name='radio-1' />
                  <span className='mm-checkmark'></span>No
                </label>
              </div>
            </div>
            <div className='m-b-4 d-md-flex align-items-center justify-content-between'>
              <p>
                Do you want to share asset values on your profile page?
                <Info className='mt-n1 ml-2' />
              </p>
              <div className='mm-radio-block mr-md-n2 ml-n2 ml-md-0'>
                <label className='mm-radio mr-3'>
                  <input type='radio' name='radio-2' />
                  <span className='mm-checkmark'></span>Yes
                </label>
                <label className='mm-radio ml-3'>
                  <input type='radio' name='radio-2' defaultChecked />
                  <span className='mm-checkmark'></span>No
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card mm-setting-card'>
        <div className='card-body'>
          <div className='mm-profile-overview__title mm-profile-overview__profile-page'>
            About You
            <span className='mm-profile-overview__profile-page--tag text--primary m-l-15 px-2 py-1'>Comming Soon!</span>
            <p className='text--gray m-t-3 m-b-10'>
              Profile pages and conversations are coming mid-2021. Get a head start by getting your profile ready for
              when we launch.
            </p>
            <div>
              <form className='mm-profile-overview__form'>
                <div className='form-group row align-items-center'>
                  <label htmlFor='fname' className='col-md-3 col-form-label'>
                    First name
                    <Info className='mt-n1 ml-2' />
                  </label>
                  <div className='col-md-9'>
                    <input type='text' className='form-control form-control-lg' id='fname' placeholder='Hussein' />
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label htmlFor='lname' className='col-md-3 col-form-label'>
                    LastName
                    <Info className='mt-n1 ml-2' />
                  </label>
                  <div className='col-md-9'>
                    <input type='text' className='form-control form-control-lg' id='lname' placeholder='Yahfoufi' />
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label htmlFor='username' className='col-md-3 col-form-label'>
                    Username
                    <Info className='mt-n1 ml-2' />
                  </label>
                  <div className='col-md-9'>
                    <div className='mm-prepend-text text--gray'>@</div>
                    <input
                      type='text'
                      className='form-control form-control-lg mm-username-input-form'
                      id='username'
                      value='hussein'
                    />
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label htmlFor='bio' className='col-md-3 col-form-label'>
                    Bio
                  </label>
                  <div className='col-md-9'>
                    <textarea className='form-control mm-form-textarea' id='bio' />
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label htmlFor='website' className='col-md-3 col-form-label'>
                    Website
                  </label>
                  <div className='col-md-9'>
                    <input
                      type='text'
                      className='form-control form-control-lg mm-form-website'
                      id='website'
                      value='www.moneyminx.com'
                    />
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label htmlFor='year' className='col-md-3 col-form-label'>
                    Inverting since
                  </label>
                  <div className='col-md-9'>
                    <input type='text' className='form-control form-control-lg' id='year' value='2015' />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='card mm-setting-card'>
        <div className='card-body'>
          <div className='mm-profile-overview__title mm-profile-overview__profile-page'>
            Specialized Intelligence
            <Info className='mt-n1 ml-2' />
            <Shield className='float-right mt-1' />
            <p className='text--gray m-t-3 mb-4'>
              Enter your data below and opt-in for specialized insights including Minks Winks and Minks Measure-up.
              Minks Winks includes tips and intelligence based on machine learning. Minks Measure-up allows you to see
              how your allocation chart stacks up to your investor peers. We will never share or sell your data.
            </p>
            <div>
              <form className='mm-profile-overview__form'>
                <div className='form-group row align-items-center'>
                  <label className='col-md-3 col-form-label'>Country of residence</label>
                  <div className='col-md-5'>
                    <select className='form-control form-control-lg mr-sm-2'>
                      <option value='defaultValue'>United States</option>
                      <option value='1'>Germany</option>
                      <option value='2'>England</option>
                      <option value='3'>Spain</option>
                    </select>
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label className='col-md-3 col-form-label'>Household income</label>
                  <div className='col-md-5'>
                    <select className='form-control form-control-lg mr-sm-2'>
                      <option value='defaultValue'>$50,000 - $100,000</option>
                      <option value='1'>$1000 - $25,000</option>
                      <option value='2'>$25,000 - $50,000</option>
                    </select>
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label className='col-md-3 col-form-label'>Risk tolerance</label>
                  <div className='col-md-5'>
                    <select className='form-control form-control-lg mr-sm-2'>
                      <option value='defaultValue'>Aggressive</option>
                      <option value='1'>Normal</option>
                    </select>
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label className='col-md-3 col-form-label'>Date of birth</label>
                  <div className='col-md-5'>
                    <select className='form-control form-control-lg mr-sm-2'>
                      <option value='defaultValue'>August 6, 1976</option>
                      <option value='1'>April 6, 1976</option>
                    </select>
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label className='col-md-3 col-form-label'>Retirement age</label>
                  <div className='col-md-5'>
                    <select className='form-control form-control-lg mr-sm-2'>
                      <option>20</option>
                      <option value='defaultValue'>50</option>
                    </select>
                  </div>
                  <div className='col text-md-center  mt-3 mt-md-0'>
                    <label className='custom-checkbox'>
                      <input type='checkbox' />
                      <span className='checkmark'></span>
                    </label>
                    <span className='checkbox-custom-label mm-setting-form-info'>Already retired</span>
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label className='col-md-3 col-form-label'>Marital status</label>
                  <div className='col-md-5'>
                    <select className='form-control form-control-lg mr-sm-2'>
                      <option>Single</option>
                      <option value='defaultValue'>Married</option>
                    </select>
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label className='col-md-3 col-form-label'>Spouse’s date of birth</label>
                  <div className='col-md-5'>
                    <select className='form-control form-control-lg mr-sm-2'>
                      <option>August 6, 1977 </option>
                      <option value='defaultValue'>August 6, 1976</option>
                    </select>
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label className='col-md-3 col-form-label'>Spouse’s retirement age</label>
                  <div className='col-md-5'>
                    <select className='mr-sm-2 form-control form-control-lg'>
                      <option>40</option>
                      <option value='defaultValue'>50</option>
                    </select>
                  </div>
                  <div className='col text-md-center mt-3 mt-md-0'>
                    <label className='custom-checkbox'>
                      <input type='checkbox' />
                      <span className='checkmark'></span>
                    </label>
                    <span className='checkbox-custom-label mm-setting-form-info'>Already retired</span>
                  </div>
                </div>
                <div className='form-group row align-items-center'>
                  <label className='col-md-3 col-form-label'>Dependants</label>
                  <div className='col-md-5'>
                    <select className='form-control form-control-lg mr-sm-2'>
                      <option>3</option>
                      <option value='defaultValue'>4</option>
                    </select>
                  </div>
                </div>
              </form>
              <div className='mm-profile-overview__title mm-profile-overview__profile-page mt-4'>
                <div className='float-sm-left fs-16'>Turn on Minx Measure-up</div>
                <div className='d-flex justify-content-between align-items-center mt-sm-0 mt-2'>
                  <span className='mm-profile-overview__profile-page--tag text--primary ml-0 ml-sm-3 px-2 py-1'>
                    Comming Soon!
                  </span>
                  <span className='mm-switch-block'>
                    <input type='checkbox' className='mm-switch-input' id='switch-1' name='Switch' />
                    <label className='mm-switch mt-md-0 mt-sm-3' htmlFor='switch-1'></label>
                  </span>
                </div>
                <p className='text--gray m-t-1 m-b-6'>
                  You will be able to see how your portfolio compares to others with a similar profile. Your data will
                  be included in the aggregated data but not individually.
                </p>
              </div>
              <div className='mm-profile-overview__title mm-profile-overview__profile-page'>
                <div className='float-sm-left fs-16'>Turn on Minx Winks</div>
                <div className='d-flex justify-content-between align-items-center mt-sm-0 mt-2'>
                  <span className='mm-profile-overview__profile-page--tag text--primary ml-0 ml-sm-3 px-2 py-1'>
                    Comming Soon!
                  </span>
                  <span className='mm-switch-block'>
                    <input type='checkbox' className='mm-switch-input' id='switch-2' name='Switch' />
                    <label className='mm-switch mt-md-0 mt-sm-3' htmlFor='switch-2'></label>
                  </span>
                </div>
                <p className='text--gray m-t-1'>
                  You will receive intelligent tips and insights custom crafted based on your accounts and profile
                  details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;
