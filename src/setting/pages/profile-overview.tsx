import React from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { FormControl } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

import useProfile from 'auth/hooks/useProfile';
import { patchProfile } from 'api/request.api';
import countries from '@mm/data/countries.json';
import { useAuthState } from 'auth/auth.context';
import { enumerateStr } from 'common/common-helper';
import SaveSettings from 'setting/inc/save-settings';
import ProfilePicture from 'setting/inc/profile-picture';
import { ReactComponent as Info } from 'assets/icons/info.svg';
import { ReactComponent as Shield } from 'assets/icons/shield.svg';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { HouseHoldIncomeOptions, MaritalStatusOptions, RiskToleranceOptions } from 'setting/setting.enum';

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

  const fullName = `${user.firstName} ${user.lastName}`;
  const { profileDetails } = user;

  return (
    <section className='mm-profile-overview'>
      <div className='card mm-setting-card'>
        <div className='card-body d-flex justify-content-between align-items-center'>
          <div className='mm-profile-overview__title'>
            {fullName}
            <span className='text-primary px-2'>#{user.id}</span>
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

      <Formik
        initialValues={{
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          username: user.username || '',
          bio: user.bio || '',
          website: user.website || '',
          investingSince: user.investingSince || '',
          profileEnabled: profileDetails?.profileEnabled || false,
          shareAssetAllocation: profileDetails?.shareAssetAllocation || false,
          shareAssetValues: profileDetails?.shareAssetValues || false,
          countryOfResidence: profileDetails?.countryOfResidence || 'US',
          householdIncome: profileDetails?.householdIncome || HouseHoldIncomeOptions.OPT_1,
          riskTolerance: profileDetails?.riskTolerance || RiskToleranceOptions.CONSERVATIVE,
          dob: profileDetails?.dob || new Date(),
          spouseDob: profileDetails?.spouseDob || new Date(),
          targetedRetirementAge: profileDetails?.targetedRetirementAge || 0,
          alreadyRetired: profileDetails?.alreadyRetired || false,
          maritalStatus: profileDetails?.maritalStatus || MaritalStatusOptions.SINGLE,
          spouseTargetedRetirementAge: profileDetails?.spouseTargetedRetirementAge || 0,
          spouseAlreadyRetired: profileDetails?.spouseAlreadyRetired || false,
          dependants: profileDetails?.dependants || 0,
          minxMeasureUp: profileDetails?.minxMeasureUp || false,
          minxWinks: profileDetails?.minxWinks || false,
        }}
        onSubmit={async (values, actions) => {
          const { error: patchError } = await patchProfile(values);

          if (patchError) {
            return toast('Could not save profile', { type: 'error' });
          }
        }}
      >
        {(props) => {
          const { handleChange, handleBlur, values, setFieldValue, handleSubmit } = props;

          const toggleFormCheck = (name: string) => {
            setFieldValue(name, !(values as any)[name]);
          };

          const handleRadioCheck = (e: React.ChangeEvent<any>) => {
            const name = e.target.name;
            const value = e.target.value === 'true' ? true : false;
            setFieldValue(name, value);
          };

          return (
            <form>
              <div className='card mm-setting-card'>
                <div className='card-body'>
                  <div className='mm-profile-overview__title mm-profile-overview__profile-page'>
                    Profile Page
                    <span className='mm-profile-overview__profile-page--tag text--primary m-l-15 px-2 py-1'>
                      Coming Soon!
                    </span>
                    <p className='text--gray m-t-3 m-b-10'>
                      Profile pages and conversations are coming mid-2021. Get a head start by getting your profile
                      ready for when we launch.
                    </p>
                    <p className='m-b-6 d-md-flex align-items-center justify-content-between'>
                      Profile page is where you can join the community in discussions about your investments
                      <span className='mm-switch-block'>
                        <input
                          value='true'
                          type='radio'
                          name='profileEnabled'
                          className='mm-switch-input'
                          checked={values.profileEnabled}
                          aria-checked={values.profileEnabled}
                          onChange={() => { }}
                        />
                        <label
                          className='mm-switch mt-md-0 mt-3'
                          onClick={() => toggleFormCheck('profileEnabled')}
                          role='button'
                        />
                      </span>
                    </p>
                    <div className='m-b-4 d-md-flex align-items-center justify-content-between mm-asset-allocation'>
                      <p>
                        Do you want to share your asset allocation on your profile page?
                        <Info className='mt-n1 ml-2' />
                      </p>
                      <div className='mm-radio-block mr-n2 ml-n2 ml-md-0'>
                        <label className='mm-radio mr-3'>
                          <input
                            type='radio'
                            name='shareAssetAllocation'
                            value='true'
                            checked={values.shareAssetAllocation}
                            aria-checked={values.shareAssetAllocation}
                            onChange={handleRadioCheck}
                          />
                          <span className='mm-checkmark' />
                          Yes
                        </label>
                        <label className='mm-radio ml-3'>
                          <input
                            type='radio'
                            name='shareAssetAllocation'
                            value='false'
                            checked={!values.shareAssetAllocation}
                            aria-checked={!values.shareAssetAllocation}
                            onChange={handleRadioCheck}
                          />
                          <span className='mm-checkmark' />
                          No
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
                          <input
                            type='radio'
                            name='shareAssetValues'
                            value='true'
                            checked={values.shareAssetValues}
                            aria-checked={values.shareAssetValues}
                            onChange={handleRadioCheck}
                          />
                          <span className='mm-checkmark' />
                          Yes
                        </label>
                        <label className='mm-radio ml-3'>
                          <input
                            type='radio'
                            name='shareAssetValues'
                            value='false'
                            checked={!values.shareAssetValues}
                            aria-checked={!values.shareAssetValues}
                            onChange={handleRadioCheck}
                          />
                          <span className='mm-checkmark' />
                          No
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
                    <span className='mm-profile-overview__profile-page--tag text--primary m-l-15 px-2 py-1'>
                      Comming Soon!
                    </span>
                    <p className='text--gray m-t-3 m-b-10'>
                      Profile pages and conversations are coming mid-2021. Get a head start by getting your profile
                      ready for when we launch.
                    </p>
                    <div>
                      <div className='mm-profile-overview__form'>
                        <div className='form-group row align-items-center'>
                          <label htmlFor='fname' className='col-md-3 col-form-label'>
                            First name
                            <Info className='mt-n1 ml-2' />
                          </label>
                          <div className='col-md-9'>
                            <input
                              type='text'
                              name='firstName'
                              placeholder='John'
                              value={values.firstName}
                              onChange={handleChange}
                              className='form-control form-control-lg'
                            />
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label htmlFor='lname' className='col-md-3 col-form-label'>
                            LastName
                            <Info className='mt-n1 ml-2' />
                          </label>
                          <div className='col-md-9'>
                            <input
                              type='text'
                              name='lastName'
                              placeholder='Doe'
                              value={values.lastName}
                              onChange={handleChange}
                              className='form-control form-control-lg'
                            />
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
                              name='username'
                              placeholder='john'
                              value={values.username}
                              onChange={handleChange}
                              className='form-control form-control-lg mm-username-input-form'
                            />
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label htmlFor='bio' className='col-md-3 col-form-label'>
                            Bio
                          </label>
                          <div className='col-md-9'>
                            <textarea
                              name='bio'
                              value={values.bio}
                              onChange={handleChange}
                              placeholder='Your bio'
                              className='form-control mm-form-textarea'
                            />
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label htmlFor='website' className='col-md-3 col-form-label'>
                            Website
                          </label>
                          <div className='col-md-9'>
                            <input
                              type='text'
                              name='website'
                              value={values.website}
                              onChange={handleChange}
                              placeholder='www.moneyminx.com'
                              className='form-control form-control-lg mm-form-website'
                            />
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label htmlFor='year' className='col-md-3 col-form-label'>
                            Investing since
                          </label>
                          <div className='col-md-9'>
                            <FormControl
                              type='number'
                              name='investingSince'
                              value={values.investingSince}
                              onChange={handleChange}
                              placeholder='2015'
                              className='form-control form-control-lg'
                            />
                          </div>
                        </div>
                      </div>
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
                      Enter your data below and opt-in for specialized insights including Minks Winks and Minks
                      Measure-up. Minks Winks includes tips and intelligence based on machine learning. Minks Measure-up
                      allows you to see how your allocation chart stacks up to your investor peers. We will never share
                      or sell your data.
                    </p>
                    <div>
                      <div className='mm-profile-overview__form'>
                        <div className='form-group row align-items-center'>
                          <label className='col-md-3 col-form-label'>Country of residence</label>
                          <div className='col-md-5'>
                            <select
                              className='form-control form-control-lg mr-sm-2'
                              name='countryOfResidence'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.countryOfResidence}
                            >
                              {countries.data.map((country) => {
                                return (
                                  <option
                                    value={country.code}
                                    key={country.id}
                                    aria-selected={values.countryOfResidence === country.code}
                                  >
                                    {country.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label className='col-md-3 col-form-label'>Household income</label>
                          <div className='col-md-5'>
                            <select
                              className='form-control form-control-lg mr-sm-2'
                              name='householdIncome'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {enumerateStr(HouseHoldIncomeOptions).map((householdIncome, index) => {
                                return (
                                  <option
                                    value={householdIncome}
                                    aria-selected={householdIncome === values.householdIncome}
                                    key={index}
                                  >
                                    {householdIncome}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label className='col-md-3 col-form-label'>Risk tolerance</label>
                          <div className='col-md-5'>
                            <select className='form-control form-control-lg mr-sm-2'>
                              {enumerateStr(RiskToleranceOptions).map((tolerateOption, index) => {
                                return (
                                  <option
                                    value={tolerateOption}
                                    aria-selected={tolerateOption === values.riskTolerance}
                                    key={index}
                                  >
                                    {tolerateOption}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label className='col-md-3 col-form-label'>Date of birth</label>
                          <div className='col-md-5'>
                            <ReactDatePicker
                              className='form-control form-control-lg mr-sm-2'
                              name='dob'
                              selected={new Date(values.dob)}
                              onChange={(val: Date) => {
                                setFieldValue('dob', moment(val).toISOString());
                              }}
                            />
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label className='col-md-3 col-form-label'>Retirement age</label>
                          <div className='col-md-5'>
                            <FormControl
                              type='number'
                              name='targetedRetirementAge'
                              value={values.targetedRetirementAge}
                              onChange={handleChange}
                              className='form-control form-control-lg mr-sm-2'
                              disabled={values.alreadyRetired}
                            />
                          </div>
                          <div className='col text-md-center  mt-3 mt-md-0'>
                            <div className='form-wrap'>
                              <span className='checkbox-item'>
                                <label className='check-box'>
                                  Already retired
                                  <input
                                    type='checkbox'
                                    name='alreadyRetired'
                                    value='true'
                                    checked={values.alreadyRetired}
                                    onChange={() => toggleFormCheck('alreadyRetired')}
                                    aria-checked={values.alreadyRetired}
                                  />
                                  <span className='geekmark' />
                                </label>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label className='col-md-3 col-form-label'>Marital status</label>
                          <div className='col-md-5'>
                            <select
                              className='form-control form-control-lg mr-sm-2'
                              name='maritalStatus'
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              {enumerateStr(MaritalStatusOptions).map((maritalStatus, index) => {
                                return (
                                  <option
                                    value={maritalStatus}
                                    aria-selected={values.maritalStatus === maritalStatus}
                                    key={index}
                                  >
                                    {maritalStatus}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label className='col-md-3 col-form-label'>Spouse’s date of birth</label>
                          <div className='col-md-5'>
                            <ReactDatePicker
                              className='form-control form-control-lg mr-sm-2'
                              name='spouseDob'
                              selected={new Date(values.spouseDob)}
                              onChange={(val: Date) => {
                                setFieldValue('spouseDob', moment(val).toISOString());
                              }}
                            />
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label className='col-md-3 col-form-label'>Spouse’s retirement age</label>
                          <div className='col-md-5'>
                            <FormControl
                              type='number'
                              name='spouseTargetedRetirementAge'
                              value={values.spouseTargetedRetirementAge}
                              onChange={handleChange}
                              className='mr-sm-2 form-control form-control-lg'
                              disabled={values.spouseAlreadyRetired}
                            />
                          </div>
                          <div className='col text-md-center mt-3 mt-md-0'>
                            <div className='form-wrap'>
                              <span className='checkbox-item'>
                                <label className='check-box'>
                                  Already retired
                                  <input
                                    type='checkbox'
                                    name='spouseAlreadyRetired'
                                    value='true'
                                    checked={values.spouseAlreadyRetired}
                                    onChange={() => toggleFormCheck('spouseAlreadyRetired')}
                                    aria-checked={values.spouseAlreadyRetired}
                                  />
                                  <span className='geekmark' />
                                </label>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='form-group row align-items-center'>
                          <label className='col-md-3 col-form-label'>Dependants</label>
                          <div className='col-md-5'>
                            <select className='form-control form-control-lg mr-sm-2'>
                              {[0, 1, 2, 3, 4].map((dependant, index) => {
                                return (
                                  <option value={dependant} aria-selected={values.dependants === dependant} key={index}>
                                    {dependant}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className='mm-profile-overview__title mm-profile-overview__profile-page mt-4'>
                        <div className='float-sm-left fs-16'>Turn on Minx Measure-up</div>
                        <div className='d-flex justify-content-between align-items-center mt-sm-0 mt-2'>
                          <span className='mm-profile-overview__profile-page--tag text--primary ml-0 ml-sm-3 px-2 py-1'>
                            Coming Soon!
                          </span>
                          <span className='mm-switch-block'>
                            <input
                              value='true'
                              name='minxMeasureUp'
                              type='checkbox'
                              aria-checked={values.minxMeasureUp}
                              className='mm-switch-input'
                              checked={values.minxMeasureUp}
                            />
                            <label
                              className='mm-switch mt-md-0 mt-sm-3'
                              onClick={() => toggleFormCheck('minxMeasureUp')}
                              role='button'
                            />
                          </span>
                        </div>
                        <p className='text--gray m-t-1 m-b-6'>
                          You will be able to see how your portfolio compares to others with a similar profile. Your
                          data will be included in the aggregated data but not individually.
                        </p>
                      </div>
                      <div className='mm-profile-overview__title mm-profile-overview__profile-page'>
                        <div className='float-sm-left fs-16'>Turn on Minx Winks</div>
                        <div className='d-flex justify-content-between align-items-center mt-sm-0 mt-2'>
                          <span className='mm-profile-overview__profile-page--tag text--primary ml-0 ml-sm-3 px-2 py-1'>
                            Coming Soon!
                          </span>
                          <span className='mm-switch-block'>
                            <input
                              value='true'
                              name='minxWinks'
                              type='checkbox'
                              aria-checked={values.minxWinks}
                              className='mm-switch-input'
                              checked={values.minxWinks}
                            />
                            <label
                              className='mm-switch mt-md-0 mt-sm-3'
                              onClick={() => toggleFormCheck('minxWinks')}
                              role='button'
                            />
                          </span>
                        </div>
                        <p className='text--gray m-t-1'>
                          You will receive intelligent tips and insights custom crafted based on your accounts and
                          profile details.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SaveSettings handleSave={handleSubmit} />
            </form>
          );
        }}
      </Formik>
    </section>
  );
};

export default ProfileOverview;
