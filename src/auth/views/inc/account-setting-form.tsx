import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { enumerateStr } from 'common/common-helper';
import useAccountType from 'auth/hooks/useAccountType';
import useAccountFilter from 'auth/hooks/useAccountFilter';
import { loginValidationSchema } from 'auth/auth.validation';
import useAccountSubtype from 'auth/hooks/useAccountSubtype';
import { CurrencyOptions } from 'auth/enum/currency-options';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as InfoIcon } from 'assets/images/signup/info.svg';
import { LiquidityOptions } from 'auth/enum/liquidity-options';
import { EmployerMatchLimitOptions } from 'auth/enum/employer-match-limit-options';
import { ReactComponent as ZillowImage } from 'assets/images/zillow.svg';
import useAssociateMortgage from 'auth/hooks/useAssociateMortgage';
import { CalculateRealEstateReturnOptions } from 'auth/enum/calculate-real-estate-return-options';

const AccountSettingForm = () => {
  const [accountType, setAccountType] = useState('');
  const [accountSubtype, setAccountSubtype] = useState('');
  const { loading: fetchingAccountType, data: accountTypes, error } = useAccountType();
  const { loading: fetchingAccountSubType, subType: accountSubTypes, error: subTypeError } = useAccountSubtype(
    accountType
  );

  const { fetchingFilters, error: filterError } = useAccountFilter(accountType, accountSubtype);
  const { fetchingMortgage, mortgageAccounts, mortgageError } = useAssociateMortgage();

  useEffect(() => {
    if (accountTypes) {
      setAccountType(accountTypes[0]);
    }
  }, [accountTypes]);

  useEffect(() => {
    if (accountSubTypes) {
      setAccountSubtype(accountSubTypes[0]);
    }
  }, [accountSubTypes]);

  const hasError = error || subTypeError || filterError || mortgageError;
  const isLoading = fetchingAccountSubType || fetchingAccountType || fetchingFilters || fetchingMortgage;

  if (hasError) {
    toast('Error occurred');
  }

  if (isLoading) {
    return <CircularSpinner />;
  }

  return (
    <Formik
      initialValues={{
        currency: '',
        mmCategory: '',
        accountName: '',
        city: undefined,
        state: undefined,
        mmAccountType: accountType || '',
        zipCode: undefined,
        country: undefined,
        mmAccountSubType: accountSubtype || '',
        liquidity: undefined,
        ownEstimate: undefined,
        loanBalance: undefined,
        useZestimate: undefined,
        interestRate: undefined,
        maturityDate: undefined,
        investedDate: undefined,
        employerMatch: undefined,
        streetAddress: undefined,
        amountInvested: undefined,
        associatedLoan: undefined,
        originationDate: undefined,
        originalBalance: undefined,
        paymentsPerYear: undefined,
        calculateReturns: undefined,
        calculatedEquity: undefined,
        currentValuation: undefined,
        termForInvestment: undefined,
        businessStartDate: undefined,
        employerMatchLimit: undefined,
        associatedMortgage: undefined,
        calculateReturnsOn: undefined,
        postMoneyValuation: undefined,
        currentMarketValue: undefined,
        targetInterestRate: undefined,
        separateLoanBalance: undefined,
        employerMatchLimitIn: undefined,
        includeEmployerMatch: undefined,
        separateShortBalance: undefined,
        estimatedAnnualReturns: undefined,
        estimatedAnnualRevenues: undefined,
        employerMatchContribution: undefined,
        estimatedAnnualPrincipalReduction: undefined,
      }}
      enableReinitialize
      validationSchema={loginValidationSchema}
      onSubmit={async (values, actions) => {
        // patch request here
      }}
    >
      {(props) => {
        const { setFieldValue, values, handleBlur, handleChange } = props;

        const setCategory = (cat: string) => {
          setFieldValue('mmCategory', cat);
        };

        const handleAccountChange = (e: React.ChangeEvent<any>) => {
          setAccountType(e.target.value);
          handleChange(e);
        };

        const handleSubAccountChange = (e: React.ChangeEvent<any>) => {
          setAccountSubtype(e.target.value);
          handleChange(e);
        };

        return (
          <form onSubmit={props.handleSubmit} className='account-setting-form'>
            <input
              type='text'
              className='email'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.accountName}
              name='accountName'
              placeholder='Sapphire Credit Card'
            />
            <div className='account-category'>
              <span className='form-subheading'>
                Account Category
                <a href='/link26'>
                  <InfoIcon />
                </a>
              </span>
              <ul className='category-list'>
                <li onClick={() => setCategory('Investment Asset')} role='button'>
                  <Link to='#'>Investment Asset</Link>
                </li>
                <li onClick={() => setCategory('Other Asset')} role='button'>
                  <Link to='#'>Other Asset</Link>
                </li>
                <li onClick={() => setCategory('Liability')} role='button'>
                  <Link to='#'>Liability</Link>
                </li>
              </ul>
            </div>
            <div className='account-type'>
              <ul className='account-type-list'>
                <li>
                  <span className='form-subheading'>Account Type</span>
                  <select
                    name='mmAccountType'
                    className='retirement'
                    onChange={handleAccountChange}
                    onBlur={handleBlur}
                    value={values.mmAccountType}
                  >
                    {accountTypes?.map((accType, index) => {
                      return (
                        <option value={accType} key={index} aria-selected={!!values.mmAccountType}>
                          {accType}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li>
                  <div className='account-list-content'>
                    <span className='form-subheading'>Account Subtype</span>
                    <select
                      name='mmAccountSubType'
                      className='401k'
                      onChange={handleSubAccountChange}
                      onBlur={handleBlur}
                      value={values.mmAccountSubType}
                    >
                      {accountSubTypes?.map((subType, index) => {
                        return (
                          <option value={subType} key={index} aria-selected={!!values.mmAccountSubType}>
                            {subType}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </li>
                <li>
                  <span className='form-subheading'>Currency</span>
                  <select
                    name='currency'
                    className='USD'
                    onSelect={handleChange}
                    onBlur={handleBlur}
                    value={values.currency}
                  >
                    {enumerateStr(CurrencyOptions).map((curr, index) => {
                      return (
                        <option value={curr} key={index} aria-selected={!!values.currency}>
                          {curr}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li>
                  <span className='form-subheading'>Liquidity</span>
                  <select
                    name='liquidity'
                    className='USD'
                    onSelect={handleChange}
                    onBlur={handleBlur}
                    value={values.currency}
                  >
                    {enumerateStr(LiquidityOptions).map((curr, index) => {
                      return (
                        <option value={curr} key={index} aria-selected={!!values.liquidity}>
                          {curr}
                        </option>
                      );
                    })}
                  </select>
                </li>
              </ul>
            </div>
            <div className='middle-input-wrap'>
              <div className='input-wrap performance flex-box'>
                <div className='left-input'>
                  <p>
                    <span className='form-subheading'>Does your employer match your contributions?</span>
                    <span>
                      <InfoIcon />
                    </span>
                  </p>
                </div>
                <div className='right-input radio'>
                  <input
                    type='radio'
                    value='yes'
                    defaultChecked={false}
                    onChange={handleChange}
                    name='employerMatchContribution'
                    checked={values.employerMatchContribution === 'yes'}
                    aria-checked={!!values.employerMatchContribution}
                  />
                  <label>Yes</label>
                  <input
                    onChange={handleChange}
                    value='no'
                    type='radio'
                    defaultChecked={false}
                    name='employerMatchContribution'
                    checked={values.employerMatchContribution === 'no'}
                    aria-checked={!!values.employerMatchContribution}
                  />
                  <label>No</label>
                </div>
              </div>
              <div className='input-wrap flex-box'>
                <div className='left-input'>
                  <p>
                    <span className='form-subheading'>Employer match</span>
                  </p>
                </div>
                <div className='right-input'>
                  <span className='symbol-wrap'>
                    <input type='text' name='employerMatch' onChange={handleChange} placeholder='Employer Match' />
                    <span className='symbol-icon'>%</span>
                  </span>
                </div>
              </div>
              <div className='input-wrap flex-box'>
                <div className='left-input employer-match'>
                  <p>
                    <span className='form-subheading'>Employer match limit</span>
                    <input
                      type='radio'
                      onChange={handleChange}
                      value={EmployerMatchLimitOptions.AMOUNT}
                      defaultChecked={false}
                      name='employerMatchLimitIn'
                      checked={values.employerMatchLimitIn === EmployerMatchLimitOptions.AMOUNT}
                      aria-checked={values.employerMatchLimitIn === EmployerMatchLimitOptions.AMOUNT}
                    />
                    <label>$</label>
                    <input
                      type='radio'
                      onChange={handleChange}
                      value={EmployerMatchLimitOptions.PERCENTAGE}
                      defaultChecked={false}
                      name='employerMatchLimitIn'
                      checked={values.employerMatchLimitIn === EmployerMatchLimitOptions.PERCENTAGE}
                      aria-checked={values.employerMatchLimitIn === EmployerMatchLimitOptions.PERCENTAGE}
                    />
                    <label>%</label>
                  </p>
                </div>
                <div className='right-input'>
                  <span className='symbol-wrap'>
                    <input
                      type='text'
                      name='employerMatchLimit'
                      onChange={handleChange}
                      placeholder='Limit'
                      pattern='^[0-9]+$'
                    />
                    <span className='symbol-icon'>$</span>
                  </span>
                </div>
              </div>
              <div className='input-wrap performance flex-box'>
                <div className='left-input'>
                  <p>
                    <span className='form-subheading'>Include employer match in performance?</span>
                    <InfoIcon />
                  </p>
                </div>
                <div className='right-input radio'>
                  <input
                    type='radio'
                    value='yes'
                    defaultChecked={false}
                    onChange={handleChange}
                    name='includeEmployerMatch'
                    checked={values.includeEmployerMatch === 'yes'}
                    aria-checked={values.includeEmployerMatch === 'yes'}
                  />
                  <label>Yes</label>
                  <input
                    type='radio'
                    value='no'
                    defaultChecked={false}
                    onChange={handleChange}
                    name='includeEmployerMatch'
                    checked={values.includeEmployerMatch === 'no'}
                    aria-checked={values.includeEmployerMatch === 'no'}
                  />
                  <label>No</label>
                </div>
              </div>
              <div className='input-wrap performance flex-box'>
                <div className='left-input'>
                  <p>
                    <span className='form-subheading'>Calculate Returns?</span>
                    <InfoIcon />
                  </p>
                </div>
                <div className='right-input radio'>
                  <input
                    type='radio'
                    value='yes'
                    defaultChecked={false}
                    onChange={handleChange}
                    name='calculateReturns'
                    checked={values.calculateReturns === 'yes'}
                    aria-checked={values.calculateReturns === 'yes'}
                  />
                  <label>Yes</label>
                  <input
                    type='radio'
                    value='no'
                    defaultChecked={false}
                    onChange={handleChange}
                    name='calculateReturns'
                    checked={values.calculateReturns === 'no'}
                    aria-checked={values.calculateReturns === 'no'}
                  />
                  <label>No</label>
                </div>
              </div>
            </div>
            <div className='estimated-annual-return'>
              <div className='estimated-top-content flex-box'>
                <span className='form-subheading'>Estimated annual returns</span>
                <span className='form-subheading-right'>This will be used to show projections in your charts.</span>
              </div>

              <p>
                <input
                  type='radio'
                  value='no'
                  disabled
                  defaultChecked={false}
                  onChange={handleChange}
                  name='estimatedAnnualReturns'
                  checked={values.estimatedAnnualReturns === 'no'}
                  aria-checked={values.estimatedAnnualReturns === 'no'}
                />
                <label>
                  Use a calculation based on historical returns{' '}
                  <span className='mm-label b-primary-light w-100 d-inline'>Coming Soon</span>
                </label>
              </p>
              <p className='flex-box'>
                <span className='estimate-left'>
                  <input
                    type='radio'
                    value='own'
                    disabled
                    defaultChecked={true}
                    name='estimatedAnnualReturnType'
                    checked={true}
                    aria-checked={true}
                  />
                  <label>Use my own estimate</label>
                </span>
                <span className='estimate-right'>
                  <input
                    type='text'
                    name='estimatedAnnualReturns'
                    onChange={handleChange}
                    placeholder='5%'
                    pattern='^[0-9]+$'
                    value={values.estimatedAnnualReturns}
                  />
                </span>
              </p>
            </div>

            {/* Estimated principal paydown */}
            <div className='estimated-annual-return'>
              <div className='estimated-top-content flex-box'>
                <span className='form-subheading'>Estimated principal paydown</span>
                <span className='form-subheading-right'>This will be used to show projections in your charts.</span>
              </div>

              <p>
                <input type='radio' value='no' disabled defaultChecked={false} checked={false} aria-checked={false} />
                <label>
                  Use a calculation based on historical returns
                  <span className='mm-label b-primary-light w-100 d-inline'>Coming Soon</span>
                </label>
              </p>
              <p className='flex-box'>
                <span className='estimate-left'>
                  <input
                    type='radio'
                    value='own'
                    disabled
                    defaultChecked={true}
                    name='estimatedAnnualPrincipalReductionType'
                    checked={true}
                    aria-checked={true}
                  />
                  <label>Use my own estimate</label>
                </span>
                <span className='estimate-right'>
                  <input
                    type='text'
                    name='estimatedAnnualPrincipalReduction'
                    onChange={handleChange}
                    placeholder='12%'
                    pattern='^[0-9]+$'
                    value={values.estimatedAnnualReturns}
                  />
                </span>
              </p>
            </div>

            {/* address */}

            <div className='form-divider'>
              <input
                type='text'
                name='streetAddress'
                onChange={handleChange}
                placeholder='123 5th Avenue'
                value={values.streetAddress}
                className='w-100'
              />
              <div className='d-flex align-items-center my-4'>
                <input
                  type='text'
                  name='city'
                  onChange={handleChange}
                  placeholder='New York'
                  value={values.city}
                  className='w-50 mr-2'
                />
                <input
                  type='text'
                  name='state'
                  onChange={handleChange}
                  placeholder='New York'
                  value={values.state}
                  className='w-50 ml-2'
                />
              </div>

              <div className='d-flex align-items-center my-4'>
                <input
                  type='text'
                  name='zipCode'
                  onChange={handleChange}
                  placeholder='10030'
                  value={values.zipCode}
                  className='w-50 mr-2'
                />
                <input
                  type='text'
                  name='country'
                  onChange={handleChange}
                  placeholder='United States'
                  value={values.country}
                  className='w-50 ml-2'
                />
              </div>
            </div>

            {/* address end */}

            {/* Current value */}
            <div className='form-divider'>
              <span className='form-subheading'>Current Value</span>
              <div className='d-flex align-items-start'>
                <div className='w-50 mr-2 d-flex flex-column'>
                  <div className='form-check ml-0 pl-0 my-4 '>
                    <input
                      value='yes'
                      type='radio'
                      name='useZestimate'
                      aria-checked={false}
                      className='form-check-input ml-0'
                      onChange={handleChange}
                      checked={values.useZestimate === 'yes'}
                    />
                    <label className='form-check-label ml-4' htmlFor='useZestimate'>
                      Use Zestimate® for home value
                    </label>
                  </div>
                  <ZillowImage />
                </div>
                <div className='w-50 mr-2 d-flex flex-column'>
                  <div className='form-check ml-0 pl-0 my-4 '>
                    <input
                      value='no'
                      type='radio'
                      name='useZestimate'
                      aria-checked={values.useZestimate === 'no'}
                      className='form-check-input ml-0'
                      onChange={handleChange}
                      checked={values.useZestimate === 'no'}
                    />
                    <label className='form-check-label ml-4' htmlFor='useZestimate'>
                      Use my own estimate
                    </label>
                  </div>
                  <input
                    type='text'
                    name='ownEstimate'
                    onChange={handleChange}
                    placeholder='United States'
                    value={values.ownEstimate}
                    className='w-100'
                  />
                </div>
              </div>
            </div>

            {/* current value ends */}

            {/* associate mortage and loan  */}
            <div className='account-type'>
              <ul className='account-type-list'>
                <li>
                  <span className='form-subheading'>Associated Mortgage</span>
                  <select
                    name='associatedMortgage'
                    className='retirement'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.associatedMortgage}
                  >
                    {mortgageAccounts?.map((accType, index) => {
                      return (
                        <option value={accType} key={index} aria-selected={!!values.mmAccountType}>
                          {accType}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li>
                  <span className='form-subheading'>Loan Balance</span>
                  <input
                    type='text'
                    name='loanBalance'
                    value={values.loanBalance}
                    placeholder='$500,000'
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </div>

            {/* associate mortage and loan  ends */}

            {/* calculate equity */}
            <div className='form-divider'>
              <div className='d-flex align-items-center justify-content-between'>
                <p>Calculated Equity</p>
                <p>$100,000</p>
              </div>
            </div>

            <div className='form-row'>
              <span className='form-subheading'>How do you prefer to calculate real estate returns?</span>
              <div className='form-check w-100 my-2'>
                <input
                  value={CalculateRealEstateReturnOptions.EQUITY}
                  type='radio'
                  name='calculateReturnsOn'
                  aria-checked={values.calculateReturnsOn === CalculateRealEstateReturnOptions.EQUITY}
                  className='form-check-input ml-0'
                  onChange={handleChange}
                  checked={values.calculateReturnsOn === CalculateRealEstateReturnOptions.EQUITY}
                />
                <label className='form-check-label ml-4' htmlFor='calculateReturnsOn'>
                  {CalculateRealEstateReturnOptions.EQUITY}
                </label>
              </div>
              <div className='form-check w-100 my-2'>
                <input
                  value={CalculateRealEstateReturnOptions.PROPERTY_VALUE}
                  type='radio'
                  name='calculateReturnsOn'
                  aria-checked={values.calculateReturnsOn === CalculateRealEstateReturnOptions.PROPERTY_VALUE}
                  className='form-check-input ml-0'
                  onChange={handleChange}
                  checked={values.calculateReturnsOn === CalculateRealEstateReturnOptions.PROPERTY_VALUE}
                />
                <label className='form-check-label ml-4' htmlFor='calculateReturnsOn'>
                  {CalculateRealEstateReturnOptions.PROPERTY_VALUE}
                </label>
              </div>
            </div>

            <div className='setting-button-wrap flex-box mt-5'>
              <button className='bg-white cancel-btn mm-btn-primary-outline' type='submit'>
                Cancel
              </button>
              <button className='bg-primary submit mm-btn-primary-outline' type='submit'>
                Next
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default AccountSettingForm;
