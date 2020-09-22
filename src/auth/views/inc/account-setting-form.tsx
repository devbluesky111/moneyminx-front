import moment from 'moment';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ReactDatePicker from 'react-datepicker';
import React, { useState, useEffect } from 'react';

import { Account } from 'auth/auth.types';
import { MMCategories } from 'auth/auth.enum';
import { patchAccount } from 'api/request.api';
import { makeFormFields } from 'auth/auth.helper';
import { enumerateStr } from 'common/common-helper';
import { StringKeyObject } from 'common/common.types';
import useAccountType from 'auth/hooks/useAccountType';
import useLoanAccount from 'auth/hooks/useLoanAccount';
import useAccountFilter from 'auth/hooks/useAccountFilter';
import { loginValidationSchema } from 'auth/auth.validation';
import useAccountSubtype from 'auth/hooks/useAccountSubtype';
import { CurrencyOptions } from 'auth/enum/currency-options';
import { LiquidityOptions } from 'auth/enum/liquidity-options';
import useAssociateMortgage from 'auth/hooks/useAssociateMortgage';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { ReactComponent as ZillowImage } from 'assets/images/zillow.svg';
import { ReactComponent as NotLinked } from 'assets/icons/not-linked.svg';
import { ReactComponent as InfoIcon } from 'assets/images/signup/info.svg';
import { EmployerMatchLimitOptions } from 'auth/enum/employer-match-limit-options';
import { CalculateRealEstateReturnOptions } from 'auth/enum/calculate-real-estate-return-options';

interface Props {
  currentAccount?: Account;
}
const AccountSettingForm: React.FC<Props> = ({ currentAccount }) => {
  const [accountType, setAccountType] = useState('');
  const [accountSubtype, setAccountSubtype] = useState('');

  const { loading: fetchingAccountType, data: accountTypes, error } = useAccountType();
  const { loading: fetchingAccountSubType, subType: accountSubTypes, error: subTypeError } = useAccountSubtype(
    accountType
  );

  const { fetchingLoanAccount, loanAccounts, loanAccountError } = useLoanAccount();
  const { fetchingMortgage, mortgageAccounts, mortgageError } = useAssociateMortgage();
  const { fetchingFilters, accountFilters, error: filterError } = useAccountFilter(accountType, accountSubtype);

  useEffect(() => {
    if (currentAccount) {
      setAccountType(currentAccount.category?.mmAccountType);
      setAccountSubtype(currentAccount.category?.mmAccountSubType);
    }
  }, [currentAccount]);

  useEffect(() => {
    if (accountSubTypes?.length) {
      if (currentAccount?.category?.mmAccountSubType) {
        return setAccountSubtype(currentAccount?.category?.mmAccountSubType);
      }

      setAccountSubtype(accountSubTypes[0]);
    }
  }, [accountSubTypes, currentAccount]);

  const hasError = error || subTypeError || filterError || mortgageError || loanAccountError;

  const isLoading =
    fetchingAccountSubType || fetchingAccountType || fetchingFilters || fetchingMortgage || fetchingLoanAccount;

  if (hasError) {
    toast('Error occurred');
  }

  if (isLoading) {
    return <CircularSpinner />;
  }

  const formFields = accountFilters ? makeFormFields(accountFilters) : [];

  const hasField = (field: string) => formFields.includes(field);

  const hc = (field: string) => (hasField(field) ? '' : 'hidden');

  const currentFormFields = currentAccount?.formField;

  return (
    <Formik
      initialValues={{
        currency: currentFormFields?.currency || CurrencyOptions.USD,
        mmCategory: currentAccount?.category?.mmCategory || '',
        accountName: currentAccount?.accountName || '',
        city: currentFormFields?.city || '',
        state: currentFormFields?.state || '',
        mmAccountType: accountType || '',
        zipCode: currentFormFields?.zipCode || '',
        country: currentFormFields?.country || '',
        mmAccountSubType: accountSubtype || '',
        liquidity: currentFormFields?.liquidity || '',
        ownEstimate: currentFormFields?.ownEstimate || '',
        loanBalance: currentFormFields?.loanBalance || '',
        useZestimate: currentFormFields?.useZestimate || '',
        interestRate: currentFormFields?.interestRate || '',
        maturityDate: currentFormFields?.maturityDate || new Date(),
        investedDate: currentFormFields?.investedDate || new Date(),
        employerMatch: currentFormFields?.employerMatch || '',
        streetAddress: currentFormFields?.streetAddress || '',
        amountInvested: currentFormFields?.amountInvested || '',
        associatedLoan: currentFormFields?.associatedLoan || '',
        originationDate: currentFormFields?.originationDate || new Date(),
        originalBalance: currentFormFields?.originalBalance || '',
        paymentsPerYear: currentFormFields?.paymentsPerYear || '',
        calculateReturns: currentFormFields?.calculateReturns || '',
        calculatedEquity: currentFormFields?.calculatedEquity || '',
        currentValuation: currentFormFields?.currentValuation || '',
        termForInvestment: currentFormFields?.termForInvestment || '',
        businessStartDate: currentFormFields?.businessStartDate || new Date(),
        employerMatchLimit: currentFormFields?.employerMatchLimit || '',
        associatedMortgage: currentFormFields?.associatedMortgage || '',
        calculateReturnsOn: currentFormFields?.calculateReturnsOn || '',
        postMoneyValuation: currentFormFields?.postMoneyValuation || '',
        currentMarketValue: currentFormFields?.currentMarketValue || '',
        targetInterestRate: currentFormFields?.targetInterestRate || '',
        separateLoanBalance: currentFormFields?.separateLoanBalance || '',
        employerMatchLimitIn: currentFormFields?.employerMatchLimitIn || '',
        includeEmployerMatch: currentFormFields?.includeEmployerMatch || '',
        separateShortBalance: currentFormFields?.separateShortBalance || '',
        estimatedAnnualReturns: currentFormFields?.estimatedAnnualReturns || '',
        estimatedAnnualRevenues: currentFormFields?.estimatedAnnualRevenues || '',
        employerMatchContribution: currentFormFields?.employerMatchContribution || '',
        estimatedAnnualPrincipalReduction: currentFormFields?.estimatedAnnualPrincipalReduction || '',
      }}
      validationSchema={loginValidationSchema}
      onSubmit={async (values, actions) => {
        const mapping: StringKeyObject = {
          yes: true,
          no: false,
        };

        const accountId = currentAccount?.id;

        if (!accountId) {
          return;
        }

        let data = {
          calculatedEntity: values.ownEstimate && values.loanBalance ? +values.ownEstimate - +values.loanBalance : '',
        };

        Object.keys(values).forEach((key: any) => {
          const value = (values as any)[key];

          if (value === 'yes' || value === 'no') {
            data = { ...data, [key]: mapping[value] };
            return;
          }

          if (value === '') {
            data = { ...data, [key]: undefined };
            return;
          }

          data = { ...data, [key]: value };
        });

        const res = await patchAccount(`${accountId}`, data);
        if (res?.error) {
          toast('Error Occurred', { type: 'error' });
        } else {
          toast('Success Fully updated', { type: 'success' });
        }
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
              className='w-100 mb-4'
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
              <ul className='category-list mb-4'>
                {enumerateStr(MMCategories).map((cat: string, idx: number) => {
                  return (
                    <li onClick={() => setCategory(cat)} role='button' key={idx}>
                      <Link to='#' className={values.mmCategory === cat ? 'active' : ''}>
                        {cat}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='account-type'>
              <ul className='account-type-list'>
                <li>
                  <span className='form-subheading'>Account Type</span>
                  <select
                    name='mmAccountType'
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
                  <select name='currency' onChange={handleChange} onBlur={handleBlur} value={values.currency}>
                    {enumerateStr(CurrencyOptions).map((curr, index) => {
                      return (
                        <option value={curr} key={index} aria-selected={values.currency === curr}>
                          {curr}
                        </option>
                      );
                    })}
                  </select>
                </li>

                <li className={hc('liquidity')}>
                  <span className='form-subheading'>Liquidity</span>
                  <select name='liquidity' onChange={handleChange} onBlur={handleBlur} value={values.liquidity}>
                    {enumerateStr(LiquidityOptions).map((curr, index) => {
                      return (
                        <option value={curr} key={index} aria-selected={values.liquidity === curr}>
                          {curr}
                        </option>
                      );
                    })}
                  </select>
                </li>
              </ul>
            </div>
            {/* loan section */}
            <div className='account-type'>
              <ul className='account-type-list'>
                <li className={hc('interestRate')}>
                  <span className='form-subheading'>Interest Rate</span>

                  <Form.Control type='number' onChange={handleChange} name='interestRate' value={values.interestRate} />
                </li>
                <li className={hc('originationDate')}>
                  <span className='form-subheading'>Origination Date</span>
                  <ReactDatePicker
                    name='originationDate'
                    selected={new Date(values.originationDate)}
                    onChange={(val: Date) => {
                      setFieldValue('originationDate', moment(val).toISOString());
                    }}
                  />
                </li>
                <li className={hc('originalBalance')}>
                  <span className='form-subheading'>Original Balance</span>
                  <Form.Control
                    type='number'
                    onChange={handleChange}
                    name='originalBalance'
                    value={values.originalBalance}
                  />
                </li>
                <li className={hc('maturityDate')}>
                  <span className='form-subheading'>Maturity Date</span>
                  <ReactDatePicker
                    name='maturityDate'
                    selected={new Date(values.maturityDate)}
                    onChange={(val: Date) => {
                      setFieldValue('maturityDate', moment(val).toISOString());
                    }}
                  />
                </li>
                <li className={hc('termForInvestment')}>
                  {/* This is optional will be calculated if there are originated date and maturity date */}
                  <span className='form-subheading'>Term Length (in Months)</span>
                  <Form.Control
                    onChange={handleChange}
                    type='number'
                    name='termForInvestment'
                    value={values.termForInvestment}
                  />
                </li>

                <li className={hc('loanBalance')}>
                  <span className='form-subheading'>Loan Balance</span>
                  <Form.Control onChange={handleChange} type='number' name='loanBalance' value={values.loanBalance} />
                </li>
                <li className={hc('paymentsPerYear')}>
                  <span className='form-subheading'>Payment per year</span>
                  <Form.Control
                    type='number'
                    onChange={handleChange}
                    name='paymentsPerYear'
                    value={values.paymentsPerYear}
                  />
                </li>
              </ul>
            </div>
            {/* loan section ends */}

            {/* startup and investment section */}
            <div className='account-type'>
              <ul className='account-type-list'>
                <li className={hc('investedDate')}>
                  <span className='form-subheading'>When did you invest?</span>
                  <ReactDatePicker
                    name='investedDate'
                    selected={new Date(values.investedDate)}
                    onChange={(val: Date) => {
                      setFieldValue('investedDate', moment(val).toISOString());
                    }}
                  />
                </li>
                <li className={hc('amountInvested')}>
                  <span className='form-subheading'>How much did you invest?</span>
                  <Form.Control
                    onChange={handleChange}
                    type='number'
                    name='amountInvested'
                    value={values.amountInvested}
                  />
                </li>
                <li className={hc('currentMarketValue')}>
                  <span className='form-subheading'>What is the current market value?</span>
                  <Form.Control
                    onChange={handleChange}
                    type='number'
                    name='currentMarketValue'
                    value={values.currentMarketValue}
                  />
                </li>
                <li className={hc('targetInterestRate')}>
                  <span className='form-subheading'>What is the target IRR?</span>
                  <Form.Control
                    onChange={handleChange}
                    type='number'
                    name='targetInterestRate'
                    value={values.targetInterestRate}
                  />
                </li>
                <li className={hc('postMoneyValuation')}>
                  <span className='form-subheading'>Post Money Valuation</span>
                  <Form.Control
                    onChange={handleChange}
                    type='number'
                    name='postMoneyValuation'
                    value={values.postMoneyValuation}
                  />
                </li>
                <li className={hc('currentValuation')}>
                  <span className='form-subheading'>Current Valuation</span>
                  <Form.Control
                    type='number'
                    onChange={handleChange}
                    name='currentValuation'
                    value={values.currentValuation}
                  />
                </li>
              </ul>
            </div>

            {/* startup and investment section ends  */}

            {/* business start */}
            <div className='account-type'>
              <ul className='account-type-list'>
                <li className={hc('businessStartDate')}>
                  <span className='form-subheading'>When did you start or buy this business?</span>
                  <ReactDatePicker
                    name='businessStartDate'
                    selected={new Date(values.businessStartDate)}
                    onChange={(val: Date) => {
                      setFieldValue('businessStartDate', moment(val).toISOString());
                    }}
                  />
                </li>
                <li className={hc('estimatedAnnualRevenues')}>
                  <span className='form-subheading account-type-list__select-title'>Estimated Annual Revenues</span>
                  <Form.Control
                    type='number'
                    onChange={handleChange}
                    name='estimatedAnnualRevenues'
                    value={values.estimatedAnnualRevenues}
                    placeholder='12,000'
                  />
                </li>
                <li className={`${hc('associatedLoan')}`}>
                  <span className='form-subheading'>Associated Loan</span>
                  <Form.Control as='select' onChange={handleChange} name='associatedLoan' value={values.associatedLoan}>
                    {loanAccounts?.map((loanAccount, index) => {
                      return (
                        <option key={index} value={loanAccount} aria-selected={values.associatedLoan === loanAccount}>
                          {loanAccount}
                        </option>
                      );
                    })}
                  </Form.Control>
                </li>
              </ul>
            </div>
            {/* business ends  */}

            {/* address */}

            <div className='form-divider'>
              <input
                type='text'
                name='streetAddress'
                onChange={handleChange}
                placeholder='123 5th Avenue'
                value={values.streetAddress}
                className={`w-100 ${hc('streetAddress')}`}
              />
              <div className='d-flex align-items-center'>
                <input
                  type='text'
                  name='city'
                  onChange={handleChange}
                  placeholder='New York'
                  value={values.city}
                  className={`w-50 my-5 mr-2 ${hc('city')}`}
                />
                <input
                  type='text'
                  name='state'
                  onChange={handleChange}
                  placeholder='New York'
                  value={values.state}
                  className={`w-50 my-5 ml-2 ${hc('state')}`}
                />
              </div>

              <div className='d-flex align-items-center'>
                <input
                  type='text'
                  name='zipCode'
                  onChange={handleChange}
                  placeholder='10030'
                  value={values.zipCode}
                  className={`w-50 mb-5 mr-2 ${hc('zipCode')}`}
                />
                <input
                  type='text'
                  name='country'
                  onChange={handleChange}
                  placeholder='United States'
                  value={values.country}
                  className={`w-50 mb-5 ml-2 ${hc('zipCode')}`}
                />
              </div>
            </div>

            {/* address end */}

            <div className='middle-input-wrap'>
              <div className={`input-wrap performance flex-box ${hc('employerMatchContribution')}`}>
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
                    checked={values.employerMatchContribution === 'yes' || values.employerMatchContribution === true}
                    aria-checked={!!values.employerMatchContribution}
                  />
                  <label>Yes</label>
                  <input
                    onChange={handleChange}
                    value='no'
                    type='radio'
                    defaultChecked={false}
                    name='employerMatchContribution'
                    checked={values.employerMatchContribution === 'no' || values.employerMatchContribution === false}
                    aria-checked={!!values.employerMatchContribution}
                  />
                  <label>No</label>
                </div>
              </div>

              <div className={`input-wrap flex-box ${hc('employerMatch')}`}>
                <div className='left-input'>
                  <p>
                    <span className='form-subheading'>Employer match</span>
                  </p>
                </div>
                <div className='right-input'>
                  <span className='symbol-wrap'>
                    <Form.Control
                      type='number'
                      name='employerMatch'
                      onChange={handleChange}
                      placeholder='Employer Match'
                    />
                    <span className='symbol-icon'>%</span>
                  </span>
                </div>
              </div>

              <div className={`input-wrap flex-box ${hc('employerMatchLimitIn')} ${hc('employerMatchLimit')}`}>
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
                    <Form.Control
                      type='number'
                      name='employerMatchLimit'
                      onChange={handleChange}
                      placeholder='Employer Match'
                      value={values.employerMatchLimit}
                    />
                    <span className='symbol-icon'>$</span>
                  </span>
                </div>
              </div>

              <div className={`input-wrap performance flex-box ${hc('includeEmployerMatch')}`}>
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
                    checked={values.includeEmployerMatch === 'yes' || values.includeEmployerMatch === true}
                    aria-checked={values.includeEmployerMatch === 'yes' || values.includeEmployerMatch === true}
                  />
                  <label>Yes</label>
                  <input
                    type='radio'
                    value='no'
                    defaultChecked={false}
                    onChange={handleChange}
                    name='includeEmployerMatch'
                    checked={values.includeEmployerMatch === 'no' || values.includeEmployerMatch === false}
                    aria-checked={values.includeEmployerMatch === 'no' || values.includeEmployerMatch === false}
                  />
                  <label>No</label>
                </div>
              </div>

              <div className={`input-wrap performance flex-box ${hc('calculateReturns')}`}>
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
                    checked={values.calculateReturns === 'yes' || values.calculateReturns === true}
                    aria-checked={values.calculateReturns === 'yes' || values.calculateReturns === true}
                  />
                  <label>Yes</label>
                  <input
                    type='radio'
                    value='no'
                    defaultChecked={false}
                    onChange={handleChange}
                    name='calculateReturns'
                    checked={values.calculateReturns === 'no' || values.calculateReturns === false}
                    aria-checked={values.calculateReturns === 'no' || values.calculateReturns === false}
                  />
                  <label>No</label>
                </div>
              </div>
            </div>

            <div className='form-divider'>
              <ul className='account-type-list'>
                <li className={`w-100 ${hc('separateLoanBalance')}`}>
                  <p>
                    <span className='form-subheading'>How do you want to handle your 401k loan?</span>
                    <span className='mm-label b-primary-light w-100 d-inline'>Coming Soon!</span>
                  </p>
                  <Form.Control
                    as='select'
                    onChange={handleChange}
                    name='separateLoanBalance'
                    className='w-50 account-type-list__dropdown'
                    value={values.separateLoanBalance}
                  >
                    <option
                      value='yes'
                      aria-selected={values.separateLoanBalance === 'yes' || values.separateLoanBalance === true}
                    >
                      Separated Account
                    </option>
                    <option
                      value='no'
                      aria-selected={values.separateLoanBalance === 'no' || values.separateLoanBalance === false}
                    >
                      Same Account
                    </option>
                  </Form.Control>
                </li>
              </ul>
            </div>

            <div className={`estimated-annual-return ${hc('estimatedAnnualReturns')}`}>
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
                  checked={values.estimatedAnnualReturns === 'no' || values.estimatedAnnualReturns === false}
                  aria-checked={values.estimatedAnnualReturns === 'no' || values.estimatedAnnualReturns === false}
                />
                <label>
                  Use a calculation based on historical returns{' '}
                  <span className='mm-label b-primary-light w-100 d-inline ml-3'>Coming Soon!</span>
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
                  <Form.Control
                    onChange={handleChange}
                    type='number'
                    placeholder='5%'
                    name='estimatedAnnualReturns'
                    value={values.estimatedAnnualReturns}
                  />
                </span>
              </p>
            </div>

            {/* Estimated principal paydown */}
            <div className={`estimated-annual-return ${hc('estimatedAnnualPrincipalReduction')}`}>
              <div className='estimated-top-content flex-box'>
                <span className='form-subheading mr-0'>Estimated principal paydown</span>
                <span className='form-subheading-right'>This will be used to show projections in your charts.</span>
              </div>

              <p>
                <input type='radio' value='no' disabled defaultChecked={false} checked={false} aria-checked={false} />
                <label>
                  Use a calculation based on historical returns
                  <span className='mm-label b-primary-light w-100 d-inline ml-3'>Coming Soon!</span>
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
                  <Form.Control
                    onChange={handleChange}
                    type='number'
                    placeholder='12%'
                    name='estimatedAnnualPrincipalReduction'
                    value={values.estimatedAnnualPrincipalReduction}
                  />
                </span>
              </p>
            </div>

            {/* Current value */}
            <div className={`form-divider ${hc('useZestimate')}`}>
              <span className='form-subheading'>Current Value</span>
              <div className='d-flex align-items-start'>
                <div className='w-50 mr-2 d-flex flex-column'>
                  <div className='form-check ml-0 pl-0 mt-4 mb-5'>
                    <input
                      value='yes'
                      type='radio'
                      name='useZestimate'
                      aria-checked={false}
                      className='form-check-input ml-0'
                      onChange={handleChange}
                      checked={values.useZestimate === 'yes' || values.useZestimate === true}
                    />
                    <label className='form-check-label ml-4' htmlFor='useZestimate'>
                      Use Zestimate® for home value
                    </label>
                  </div>
                  <ZillowImage />
                </div>
                <div className='w-50 mr-2 d-flex flex-column'>
                  <div className='form-check ml-0 pl-0 mt-4 mb-5'>
                    <input
                      value='no'
                      type='radio'
                      name='useZestimate'
                      aria-checked={values.useZestimate === 'no' || values.useZestimate === false}
                      className='form-check-input ml-0'
                      onChange={handleChange}
                      checked={values.useZestimate === 'no' || values.useZestimate === false}
                    />
                    <label className='form-check-label ml-4' htmlFor='useZestimate'>
                      Use my own estimate
                    </label>
                  </div>
                  <Form.Control onChange={handleChange} type='number' name='ownEstimate' value={values.ownEstimate} />
                </div>
              </div>
            </div>

            {/* current value ends */}

            {/* associate mortgage and loan  */}
            <div className='account-type'>
              <ul className='account-type-list'>
                <li className={`mt-5 ${hc('associatedMortgage')}`}>
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
              </ul>
            </div>

            {/* associate mortgage and loan  ends */}

            {/* calculate equity */}
            <div className={`form-divider ${hc('calculateEquity')}`}>
              <div className='d-flex align-items-center justify-content-between'>
                <p>Calculated Equity</p>
                <p>{+values.ownEstimate - +values.loanBalance}</p>
              </div>
            </div>

            <div className={`form-row mt-0 ${hc('calculateReturnsOn')}`}>
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
                  Calculate based on money in and returns on that money
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
                  Calculate based on appreciation of the market value
                </label>
              </div>
            </div>

            <div className='estimate-annual-block'>
              <div className='estimated-top-content'>
                <div className='link-attention-block  d-flex justify-content-between hidden'>
                  <button className='btn btn-primary w-50 mm-button' type='button'>
                    Link Account
                  </button>
                  <div>
                    <NotLinked />
                    <span className='text--red'>Attention</span>
                  </div>
                </div>
                <span className='form-subheading hidden'>Closed Account</span>
                <div className='estimate-annual-block__checkbox hidden'>
                  <label className='custom-checkbox'>
                    <input type='checkbox' name='closeAccount' aria-checked={false} value='closeAccount' />
                    <span className='checkmark' />
                  </label>
                  <span className='ml-4'>Mark this account as closed</span>
                </div>
                <div className='row mt-5'>
                  <div className='col-12 col-md-4 hidden'>
                    <button
                      className='btn btn-danger estimate-annual-block__btn estimate-annual-block__btn-delete'
                      type='button'
                    >
                      Delete Account
                    </button>
                  </div>

                  <div className='col-12 col-md-8'>
                    <div className='d-flex justify-content-start'>
                      <button
                        className='bg-white cancel-btn mm-btn-primary-outline mr-2 estimate-annual-block__btn estimate-annual-block__btn-cancel'
                        type='button'
                      >
                        Cancel
                      </button>
                      <button
                        className='btn btn-primary ml-2 estimate-annual-block__btn estimate-annual-block__btn-save'
                        type='submit'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default AccountSettingForm;
