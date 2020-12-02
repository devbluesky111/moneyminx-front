
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import CircularSpinner from 'common/components/spinner/circular-spinner';
import MMToolTip from 'common/components/tooltip';
import useAssociateMortgage from 'auth/hooks/useAssociateMortgage';
import useAccountType from 'auth/hooks/useAccountType';
import useLoanAccount from 'auth/hooks/useLoanAccount';
import useAccountFilter from 'auth/hooks/useAccountFilter';
import useAccountSubtype from 'auth/hooks/useAccountSubtype';
import { Account } from 'auth/auth.types';
import { CurrencyOptions } from 'auth/enum/currency-options';
import { EmployerMatchLimitOptions } from 'auth/enum/employer-match-limit-options';
import { enumerateStr } from 'common/common-helper';
import { loginValidationSchema } from 'auth/auth.validation';
import { LiquidityOptions } from 'auth/enum/liquidity-options';
import { MMCategories } from 'auth/auth.enum';
import { makeFormFields } from 'auth/auth.helper';
import { patchAccount } from 'api/request.api';
import { SelectInput } from 'common/components/input/select.input';
import { ReactComponent as InfoIcon } from 'assets/images/signup/info.svg';
import { ReactComponent as SecurityIcon } from 'assets/images/signup/security.svg';
import { StringKeyObject } from 'common/common.types';

interface Props {
  currentAccount?: Account;
  closeSidebar?: () => void;
}

const ManualAccountForm: React.FC<Props> = ({ currentAccount, closeSidebar }) => {
  const [accountType, setAccountType] = useState('');
  const [accountSubtype, setAccountSubtype] = useState('');

  const { loading: fetchingAccountType, data: accountTypes, error } = useAccountType();
  const { subType: accountSubTypes, error: subTypeError } = useAccountSubtype(accountType);

  const { fetchingLoanAccount, loanAccountError } = useLoanAccount();
  const { fetchingMortgage, mortgageError } = useAssociateMortgage();
  const { accountFilters, error: filterError } = useAccountFilter(accountType, accountSubtype);

  /**
   * Set account type and account subtype
   * On current account changes
   */
  useEffect(() => {
    if (currentAccount) {
      setAccountType(currentAccount.category?.mmAccountType);
      setAccountSubtype(currentAccount.category?.mmAccountSubType);
    }
  }, [currentAccount]);

  /**
   * Set First sub type of the account subtypes array
   * Each time account subtypes changes
   */
  useEffect(() => {
    if (accountSubTypes?.length) {
      return setAccountSubtype(accountSubTypes[0]);
    }
  }, [accountSubTypes]);

  /**
   * Set account subtype for the first time
   */
  useEffect(() => {
    if (currentAccount?.category?.mmAccountSubType) {
      return setAccountSubtype(currentAccount?.category?.mmAccountSubType);
    }
  }, [currentAccount]);

  const hasError = error || subTypeError || filterError || mortgageError || loanAccountError;

  const isLoading = fetchingAccountType || fetchingMortgage || fetchingLoanAccount;

  if (hasError) {
    toast('Error occurred', { type: 'error' });
  }

  if (isLoading) {
    return <CircularSpinner />;
  }

  const formFields = accountFilters ? makeFormFields(accountFilters) : [];

  const hasField = (field: string) => formFields.includes(field);

  const hc = (field: string) => (hasField(field) ? '' : 'hidden');

  const currentFormFields = currentAccount?.accountDetails;

  const hasAccountSubType = accountSubTypes.some(Boolean);

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
        maturityDate: currentFormFields ? new Date(currentFormFields.maturityDate) : new Date(),
        investedDate: currentFormFields ? new Date(currentFormFields.investedDate) : new Date(),
        employerMatch: currentFormFields?.employerMatch || '',
        streetAddress: currentFormFields?.streetAddress || '',
        amountInvested: currentFormFields?.amountInvested || '',
        associatedLoan: currentFormFields?.associatedLoan || '',
        originationDate: currentFormFields ? new Date(currentFormFields.originationDate) : new Date(),
        originalBalance: currentFormFields?.originalBalance || '',
        paymentsPerYear: currentFormFields?.paymentsPerYear || '',
        calculatedEquity: currentFormFields?.calculatedEquity || '',
        currentValuation: currentFormFields?.currentValuation || '',
        termForInvestment: currentFormFields?.termForInvestment || '',
        businessStartDate: currentFormFields ? new Date(currentFormFields.businessStartDate) : new Date(),
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
          return toast('Error Occurred', { type: 'error' });
        }

        toast('Successfully updated', { type: 'success' });

        return window.location.reload();

      }}
    >
      {(props) => {
        const { setFieldValue, values, handleChange, setValues } = props;

        const setCategory = (cat: string) => {
          setFieldValue('mmCategory', cat);
        };

        const handleAccountChange = (e: React.ChangeEvent<any>) => {
          setAccountType(e.target.value);
          setAccountSubtype('');
          setValues({ ...values, [e.target.name]: e.target.value });
        };

        const handleSubAccountChange = (e: React.ChangeEvent<any>) => {
          setAccountSubtype(e.target.value);
          setValues({ ...values, [e.target.name]: e.target.value });
        };

        const handleSelectChange = (e: React.ChangeEvent<any>) => {
          setValues({ ...values, [e.target.name]: e.target.value });
        };

        return (
          <div className='bg-white credentials-wrapper account-setting'>
            <div className='credentials-content'>
              {closeSidebar && <div className='close-icon' onClick={closeSidebar}>✕</div>}
              <div className='top-content-wrap'>
                <h2>Manual accounts</h2>
                <p>
                  Manual accounts are offline accounts that you manage. Once you add the account, you will ba able to manage the value, holdings and transactions for this account.
              </p>
              </div>

              <div className='form-wrap'>
                <form onSubmit={props.handleSubmit} className='account-setting-form'>
                  <span className='form-subheading'>Account Name</span>
                  <input
                    type='text'
                    className='w-100 mb-4'
                    onChange={props.handleChange}
                    value={props.values.accountName}
                    name='accountName'
                    placeholder='Sapphire Credit Card'
                  />
                  <div className='account-category'>
                    <span className='form-subheading'>
                      Account Category
                      <MMToolTip placement='top' message='Investment Assets are accounts you track as investments and may consider adding or reducing to your position, Other Assets are worth money but you do not trade them such as your checking account or primary residence, Liabilities are things you owe like loans, mortgages and credit cards.'>
                        <InfoIcon />
                      </MMToolTip>
                    </span>
                    <ul className='category-list mb-4'>
                      {enumerateStr(MMCategories).map((cat: string, idx: number) => {
                        return (
                          <li className={values.mmCategory === cat ? 'active' : ''} onClick={() => setCategory(cat)} role='button' key={idx}>
                            <Link to='#'>
                              {cat}
                            </Link>
                          </li>
                        );
                      })}
                      <div className='border-bg-slider'></div>
                    </ul>
                  </div>
                  <div className='account-type'>
                    <ul className='account-type-list'>
                      <li>
                        <span className='form-subheading'>Account Type</span>
                        <SelectInput
                          args={accountTypes}
                          onChange={handleAccountChange}
                          value={values.mmAccountType}
                          name='mmAccountType'
                        />
                      </li>

                      <li className={hasAccountSubType ? '' : 'hidden'}>
                        <div className='account-list-content'>
                          <span className='form-subheading'>Account Subtype</span>
                          <SelectInput
                            args={accountSubTypes}
                            onChange={handleSubAccountChange}
                            value={values.mmAccountSubType}
                            name='mmAccountSubType'
                          />
                        </div>
                      </li>
                      <li>
                        <span className='form-subheading'>Currency</span>
                        <SelectInput
                          args={enumerateStr(CurrencyOptions)}
                          onChange={handleSelectChange}
                          value={values.currency}
                          name='currency'
                        />
                      </li>

                      <li>
                        <span className='form-subheading'>Liquidity</span>
                        <SelectInput
                          args={enumerateStr(LiquidityOptions)}
                          onChange={handleSelectChange}
                          value={values.liquidity}
                          name='liquidity'
                        />
                      </li>
                    </ul>
                  </div>

                  <div className='middle-input-wrap'>
                    <div className={`input-wrap performance flex-box d-flex justify-content-between`}>
                      <div className='left-input'>
                        <p>
                          <span className='form-subheading'>
                            Does your employer match contributions?
                          </span>
                        </p>
                      </div>
                      <div className='radio'>
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

                    {/* If employerMatchContribution is no hide this field */}
                    <div className={`input-wrap flex-box d-flex justify-content-between`}>
                      <div className='left-input'>
                        <p>
                          <span className='form-subheading'>Employer match</span>
                        </p>
                      </div>
                      <div className='width-47per'>
                        <div className='form-field-group'>
                          <Form.Control type='number' name='employerMatch' onChange={handleChange} placeholder='50' />
                          <span className='input-add-on'>%</span>
                        </div>
                      </div>
                    </div>
                    <p><span className='form-subheading'>Employer match limit</span></p>
                    <div className={`input-wrap flex-box d-flex justify-content-between`}>
                      <div className='left-input employer-match width-47per mt-3'>
                        <p>
                          <span className='employer-match-limits'>
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
                          </span>
                        </p>
                      </div>
                      <div className='width-47per'>
                        <div className='form-field-group'>
                          <Form.Control
                            type='number'
                            name='employerMatchLimit'
                            onChange={handleChange}
                            placeholder='5'
                            value={values.employerMatchLimit}
                          />
                          <span className='input-add-on'>
                            {values.employerMatchLimitIn === EmployerMatchLimitOptions.AMOUNT ? '$' : '%'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={`input-wrap performance flex-box d-flex justify-content-between`}>
                      <div className='left-input'>
                        <p>
                          <span className='form-subheading'>
                            Include employer match in performance?
                            <MMToolTip message='Some investors think employer match should be counted as income so they do not include it as performance returns, some believe should be counted as a return. The choice is yours'>
                              <InfoIcon className='sm-hide' />
                            </MMToolTip>
                          </span>
                        </p>
                      </div>
                      <div className='right-input radio'>
                        <div className='yes-no-radios'>
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
                    </div>
                  </div>

                  <div className={`estimated-annual-return`}>
                    <span className='form-subheading'>Estimated annual returns</span>
                    <span className='sub-label d-inline'>This will be used to show projections on your charts.</span>
                    <div className='form-field-group single-field'>
                      <Form.Control
                        onChange={handleChange}
                        type='number'
                        placeholder='5'
                        name='estimatedAnnualReturns'
                        value={values.estimatedAnnualReturns}
                      />
                      <span className='input-add-on'>%</span>
                    </div>
                  </div>

                  <div className='estimate-annual-block'>
                    <div className='estimated-top-content'>
                      <div className='row mt-5'>
                        <div className='col-12 col-md-4 mt-2'>
                          <button
                            className='btn btn-danger estimate-annual-block__btn estimate-annual-block__btn-delete'
                            type='button'
                          >
                            Delete Account
                          </button>
                        </div>
                        <div className='col-12 col-md-8 mt-2'>
                          <div className='d-flex justify-content-end'>
                            <button
                              className='mm-btn-signup btn-outline-primary mm-btn-animate estimate-annual-block__btn-cancel'
                              type='button'
                            >
                              Cancel
                            </button>
                            <button className='mm-btn-animate mm-btn-primary estimate-annual-block__btn-save' type='submit'>
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </form>

                <p className='flex-box learn-more-security'>
                  <SecurityIcon />
                  <a href='/security' target='_blank' className='purple-links'>
                    Learn about our security
                </a>
                </p>
              </div>
            </div>
          </div>

        );
      }}
    </Formik>
  );
};

export default ManualAccountForm;
