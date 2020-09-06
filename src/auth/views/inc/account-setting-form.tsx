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

const AccountSettingForm = () => {
  const [accountType, setAccountType] = useState('');
  const [accountSubtype, setAccountSubtype] = useState('');
  const { loading: fetchingAccountType, data: accountTypes, error } = useAccountType();
  const { loading: fetchingAccountSubType, subType: accountSubTypes, error: subTypeError } = useAccountSubtype(
    accountType
  );

  const { fetchingFilters, error: filterError } = useAccountFilter(accountType, accountSubtype);

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

  const hasError = error || subTypeError || filterError;
  const isLoading = fetchingAccountSubType || fetchingAccountType || fetchingFilters;

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
          <form onSubmit={props.handleSubmit}>
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
                  <select name='currency' className='USD' onSelect={handleChange} onBlur={handleBlur}>
                    {enumerateStr(CurrencyOptions).map((curr, index) => {
                      return (
                        <option value={curr} key={index} aria-selected={!!values.currency}>
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
                  </p>
                </div>
                <div className='right-input radio'>
                  <input type='radio' />
                  <label>Yes</label>
                  <input type='radio' />
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
                    <input type='text' />
                    <span className='symbol-icon'>%</span>
                  </span>
                </div>
              </div>
              <div className='input-wrap flex-box'>
                <div className='left-input employer-match'>
                  <p>
                    <span className='form-subheading'>Employer match limit</span>
                    <input type='radio' />
                    <label>$</label>
                    <input type='radio' />
                    <label>%</label>
                  </p>
                </div>
                <div className='right-input'>
                  <span className='symbol-wrap'>
                    <input type='text' />
                    <span className='symbol-icon'>$</span>
                  </span>
                </div>
              </div>
              <div className='input-wrap performance flex-box'>
                <div className='left-input'>
                  <p>
                    <span className='form-subheading'>Include employer match in performance?</span>
                    <a href='/link30'>
                      <InfoIcon />
                    </a>
                  </p>
                </div>
                <div className='right-input radio'>
                  <input type='radio' />
                  <label>Yes</label>
                  <input type='radio' />
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
                <input type='radio' />
                <label>Use a calculation based on historical returns</label>
              </p>
              <p className='flex-box'>
                <span className='estimate-left'>
                  <input type='radio' />
                  <label> Use my own estimate</label>
                </span>
                <span className='estimate-right'>
                  <input type='text' />
                </span>
              </p>
            </div>
            <div className='setting-button-wrap flex-box'>
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
