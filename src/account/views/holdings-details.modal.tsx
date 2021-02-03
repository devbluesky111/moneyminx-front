import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Tabs, Tab, Form } from 'react-bootstrap';

import moment from 'moment';
import { Formik } from 'formik';
import useToast from 'common/hooks/useToast';
import { Modal } from 'common/components/modal';
import { isCurrent } from 'common/interval-parser';
import { CurrencyOptions } from 'auth/enum/currency-options';
import { HoldingsDetailsModalProps } from 'account/account.type';
import { HoldingsModalTabs } from 'account/account.enum';
import { fNumber, numberWithCommas } from 'common/number.helper';
import { SelectInput } from 'common/components/input/select.input';
import { enumerateStr, formater, getUnique } from 'common/common-helper';
import { ReactComponent as DeleteIcon } from 'assets/icons/icon-delete.svg';
import { ReactComponent as AddNewIcon } from 'assets/images/account/AddNew.svg';
import { getDateFormattedString, getMonthYear, parseDateFromString } from 'common/moment.helper';
import { getClassification, getHoldingTypes, patchPosition, postPosition } from 'api/request.api';
import { HoldingsTypeUpperOptions, HoldingsTypeLowerOptions } from 'account/enum/holdings-type-upper-options';
import DeleteHoldingPosition from 'account/components/delete-holding-position';

import { HoldingTypeSelectInput } from './holding-type-select.input';
import { ClassificationsSelectInput } from './classifications.select.input';

export const gc = (interval: string) => (isCurrent(interval) ? 'current-m' : '');

export const formatHoldingTypeAmount = (str: string) => {
  if (enumerateStr(HoldingsTypeUpperOptions).includes(str)) {
    return str;
  }
  if (enumerateStr(HoldingsTypeLowerOptions).includes(str)) {
    return str.toUpperCase();
  }
  if (!str) {
    return '';
  }
  const newStr = str?.[0].toUpperCase() + str.slice(1);
  const strArr = newStr.split(/(?=[A-Z])/);
  return strArr?.join(' ');
};

const HoldingsDetailsModal: React.FC<HoldingsDetailsModalProps> = ({
  accountId,
  handleRefresh,
  currencySymbol,
  holdingsDetails,
  holdingsDetailsModal,
  closeNewPositionModal,
  closeEditPositionModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState<string[]>([]);
  const [classificationForTypes, setClassificationForTypes] = useState<string[]>([]);
  const [classificationForAssetClass, setClassificationForAssetClass] = useState<string[]>([]);
  const [classificationForCountry, setClassificationForCountry] = useState<string[]>([]);
  const [classificationForRisk, setClassificationForRisk] = useState<string[]>([]);
  const [holdingTypes, setHoldingTypes] = useState<string[]>([]);
  const [unClassifiedTypeValue, setUnClassifiedTypeValue] = useState<number>(0);
  const [unClassifiedAssetClassValue, setUnClassifiedAssetClassValue] = useState<number>(0);
  const [unClassifiedCountryValue, setUnClassifiedCountryValue] = useState<number>(0);
  const [unClassifiedRiskValue, setUnClassifiedRiskValue] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>(HoldingsModalTabs.DETAILS);
  const { mmToast } = useToast();

  const handleCancel = () => {
    holdingsDetailsModal.close();
  };

  const fetchClassification = () => {
    const filters = ['Type', 'Asset Class', 'Country', 'Risk'];
    filters.map(async (filter) => {
      const { data, error } = await getClassification(filter);
      const index = data.indexOf('Unclassified');
      if (index !== -1) {
        data.splice(index, 1);
      }
      if (!error) {
        switch (filter) {
          case 'Type':
            setClassificationForTypes(data);
            break;
          case 'Asset Class':
            setClassificationForAssetClass(data);
            break;
          case 'Country':
            setClassificationForCountry(data);
            break;
          case 'Risk':
            setClassificationForRisk(data);
            break;
        }
      }
    });
  };

  const fetchHoldingTypes = async () => {
    const { data, error } = await getHoldingTypes();
    if (!error) {
      setHoldingTypes(data);
    }
  };

  useEffect(() => {
    fetchClassification();
    fetchHoldingTypes();
  }, []);


  useEffect(() => {
    const _years = [];
    for (let i = 0; i < holdingsDetails?.intervalValues.length; i++) {
      if (holdingsDetails?.intervalValues[i].interval.split(' ')[1]) {
        _years.push(holdingsDetails?.intervalValues[i].interval.split(' ')[1]);
      }
    }

    if (holdingsDetails) {
      Object.keys(holdingsDetails?.classifications).forEach((key: any) => {
        const value = (holdingsDetails?.classifications as any)[key];
        let defaultClassificationExist = false;
        for (let i = 0; i < value.length; i++) {
          if (value[i].classificationValue === 'Unclassified') {
            value.splice(i, 1);
            i--;
          }
          if (value[i] && value[i].classificationValue === '') {
            defaultClassificationExist = true;
          }
        }
        if (!defaultClassificationExist) {
          value.push({
            accountId: holdingsDetails?.accountId,
            allocation: 0,
            classificationType: key,
            classificationValue: '',
            positionId: holdingsDetails?.id,
            yodleeId: null,
          });
        }
      });
    }

    const uniqueYears = getUnique(_years);
    setYears(uniqueYears);
  }, [holdingsDetails, holdingsDetailsModal]);

  // new position
  let yearsArr: any[] = [];
  const cYear = new Date().getFullYear();
  if (holdingsDetails) {
    yearsArr = years;
  } else {
    yearsArr = [(cYear - 1).toString(), cYear.toString(), (cYear + 1).toString()];
  }

  const getAmount = (values: any, i: any, currencySymbol: string) => {
    const todayValue = values.originalValues.filter((monthlyValue: any) => monthlyValue.interval === 'Today')[0];
    const todayAmount = todayValue?.price * todayValue?.quantity;
    const amount =
      isCurrent(i.interval) && todayAmount
        ? numberWithCommas(fNumber(todayAmount, 2))
        : numberWithCommas(fNumber(i.price * i.quantity, 2));

    if (amount !== '0') {
      return currencySymbol + amount;
    }

    if (i.type === 'projection') {
      return i.value ? currencySymbol + i.value : '--';
    }

    return '--';
  };

  const tabsControl = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        holdingType: holdingsDetails?.holdingType || '',
        securityType: holdingsDetails?.securityType || '',
        value: holdingsDetails?.value || null,
        price: holdingsDetails?.price || null,
        priceCurrency: holdingsDetails?.priceCurrency || CurrencyOptions.USD,
        symbol: holdingsDetails?.symbol || '',
        quantity: holdingsDetails?.quantity || null,
        costBasis: holdingsDetails?.costBasis || null,
        costBasisCurrency: holdingsDetails?.costBasisCurrency || CurrencyOptions.USD,
        cusipNumber: holdingsDetails?.cusipNumber || '',
        isin: holdingsDetails?.isin || '',
        sedol: holdingsDetails?.sedol || '',
        isShort: holdingsDetails?.isShort || false,
        unvestedQuantity: holdingsDetails?.unvestedQuantity || null,
        unvestedValue: holdingsDetails?.unvestedValue || null,
        unvestedValueCurrency: holdingsDetails?.unvestedValueCurrency || CurrencyOptions.USD,
        vestedQuantity: holdingsDetails?.vestedQuantity || null,
        vestedSharesExercisable: holdingsDetails?.vestedSharesExercisable || null,
        vestedValue: holdingsDetails?.vestedValue || null,
        vestedValueCurrency: holdingsDetails?.vestedValueCurrency || CurrencyOptions.USD,
        vestedDate: holdingsDetails && holdingsDetails.vestedDate ? new Date(holdingsDetails.vestedDate) : null,
        contractQuantity: holdingsDetails?.contractQuantity || null,
        couponRate: holdingsDetails?.couponRate || null,
        exercisedQuantity: holdingsDetails?.exercisedQuantity || null,
        expirationDate:
          holdingsDetails && holdingsDetails.expirationDate ? new Date(holdingsDetails.expirationDate) : null,
        grantDate: holdingsDetails && holdingsDetails.grantDate ? new Date(holdingsDetails.grantDate) : null,
        interestRate: holdingsDetails?.interestRate || null,
        maturityDate: holdingsDetails && holdingsDetails.maturityDate ? new Date(holdingsDetails.maturityDate) : null,
        optionType: holdingsDetails?.optionType || '',
        spread: holdingsDetails?.spread || null,
        spreadCurrency: holdingsDetails?.spreadCurrency || CurrencyOptions.USD,
        strikePrice: holdingsDetails?.strikePrice || null,
        strikePriceCurrency: holdingsDetails?.strikePriceCurrency || CurrencyOptions.USD,
        term: holdingsDetails?.term || '',
        matchStatus: holdingsDetails?.matchStatus || '',
        accruedInterest: holdingsDetails?.accruedInterest || null,
        accruedInterestCurrency: holdingsDetails?.accruedInterestCurrency || CurrencyOptions.USD,
        accruedIncome: holdingsDetails?.accruedIncome || null,
        accruedIncomeCurrency: holdingsDetails?.accruedIncomeCurrency || CurrencyOptions.USD,
        description: holdingsDetails?.description || '',
        originalClassifications: holdingsDetails?.classifications || {
          Type: [
            {
              allocation: 100,
              classificationType: 'Type',
              classificationValue: 'Unclassified',
            },
          ],
          'Asset Class': [
            {
              allocation: 100,
              classificationType: 'Asset Class',
              classificationValue: 'Unclassified',
            },
          ],
          Country: [
            {
              allocation: 100,
              classificationType: 'Country',
              classificationValue: 'Unclassified',
            },
          ],
          Risk: [
            {
              allocation: 100,
              classificationType: 'Risk',
              classificationValue: 'Unclassified',
            },
          ],
        },
        originalValues: holdingsDetails?.intervalValues || [
          { date: new Date(), interval: 'Today', value: null, price: null, quantity: null },
          { date: new Date(), interval: getMonthYear(new Date()), value: null, price: null, quantity: null },
        ],
        accountId,
      }}
      onSubmit={async (values: any, actions: any) => {
        const positionId = holdingsDetails?.id;

        const _classifications: any[] = [];
        Object.keys(values.originalClassifications).forEach((key: any) => {
          const value = (values.originalClassifications as any)[key];
          for (let i = 0; i < value.length; i++) {
            if (!value[i].classificationValue) {
              value.splice(i, 1);
              i--;
            }
          }

          for (let i = 0; i < value.length; i++) {
            if (value[i]) {
              _classifications.push(value[i]);
            }
          }

          let allocation = 0;
          switch (key) {
            case 'Type':
              allocation = unClassifiedTypeValue;
              break;
            case 'Asset Class':
              allocation = unClassifiedAssetClassValue;
              break;
            case 'Country':
              allocation = unClassifiedCountryValue;
              break;
            case 'Risk':
              allocation = unClassifiedRiskValue;
              break;
          }
          _classifications.push({
            accountId: holdingsDetails?.accountId,
            allocation,
            classificationType: key,
            classificationValue: 'Unclassified',
            positionId: holdingsDetails?.id,
            yodleeId: null,
          });
        });

        const _values: any[] = [];

        for (let i = 0; i < values.originalValues.length; i++) {
          const _originalValue = values.originalValues[i];
          _originalValue.date = parseDateFromString(values.originalValues[i].interval);
          _originalValue.value = values.originalValues[i].price * values.originalValues[i].quantity;
          if (_originalValue.value || _originalValue.interval === 'Today') {
            _values.push(_originalValue);
          }
        }

        let data = {};

        if (holdingsDetails && !holdingsDetails?.isManual) {
          data = { classifications: _classifications };
        } else {
          data = { classifications: _classifications, values: _values };
        }

        Object.keys(values).forEach((key: any) => {
          const value = (values as any)[key];

          if (value === '') {
            data = { ...data, [key]: undefined };
            return;
          }

          data = { ...data, [key]: value };
        });

        setLoading(true);
        if (positionId) {
          const res = await patchPosition(`${positionId}`, data);
          if (res?.error) {
            setLoading(false);
            return mmToast('Error Occurred', { type: 'error' });
          }
          setLoading(false);
          closeEditPositionModal?.();
          holdingsDetailsModal.close();
          return mmToast('Successfully updated', { type: 'success' });
        }

        // new position
        const res = await postPosition(data);
        if (res?.error) {
          setLoading(false);
          return mmToast('Error Occurred', { type: 'error' });
        }
        setLoading(false);
        closeNewPositionModal?.();
        holdingsDetailsModal.close();
        return mmToast('Successfully Added', { type: 'success' });
      }}
    >
      {(props) => {
        const { values, handleChange, setValues, setFieldValue } = props;

        const handleSelectChange = (e: React.ChangeEvent<any>) => {
          setValues({ ...values, [e.target.name]: e.target.value });
        };

        const handleMonthlyPriceChange = (e: React.ChangeEvent<any>, interval: string) => {
          const _values = values.originalValues;
          for (let i = 0; i < _values.length; i++) {
            if (isCurrent(interval) && _values[i].interval === 'Today') {
              _values[i].price = parseFloat(e.target.value);
              break;
            }
            if (_values[i].interval === e.target.id) {
              _values[i].price = parseFloat(e.target.value);
            }
          }
          setValues({ ...values, originalValues: _values });
        };

        const handleMonthlyNewPriceChange = (value: string, e: any) => {
          const _values = values.originalValues;
          let existStatus = false;
          for (let i = 0; i < _values.length; i++) {
            if (_values[i].interval === value) {
              existStatus = true;
              _values[i].price = parseFloat(e.target.value);
            }
          }
          if (!existStatus) {
            _values.push({ date: new Date(value), price: parseFloat(e.target.value), interval: value });
          }
          setValues({ ...values, originalValues: _values });
        };

        const handleMonthlyQuantityChange = (e: React.ChangeEvent<any>, interval: string) => {
          const _values = values.originalValues;
          for (let i = 0; i < _values.length; i++) {
            if (isCurrent(interval) && _values[i].interval === 'Today') {
              _values[i].quantity = parseFloat(e.target.value);
              break;
            }
            if (_values[i].interval === e.target.id) {
              _values[i].quantity = parseFloat(e.target.value);
            }
          }
          setValues({ ...values, originalValues: _values });
        };

        const handleMonthlyNewQuantityChange = (value: string, e: any) => {
          const _values = values.originalValues;
          let existStatus = false;
          for (let i = 0; i < _values.length; i++) {
            if (_values[i].interval === value) {
              existStatus = true;
              _values[i].quantity = parseFloat(e.target.value);
            }
          }
          if (!existStatus) {
            _values.push({ date: new Date(value), quantity: e.target.value, interval: value });
          }
          setValues({ ...values, originalValues: _values });
        };

        const handleClassificationsAllocationChange = (tabName: string, e: any) => {
          const _classifications = values.originalClassifications;
          for (let i = 0; i < _classifications[`${tabName}`].length; i++) {
            if (_classifications[`${tabName}`][i].classificationValue === e.target.id) {
              _classifications[`${tabName}`][i].allocation = parseFloat(e.target.value);
            }
          }
          setValues({ ...values, originalClassifications: _classifications });
        };

        const handleClassificationsValueChange = (tabName: string, e: any) => {
          const _classifications = values.originalClassifications;
          for (let i = 0; i < _classifications[`${tabName}`].length; i++) {
            if (_classifications[`${tabName}`][i].classificationValue === e.target.id) {
              _classifications[`${tabName}`][i].classificationValue = e.target.value;
              break;
            }
          }
          setValues({ ...values, originalClassifications: _classifications });
        };

        const addNewClassification = (tabName: string) => {
          const _classifications = values.originalClassifications;

          _classifications[`${tabName}`].push({
            accountId: holdingsDetails?.accountId,
            allocation: 0,
            classificationType: `${tabName}`,
            classificationValue: '',
            positionId: holdingsDetails?.id,
            yodleeId: null,
          });
          setValues({ ...values, originalClassifications: _classifications });
        };

        const deleteClassification = (tabName: string, item: any) => {
          const _classifications = values.originalClassifications;
          for (let i = 0; i < _classifications[`${tabName}`].length; i++) {
            if (_classifications[`${tabName}`][i].classificationValue === item.classificationValue) {
              _classifications[`${tabName}`].splice(i, 1);
            }
          }
          setValues({ ...values, originalClassifications: _classifications });
        };

        const handleIsShortChange = (e: React.ChangeEvent<any>) => {
          const isShort = e.target.value === 'yes';
          setValues({ ...values, isShort });
        };

        const getUnclassifiedRest = (tabName: string) => {
          const _classifications = values.originalClassifications;

          let sum = 0;
          for (let i = 0; i < _classifications[`${tabName}`].length; i++) {
            const allocation = _classifications[`${tabName}`][i].allocation || 0;
            sum += allocation;
          }
          switch (tabName) {
            case 'Type':
              setUnClassifiedTypeValue(100 - sum);
              break;
            case 'Asset Class':
              setUnClassifiedAssetClassValue(100 - sum);
              break;
            case 'Country':
              setUnClassifiedCountryValue(100 - sum);
              break;
            case 'Risk':
              setUnClassifiedRiskValue(100 - sum);
              break;
          }

          return 100 - sum;
        };

        return (
          <form onSubmit={props.handleSubmit}>
            <Modal
              {...holdingsDetailsModal.props}
              title={holdingsDetails?.description || 'New Position'}
              size='xxl'
              canBeClosed
              onClose={() => {
                holdingsDetailsModal.close();
              }}
            >
              <div className='modal-wrapper mm-holdings-details-modal'>
                {holdingsDetails && (
                  <span className='description'>
                    {!holdingsDetails?.isManual
                      ? 'To maintain integrity of the data with your institution you can only update a few of the fields.'
                      : 'With manual accounts, you can update whichever fields you need'}
                  </span>
                )}
                <div className='mm-holdings-details-modal__title mt-3'>
                  <Tabs
                    transition={false}
                    id='holdings-details-modal'
                    activeKey={activeTab}
                    onSelect={(k) => tabsControl(k ? k : '')}
                  >
                    <Tab eventKey='details' title='Details'>
                      {holdingsDetails ? (
                        <>
                          {!holdingsDetails?.isManual ? (
                            <div className='row mt-4'>
                              <div className='col-sm'>
                                <div className='row mt-1'>
                                  <div className='col-sm key'>General Details</div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Description</div>
                                  <div className='col-sm'>{values.description}</div>
                                </div>
                                {values.holdingType && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Holding Type</div>
                                    <div className='col-sm'>{formatHoldingTypeAmount(values.holdingType)}</div>
                                  </div>
                                )}
                                {values.securityType && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Security Type</div>
                                    <div className='col-sm'>{formater(values.securityType)}</div>
                                  </div>
                                )}
                                {values.symbol !== null && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Symbol</div>
                                    <div className='col-sm'>{values.symbol}</div>
                                  </div>
                                )}
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Cost</div>
                                  <div className='col-sm '>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='costBasis'
                                        value={values.costBasis || ''}
                                      />
                                      <span className='input-add-on'>{currencySymbol}</span>
                                    </div>
                                  </div>
                                </div>
                                {values.cusipNumber && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>CUSIP</div>
                                    <div className='col-sm'>{values.cusipNumber}</div>
                                  </div>
                                )}
                                {values.isin && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>ISIN</div>
                                    <div className='col-sm'>{values.isin}</div>
                                  </div>
                                )}
                                {values.sedol && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>SEDOL</div>
                                    <div className='col-sm'>{values.sedol}</div>
                                  </div>
                                )}
                                {values.isShort && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Short?</div>
                                    <div className='col-sm'>{values.isShort ? 'Yes' : 'No'}</div>
                                  </div>
                                )}
                              </div>
                              <div className='col-sm'>
                                {((values.optionType !== 'unknown' && values.optionType) ||
                                  values.vestedQuantity ||
                                  values.vestedSharesExercisable ||
                                  values.vestedValue ||
                                  values.vestedDate ||
                                  values.unvestedQuantity ||
                                  values.unvestedValue ||
                                  values.exercisedQuantity ||
                                  values.expirationDate ||
                                  values.grantDate ||
                                  values.spread ||
                                  values.strikePrice) && (
                                  <div className='row mt-1'>
                                    <div className='col-sm key'>Options and Stock Options</div>
                                  </div>
                                )}
                                {values.optionType !== 'unknown' && values.optionType && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Option Type</div>
                                    <div className='col-sm'>{values.optionType}</div>
                                  </div>
                                )}
                                {values.vestedQuantity && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Vested Quantity</div>
                                    <div className='col-sm'>{values.vestedQuantity}</div>
                                  </div>
                                )}
                                {values.vestedSharesExercisable && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Vested Shares Exercisable</div>
                                    <div className='col-sm'>{values.vestedSharesExercisable}</div>
                                  </div>
                                )}
                                {values.vestedValue && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Vested Value</div>
                                    <div className='col-sm'>{values.vestedValue}</div>
                                  </div>
                                )}
                                {values.vestedDate && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Vested Date</div>
                                    <div className='col-sm'>{getDateFormattedString(values.vestedDate)}</div>
                                  </div>
                                )}
                                {values.unvestedQuantity && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Unvested Quantity</div>
                                    <div className='col-sm'>{values.unvestedQuantity}</div>
                                  </div>
                                )}
                                {values.unvestedValue && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Unvested Value</div>
                                    <div className='col-sm'>{values.unvestedValue}</div>
                                  </div>
                                )}
                                {values.unvestedValue && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Unvested Currency</div>
                                    <div className='col-sm'>{values.unvestedValueCurrency}</div>
                                  </div>
                                )}
                                {values.exercisedQuantity && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Exercised Quantity</div>
                                    <div className='col-sm'>{values.exercisedQuantity}</div>
                                  </div>
                                )}
                                {values.expirationDate && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Expiration Date</div>
                                    <div className='col-sm'>{getDateFormattedString(values.expirationDate)}</div>
                                  </div>
                                )}
                                {values.grantDate && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Grant Date</div>
                                    <div className='col-sm'>{getDateFormattedString(values.grantDate)}</div>
                                  </div>
                                )}
                                {values.spread && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Spread</div>
                                    <div className='col-sm'>{values.spread}</div>
                                  </div>
                                )}
                                {values.strikePrice && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Strike Price</div>
                                    <div className='col-sm'>
                                      {currencySymbol}
                                      {values.strikePrice}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className='col-sm'>
                                {(values.couponRate ||
                                  values.interestRate ||
                                  values.maturityDate ||
                                  values.term ||
                                  values.accruedInterest ||
                                  values.accruedIncome ||
                                  values.contractQuantity) && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm key'>CDs, Bonds and Loans</div>
                                  </div>
                                )}
                                {values.couponRate && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Coupon</div>
                                    <div className='col-sm'>{values.couponRate}</div>
                                  </div>
                                )}
                                {values.interestRate && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Interest Rate</div>
                                    <div className='col-sm'>{values.interestRate}</div>
                                  </div>
                                )}
                                {values.maturityDate && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Maturity Date</div>
                                    <div className='col-sm'>{getDateFormattedString(values.maturityDate)}</div>
                                  </div>
                                )}
                                {values.term && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Term</div>
                                    <div className='col-sm'>{values.term}</div>
                                  </div>
                                )}
                                {values.accruedInterest && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Accrued Interest</div>
                                    <div className='col-sm'>{values.accruedInterest}</div>
                                  </div>
                                )}
                                {values.accruedIncome && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Accrued Income</div>
                                    <div className='col-sm'>{values.accruedIncome}</div>
                                  </div>
                                )}
                                {values.contractQuantity && (
                                  <div className='row mt-5'>
                                    <div className='col-sm key'>Futures and Commodities</div>
                                  </div>
                                )}
                                {values.contractQuantity && (
                                  <div className='row mt-2 align-items-center'>
                                    <div className='col-sm'>Contract Quantity</div>
                                    <div className='col-sm'>{values.contractQuantity}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className='row mt-4'>
                              <div className='col-sm'>
                                <div className='row mt-1'>
                                  <div className='col-sm key'>General Details</div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Description</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        name='description'
                                        value={values.description || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Holding Type</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <HoldingTypeSelectInput
                                        args={holdingTypes}
                                        onChange={handleSelectChange}
                                        value={values.holdingType}
                                        name='holdingType'
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Cost</div>
                                  <div className='col-sm '>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='costBasis'
                                        value={values.costBasis || ''}
                                      />
                                      <span className='input-add-on'>{currencySymbol}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>CUSIP</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        name='cusipNumber'
                                        value={values.cusipNumber || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>ISIN</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control onChange={handleChange} name='isin' value={values.isin || ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>SEDOL</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control onChange={handleChange} name='sedol' value={values.sedol || ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Short?</div>
                                  <div className='col-sm mt-2'>
                                    <div className='radio-custom'>
                                      <input
                                        type='radio'
                                        value='yes'
                                        onChange={handleIsShortChange}
                                        name='isShort'
                                        checked={values.isShort === 'yes' || values.isShort === true}
                                        aria-checked={!!values.isShort}
                                      />
                                      <label>Yes</label>
                                      <input
                                        onChange={handleIsShortChange}
                                        type='radio'
                                        value='no'
                                        name='isShort'
                                        checked={values.isShort === 'no' || values.isShort === false}
                                        aria-checked={!!values.isShort}
                                      />
                                      <label>No</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm'>
                                <div className='row mt-1'>
                                  <div className='col-sm key'>Options and Stock Options</div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Option Type</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <SelectInput
                                        args={['Call', 'Put']}
                                        onChange={handleSelectChange}
                                        value={values.optionType}
                                        name='optionType'
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Vested Quantity</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='vestedQuantity'
                                        value={values.vestedQuantity || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Vested Shares Exercisable</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='vestedSharesExercisable'
                                        value={values.vestedSharesExercisable || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Vested Value</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='vestedValue'
                                        value={values.vestedValue || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Vested Date</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <ReactDatePicker
                                        name='vestedDate'
                                        selected={values.vestedDate ? new Date(values.vestedDate) : null}
                                        onChange={(val: Date) => {
                                          setFieldValue('vestedDate', moment(val).toISOString());
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Unvested Quantity</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='unvestedQuantity'
                                        value={values.unvestedQuantity || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Unvested Value</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='unvestedValue'
                                        value={values.unvestedValue || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Exercised Quantity</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='exercisedQuantity'
                                        value={values.exercisedQuantity || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Expiration Date</div>
                                  <div className='col-sm'>
                                    <ReactDatePicker
                                      name='expirationDate'
                                      selected={values.expirationDate ? new Date(values.expirationDate) : null}
                                      onChange={(val: Date) => {
                                        setFieldValue('expirationDate', moment(val).toISOString());
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Grant Date</div>
                                  <div className='col-sm'>
                                    <ReactDatePicker
                                      name='grantDate'
                                      selected={values.grantDate ? new Date(values.grantDate) : null}
                                      onChange={(val: Date) => {
                                        setFieldValue('grantDate', moment(val).toISOString());
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Strike Price</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='strikePrice'
                                        value={values.strikePrice || ''}
                                      />
                                      <span className='input-add-on'>{currencySymbol}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-sm'>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm key'>CDs, Bonds and Loans</div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Coupon</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='couponRate'
                                        value={values.couponRate || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Interest Rate</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='interestRate'
                                        value={values.interestRate || ''}
                                      />
                                      <span className='input-add-on'>%</span>
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Maturity Date</div>
                                  <div className='col-sm'>
                                    <ReactDatePicker
                                      name='maturityDate'
                                      selected={values.maturityDate ? new Date(values.maturityDate) : null}
                                      onChange={(val: Date) => {
                                        setFieldValue('maturityDate', moment(val).toISOString());
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Term</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control onChange={handleChange} name='term' value={values.term || ''} />
                                    </div>
                                  </div>
                                </div>
                                <div className='row mt-5'>
                                  <div className='col-sm key'>Futures and Commodities</div>
                                </div>
                                <div className='row mt-2 align-items-center'>
                                  <div className='col-sm'>Contract Quantity</div>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <Form.Control
                                        onChange={handleChange}
                                        type='number'
                                        name='contractQuantity'
                                        value={values.contractQuantity || ''}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className='row mt-4'>
                          <div className='col-sm'>
                            <div className='row mt-1'>
                              <div className='col-sm key'>General Details</div>
                            </div>
                            <div className='row mt-2 align-items-center'>
                              <div className='col-sm-3'>Name</div>
                              <div className='col-sm-6'>
                                <div className='form-field-group'>
                                  <Form.Control
                                    onChange={handleChange}
                                    name='description'
                                    value={values.description || ''}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='row mt-2 align-items-center'>
                              <div className='col-sm-3'>Type</div>
                              <div className='col-sm-6'>
                                <div className='form-field-group'>
                                  <HoldingTypeSelectInput
                                    args={holdingTypes}
                                    onChange={handleSelectChange}
                                    value={values.holdingType}
                                    name='holdingType'
                                  />
                                </div>
                              </div>
                            </div>
                            <div className='row mt-2 align-items-center'>
                              <div className='col-sm-3'>Cost</div>
                              <div className='col-sm-6'>
                                <div className='form-field-group'>
                                  <Form.Control
                                    onChange={handleChange}
                                    type='number'
                                    name='costBasis'
                                    value={values.costBasis || ''}
                                  />
                                  <span className='input-add-on'>{currencySymbol}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className='action-wrapper mt-3'>
                        <DeleteHoldingPosition
                          holdingDetails={holdingsDetails}
                          onDelete={() => {
                            handleRefresh();
                            holdingsDetailsModal.close();
                          }}
                        />
                        <button className='btn-outline-primary mm-btn-animate' onClick={handleCancel} type='button'>
                          Back
                        </button>
                        <button
                          className='mm-btn-animate mm-btn-primary d-flex align-items-center justify-content-center'
                          onClick={() => tabsControl(HoldingsModalTabs.MONTHLYVALUES)}
                          type='button'
                        >
                          Next
                        </button>
                      </div>
                    </Tab>
                    <Tab eventKey='monthlyValues' title='Monthly Values' className='monthly-values-sub-tabs'>
                      <Tabs
                        defaultActiveKey={new Date().getFullYear()}
                        id='monthly-value-sub-tab'
                        className='mt-3'
                        style={{ maxWidth: yearsArr.length >= 4 ? '536.5px' : '403.5px' }}
                      >
                        {yearsArr?.map((item, index) => (
                          <Tab eventKey={item} title={item} key={index}>
                            {holdingsDetails && !holdingsDetails?.isManual ? (
                              <div className='row mt-4'>
                                <div className='col-sm'>
                                  <div className='row pt-2 pb-2 align-items-center'>
                                    <div className='col-sm table-heading'>Month</div>
                                    <div className='col-sm table-heading'>Price</div>
                                    <div className='col-sm table-heading'>Quantity</div>
                                    <div className='col-sm table-heading'>Amount</div>
                                  </div>
                                  {['January', 'February', 'March', 'April', 'May', 'June'].map((monItem, monIndex) => (
                                    <div
                                      className={[
                                        'row pt-2 pb-2 align-items-center',
                                        monIndex % 2 === 1 ? 'liner-gradient' : '',
                                      ].join(' ')}
                                      key={monIndex}
                                    >
                                      <div className={[`col-sm key`, gc(`${monItem.substr(0, 3)} ${item}`)].join(' ')}>
                                        {monItem}
                                      </div>
                                      <div className='col-sm'>
                                        {values.originalValues.filter(
                                          (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                        ).length > 0 ? (
                                          values.originalValues
                                            .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                            .map((i: any, k: number) => (
                                              <div className='form-field-group' key={k}>
                                                {isCurrent(i.interval)
                                                  ? values.originalValues.filter(
                                                      (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                    )?.[0]
                                                    ? currencySymbol +
                                                      numberWithCommas(
                                                        fNumber(
                                                          values.originalValues.filter(
                                                            (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                          )?.[0]?.price,
                                                          2
                                                        )
                                                      )
                                                    : '--'
                                                  : i.price
                                                  ? currencySymbol + numberWithCommas(fNumber(i.price, 2))
                                                  : '--'}
                                              </div>
                                            ))
                                        ) : (
                                          <span>--</span>
                                        )}
                                      </div>
                                      <div className='col-sm'>
                                        {values.originalValues.filter(
                                          (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                        ).length > 0 ? (
                                          values.originalValues
                                            .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                            .map((i: any, k: number) => (
                                              <div className='form-field-group' key={k}>
                                                {isCurrent(i.interval)
                                                  ? values.originalValues.filter(
                                                      (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                    )?.[0]
                                                    ? values.originalValues.filter(
                                                        (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                      )?.[0].quantity
                                                    : '--'
                                                  : i.quantity || '--'}
                                              </div>
                                            ))
                                        ) : (
                                          <span>--</span>
                                        )}
                                      </div>
                                      <div className='col-sm'>
                                        {values.originalValues.filter(
                                          (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                        ).length > 0 ? (
                                          values.originalValues
                                            .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                            .map((i: any, k: number) => (
                                              <div className='form-field-group' key={k}>
                                                {i.value ? currencySymbol : ''}
                                                {i.type === 'projection'
                                                  ? numberWithCommas(fNumber(i.value, 2))
                                                  : i.price && i.quantity
                                                  ? numberWithCommas(fNumber(i.price * i.quantity, 2))
                                                  : '--'}
                                              </div>
                                            ))
                                        ) : (
                                          <span>--</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className='col-sm'>
                                  <div className='row pt-2 pb-2 align-items-center'>
                                    <div className='col-sm table-heading'>Month</div>
                                    <div className='col-sm table-heading'>Price</div>
                                    <div className='col-sm table-heading'>Quantity</div>
                                    <div className='col-sm table-heading'>Amount</div>
                                  </div>
                                  {['July', 'August', 'September', 'October', 'November', 'December'].map(
                                    (monItem, monIndex) => (
                                      <div
                                        className={[
                                          'row pt-2 pb-2 align-items-center',
                                          monIndex % 2 === 1 ? 'liner-gradient' : '',
                                        ].join(' ')}
                                        key={monIndex}
                                      >
                                        <div
                                          className={[`col-sm key`, gc(`${monItem.substr(0, 3)} ${item}`)].join(' ')}
                                        >
                                          {monItem}
                                        </div>
                                        <div className='col-sm'>
                                          {values.originalValues.filter(
                                            (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                          ).length > 0 ? (
                                            values.originalValues
                                              .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                              .map((i: any, k: number) => (
                                                <div className='form-field-group' key={k}>
                                                  {isCurrent(i.interval)
                                                    ? values.originalValues.filter(
                                                        (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                      )?.[0]
                                                      ? currencySymbol +
                                                        numberWithCommas(
                                                          fNumber(
                                                            values.originalValues.filter(
                                                              (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                            )?.[0]?.price,
                                                            2
                                                          )
                                                        )
                                                      : '--'
                                                    : i.price
                                                    ? currencySymbol + numberWithCommas(fNumber(i.price, 2))
                                                    : '--'}
                                                </div>
                                              ))
                                          ) : (
                                            <span>--</span>
                                          )}
                                        </div>
                                        <div className='col-sm'>
                                          {values.originalValues.filter(
                                            (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                          ).length > 0 ? (
                                            values.originalValues
                                              .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                              .map((i: any, k: number) => (
                                                <div className='form-field-group' key={k}>
                                                  {isCurrent(i.interval)
                                                    ? values.originalValues.filter(
                                                        (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                      )?.[0]
                                                      ? values.originalValues.filter(
                                                          (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                        )?.[0].quantity
                                                      : '--'
                                                    : i.quantity || '--'}
                                                </div>
                                              ))
                                          ) : (
                                            <span>--</span>
                                          )}
                                        </div>
                                        <div className='col-sm'>
                                          {values.originalValues.filter(
                                            (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                          ).length > 0 ? (
                                            values.originalValues
                                              .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                              .map((i: any, k: number) => (
                                                <div className='form-field-group' key={k}>
                                                  {i.value ? currencySymbol : ''}
                                                  {i.type === 'projection'
                                                    ? numberWithCommas(fNumber(i.value, 2))
                                                    : i.price && i.quantity
                                                    ? numberWithCommas(fNumber(i.price * i.quantity, 2))
                                                    : '--'}
                                                </div>
                                              ))
                                          ) : (
                                            <span>--</span>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className='row mt-4'>
                                <div className='col-sm'>
                                  <div className='row pt-2 pb-2 align-items-center'>
                                    <div className='col-sm'>Month</div>
                                    <div className='col-sm'>Price</div>
                                    <div className='col-sm'>Quantity</div>
                                    <div className='col-sm'>Amount</div>
                                  </div>
                                  {['January', 'February', 'March', 'April', 'May', 'June'].map((monItem, monIndex) => (
                                    <div
                                      className={[
                                        'row pt-2 pb-2 align-items-center',
                                        monIndex % 2 === 1 ? 'liner-gradient' : '',
                                      ].join(' ')}
                                      key={monIndex}
                                    >
                                      <div className={[`col-sm key`, gc(`${monItem.substr(0, 3)} ${item}`)].join(' ')}>
                                        {monItem}
                                      </div>
                                      <div className='col-sm'>
                                        {values.originalValues.filter(
                                          (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                        ).length > 0 ? (
                                          values.originalValues
                                            .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                            .map((i: any, k: number) => (
                                              <div className='form-field-group' key={k}>
                                                {i.type === 'projection' && !isCurrent(i.interval) ? (
                                                  <>
                                                    {' '}
                                                    {i.price
                                                      ? currencySymbol + numberWithCommas(fNumber(i.price, 2))
                                                      : '--'}
                                                  </>
                                                ) : (
                                                  <>
                                                    <Form.Control
                                                      onChange={(e) => handleMonthlyPriceChange(e, i.interval)}
                                                      type='number'
                                                      step={0.01}
                                                      id={`${monItem.substr(0, 3)} ${item}`}
                                                      value={
                                                        isCurrent(i.interval)
                                                          ? values.originalValues.filter(
                                                              (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                            )?.[0]?.price || ''
                                                          : i.price || ''
                                                      }
                                                    />
                                                    <span className='input-add-on'>{currencySymbol}</span>
                                                  </>
                                                )}
                                              </div>
                                            ))
                                        ) : !holdingsDetails ? (
                                          <div className='form-field-group'>
                                            {new Date(`${monItem.substr(0, 3)} ${item}`) > new Date() ? (
                                              <>--</>
                                            ) : (
                                              <>
                                                <Form.Control
                                                  onChange={(e) => {
                                                    isCurrent(`${monItem.substr(0, 3)} ${item}`)
                                                      ? handleMonthlyNewPriceChange('Today', e)
                                                      : handleMonthlyNewPriceChange(
                                                          `${monItem.substr(0, 3)} ${item}`,
                                                          e
                                                        );
                                                  }}
                                                  type='number'
                                                />
                                                <span className='input-add-on'>{currencySymbol}</span>
                                              </>
                                            )}
                                          </div>
                                        ) : (
                                          <span>--</span>
                                        )}
                                      </div>
                                      <div className='col-sm'>
                                        {values.originalValues.filter(
                                          (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                        ).length > 0 ? (
                                          values.originalValues
                                            .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                            .map((i: any, k: number) => (
                                              <div className='form-field-group' key={k}>
                                                {i.type === 'projection' && !isCurrent(i.interval) ? (
                                                  <> {i.quantity ? i.quantity : '--'}</>
                                                ) : (
                                                  <Form.Control
                                                    onChange={(e) => handleMonthlyQuantityChange(e, i.interval)}
                                                    type='number'
                                                    step={0.01}
                                                    id={`${monItem.substr(0, 3)} ${item}`}
                                                    value={
                                                      isCurrent(i.interval)
                                                        ? values.originalValues.filter(
                                                            (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                          )?.[0]?.quantity || ''
                                                        : i.quantity || ''
                                                    }
                                                  />
                                                )}
                                              </div>
                                            ))
                                        ) : !holdingsDetails ? (
                                          <div className='form-field-group'>
                                            {new Date(`${monItem.substr(0, 3)} ${item}`) > new Date() ? (
                                              <>--</>
                                            ) : (
                                              <Form.Control
                                                onChange={(e) =>
                                                  handleMonthlyNewQuantityChange(`${monItem.substr(0, 3)} ${item}`, e)
                                                }
                                                type='number'
                                              />
                                            )}
                                          </div>
                                        ) : (
                                          <span>--</span>
                                        )}
                                      </div>
                                      <div className='col-sm'>
                                        {values.originalValues.filter(
                                          (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                        ).length > 0 ? (
                                          values.originalValues
                                            .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                            .map((i: any, k: number) => (
                                              <div className='form-field-group' key={k}>
                                                {getAmount(values, i, currencySymbol)}
                                              </div>
                                            ))
                                        ) : (
                                          <span>--</span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className='col-sm'>
                                  <div className='row pt-2 pb-2 align-items-center'>
                                    <div className='col-sm'>Month</div>
                                    <div className='col-sm'>Price</div>
                                    <div className='col-sm'>Quantity</div>
                                    <div className='col-sm'>Amount</div>
                                  </div>
                                  {['July', 'August', 'September', 'October', 'November', 'December'].map(
                                    (monItem, monIndex) => (
                                      <div
                                        className={[
                                          'row pt-2 pb-2 align-items-center',
                                          monIndex % 2 === 1 ? 'liner-gradient' : '',
                                        ].join(' ')}
                                        key={monIndex}
                                      >
                                        <div
                                          className={[`col-sm key`, gc(`${monItem.substr(0, 3)} ${item}`)].join(' ')}
                                        >
                                          {monItem}
                                        </div>
                                        <div className='col-sm'>
                                          {values.originalValues.filter(
                                            (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                          ).length > 0 ? (
                                            values.originalValues
                                              .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                              .map((i: any, k: number) => (
                                                <div className='form-field-group' key={k}>
                                                  {i.type === 'projection' && !isCurrent(i.interval) ? (
                                                    <>
                                                      {' '}
                                                      {i.price
                                                        ? currencySymbol + numberWithCommas(fNumber(i.price, 2))
                                                        : '--'}
                                                    </>
                                                  ) : (
                                                    <>
                                                      <Form.Control
                                                        onChange={(e) => handleMonthlyPriceChange(e, i.interval)}
                                                        type='number'
                                                        step={0.01}
                                                        id={`${monItem.substr(0, 3)} ${item}`}
                                                        value={
                                                          isCurrent(i.interval)
                                                            ? values.originalValues.filter(
                                                                (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                              )?.[0]?.price || ''
                                                            : i.price || ''
                                                        }
                                                      />
                                                      <span className='input-add-on'>{currencySymbol}</span>
                                                    </>
                                                  )}
                                                </div>
                                              ))
                                          ) : !holdingsDetails ? (
                                            <div className='form-field-group'>
                                              {new Date(`${monItem.substr(0, 3)} ${item}`) > new Date() ? (
                                                <>--</>
                                              ) : (
                                                <>
                                                  <Form.Control
                                                    onChange={(e) =>
                                                      handleMonthlyNewPriceChange(`${monItem.substr(0, 3)} ${item}`, e)
                                                    }
                                                    type='number'
                                                  />
                                                  <span className='input-add-on'>{currencySymbol}</span>
                                                </>
                                              )}
                                            </div>
                                          ) : (
                                            <span>--</span>
                                          )}
                                        </div>
                                        <div className='col-sm'>
                                          {values.originalValues.filter(
                                            (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                          ).length > 0 ? (
                                            values.originalValues
                                              .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                              .map((i: any, k: number) => (
                                                <div className='form-field-group' key={k}>
                                                  {i.type === 'projection' && !isCurrent(i.interval) ? (
                                                    <> {i.quantity ? i.quantity : '--'}</>
                                                  ) : (
                                                    <Form.Control
                                                      onChange={(e) => handleMonthlyQuantityChange(e, i.interval)}
                                                      type='number'
                                                      step={0.01}
                                                      id={`${monItem.substr(0, 3)} ${item}`}
                                                      value={
                                                        isCurrent(i.interval)
                                                          ? values.originalValues.filter(
                                                              (monthlyValue: any) => monthlyValue.interval === 'Today'
                                                            )?.[0]?.quantity || ''
                                                          : i.quantity || ''
                                                      }
                                                    />
                                                  )}
                                                </div>
                                              ))
                                          ) : !holdingsDetails ? (
                                            <div className='form-field-group'>
                                              {new Date(`${monItem.substr(0, 3)} ${item}`) > new Date() ? (
                                                <>--</>
                                              ) : (
                                                <Form.Control
                                                  onChange={(e) =>
                                                    handleMonthlyNewQuantityChange(`${monItem.substr(0, 3)} ${item}`, e)
                                                  }
                                                  type='number'
                                                />
                                              )}
                                            </div>
                                          ) : (
                                            <span>--</span>
                                          )}
                                        </div>
                                        <div className='col-sm'>
                                          {values.originalValues.filter(
                                            (i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`
                                          ).length > 0 ? (
                                            values.originalValues
                                              .filter((i: any) => i.interval === `${monItem.substr(0, 3)} ${item}`)
                                              .map((i: any, k: number) => (
                                                <div className='form-field-group' key={k}>
                                                  {getAmount(values, i, currencySymbol)}
                                                </div>
                                              ))
                                          ) : (
                                            <span>--</span>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </Tab>
                        ))}
                        <Tab title='' />
                      </Tabs>
                      <div className='action-wrapper mt-3'>
                        <DeleteHoldingPosition
                          holdingDetails={holdingsDetails}
                          onDelete={() => {
                            handleRefresh();
                            holdingsDetailsModal.close();
                          }}
                        />
                        <button
                          className='btn-outline-primary mm-btn-animate d-flex align-items-center justify-content-center'
                          onClick={() => tabsControl(HoldingsModalTabs.DETAILS)}
                          type='button'
                        >
                          Back
                        </button>
                        <button
                          className='mm-btn-animate mm-btn-primary d-flex align-items-center justify-content-center'
                          onClick={() => tabsControl(HoldingsModalTabs.CLASSIFICATIONS)}
                          type='button'
                        >
                          Next
                        </button>
                      </div>
                    </Tab>
                    <Tab eventKey='classifications' title='Classifications' className='classifications-sub-tabs'>
                      <Tabs defaultActiveKey='type' id='classifications-sub-tab' className='mt-3'>
                        <Tab eventKey='type' title='Type'>
                          <div className='row mt-4'>
                            <div className='col-sm'>
                              <div className='row pt-2 pb-2 align-items-center classification-total'>
                                <div className='col-sm text--primary'>Type Classification Total</div>
                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                  <div className='form-field-group text--primary classify-total-percentage'>
                                    100.00 %
                                  </div>
                                  <div className='btn-icon-purple'>
                                    <AddNewIcon onClick={() => addNewClassification('Type')} />
                                  </div>
                                </div>
                              </div>
                              <div className='row pb-4 align-items-center unclassified'>
                                <div className='col-sm'>
                                  <span className={getUnclassifiedRest('Type') < 0 ? 'text-danger' : ''}>
                                    Unclassified
                                  </span>
                                </div>
                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                  <div className='form-field-group classify-percentage'>
                                    <span className={getUnclassifiedRest('Type') < 0 ? 'text-danger' : ''}>
                                      {fNumber(getUnclassifiedRest('Type'), 2)} %
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {values.originalClassifications.Type.map((item: any, index: number) => (
                                <div className='row pt-2 pb-2 align-items-center' key={index}>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <ClassificationsSelectInput
                                        args={classificationForTypes}
                                        onChange={(e) => handleClassificationsValueChange('Type', e)}
                                        value={item.classificationValue}
                                        id={item.classificationValue}
                                        tabName='Type'
                                        classifications={values.originalClassifications}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-sm d-flex align-items-center classification-percentage'>
                                    <div className='form-field-group mr-3'>
                                      <Form.Control
                                        onChange={(e) => handleClassificationsAllocationChange('Type', e)}
                                        type='number'
                                        value={item.allocation}
                                        id={item.classificationValue || ''}
                                      />
                                      <span className='input-add-on'>%</span>
                                    </div>
                                    <div className='text-right'>
                                      <DeleteIcon onClick={() => deleteClassification('Type', item)} />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey='assetClass' title='Asset Class'>
                          <div className='row mt-4'>
                            <div className='col-sm'>
                              <div className='row pt-2 pb-2 align-items-center classification-total'>
                                <div className='col-sm text--primary'>Asset Class Classification Total</div>
                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                  <div className='form-field-group text--primary classify-total-percentage'>
                                    100.00 %
                                  </div>
                                  <div className='btn-icon-purple'>
                                    <AddNewIcon onClick={() => addNewClassification('Asset Class')} />
                                  </div>
                                </div>
                              </div>
                              <div className='row pb-4 align-items-center unclassified'>
                                <div className='col-sm'>
                                  <span className={getUnclassifiedRest('Asset Class') < 0 ? 'text-danger' : ''}>
                                    Unclassified
                                  </span>
                                </div>
                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                  <div className='form-field-group classify-percentage'>
                                    <span className={getUnclassifiedRest('Asset Class') < 0 ? 'text-danger' : ''}>
                                      {fNumber(getUnclassifiedRest('Asset Class'), 2)} %
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {values.originalClassifications['Asset Class'].map((item: any, index: number) => (
                                <div className='row pt-2 pb-2 align-items-center' key={index}>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <ClassificationsSelectInput
                                        args={classificationForAssetClass}
                                        onChange={(e) => handleClassificationsValueChange('Asset Class', e)}
                                        value={item.classificationValue}
                                        id={item.classificationValue}
                                        tabName='Asset Class'
                                        classifications={values.originalClassifications}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-sm d-flex align-items-center classification-percentage'>
                                    <div className='form-field-group mr-3'>
                                      <Form.Control
                                        onChange={(e) => handleClassificationsAllocationChange('Asset Class', e)}
                                        type='number'
                                        value={item.allocation}
                                        id={item.classificationValue || ''}
                                      />
                                      <span className='input-add-on'>%</span>
                                    </div>
                                    <div className='text-right'>
                                      <DeleteIcon onClick={() => deleteClassification('Asset Class', item)} />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey='country' title='Country'>
                          <div className='row mt-4'>
                            <div className='col-sm'>
                              <div className='row pt-2 pb-2 align-items-center classification-total'>
                                <div className='col-sm text--primary'>Country Classification Total</div>
                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                  <div className='form-field-group text--primary classify-total-percentage'>
                                    100.00 %
                                  </div>
                                  <div className='btn-icon-purple'>
                                    <AddNewIcon onClick={() => addNewClassification('Country')} />
                                  </div>
                                </div>
                              </div>
                              <div className='row pb-4 align-items-center unclassified'>
                                <div className='col-sm'>
                                  <span className={getUnclassifiedRest('Country') < 0 ? 'text-danger' : ''}>
                                    Unclassified
                                  </span>
                                </div>
                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                  <div className='form-field-group classify-percentage'>
                                    <span className={getUnclassifiedRest('Country') < 0 ? 'text-danger' : ''}>
                                      {fNumber(getUnclassifiedRest('Country'), 2)} %
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {values.originalClassifications.Country.map((item: any, index: number) => (
                                <div className='row pt-2 pb-2 align-items-center' key={index}>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <ClassificationsSelectInput
                                        args={classificationForCountry}
                                        onChange={(e) => handleClassificationsValueChange('Country', e)}
                                        value={item.classificationValue}
                                        id={item.classificationValue}
                                        tabName='Country'
                                        classifications={values.originalClassifications}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-sm d-flex align-items-center classification-percentage'>
                                    <div className='form-field-group mr-3'>
                                      <Form.Control
                                        onChange={(e) => handleClassificationsAllocationChange('Country', e)}
                                        type='number'
                                        value={item.allocation}
                                        id={item.classificationValue || ''}
                                      />
                                      <span className='input-add-on'>%</span>
                                    </div>
                                    <div className='text-right'>
                                      <DeleteIcon onClick={() => deleteClassification('Country', item)} />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey='risk' title='Risk'>
                          <div className='row mt-4'>
                            <div className='col-sm'>
                              <div className='row pt-2 pb-2 align-items-center classification-total'>
                                <div className='col-sm text--primary'>Risk Classification Total</div>
                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                  <div className='form-field-group text--primary classify-total-percentage'>
                                    100.00 %
                                  </div>
                                  <div className='btn-icon-purple'>
                                    <AddNewIcon onClick={() => addNewClassification('Risk')} />
                                  </div>
                                </div>
                              </div>
                              <div className='row pb-4 align-items-center unclassified'>
                                <div className='col-sm'>
                                  <span className={getUnclassifiedRest('Risk') < 0 ? 'text-danger' : ''}>
                                    Unclassified
                                  </span>
                                </div>
                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                  <div className='form-field-group classify-percentage'>
                                    <span className={getUnclassifiedRest('Risk') < 0 ? 'text-danger' : ''}>
                                      {fNumber(getUnclassifiedRest('Risk'), 2)} %
                                    </span>
                                  </div>
                                </div>
                              </div>
                              {values.originalClassifications.Risk.map((item: any, index: number) => (
                                <div className='row pt-2 pb-2 align-items-center' key={index}>
                                  <div className='col-sm'>
                                    <div className='form-field-group'>
                                      <ClassificationsSelectInput
                                        args={classificationForRisk}
                                        onChange={(e) => handleClassificationsValueChange('Risk', e)}
                                        value={item.classificationValue}
                                        id={item.classificationValue}
                                        tabName='Risk'
                                        classifications={values.originalClassifications}
                                      />
                                    </div>
                                  </div>
                                  <div className='col-sm d-flex align-items-center classification-percentage'>
                                    <div className='form-field-group mr-3'>
                                      <Form.Control
                                        onChange={(e) => handleClassificationsAllocationChange('Risk', e)}
                                        type='number'
                                        value={item.allocation}
                                        id={item.classificationValue || ''}
                                      />
                                      <span className='input-add-on'>%</span>
                                    </div>
                                    <div className='text-right'>
                                      <DeleteIcon
                                        className='trash-icon'
                                        onClick={() => deleteClassification('Risk', item)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Tab>
                        <Tab title='' />
                      </Tabs>
                      <div className='action-wrapper mt-3'>
                        <DeleteHoldingPosition
                          holdingDetails={holdingsDetails}
                          onDelete={() => {
                            handleRefresh();
                            holdingsDetailsModal.close();
                          }}
                        />
                        <button
                          className='btn-outline-primary mm-btn-animate d-flex align-items-center justify-content-center'
                          onClick={() => tabsControl(HoldingsModalTabs.MONTHLYVALUES)}
                          type='button'
                        >
                          Back
                        </button>
                        <button
                          className='mm-btn-animate mm-btn-primary d-flex align-items-center justify-content-center'
                          type='submit'
                          disabled={getUnclassifiedRest('Type') < 0}
                        >
                          {loading ? (
                            <>
                              <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true' />
                              <span className='ml-1'>Saving...</span>
                            </>
                          ) : (
                            <>Next</>
                          )}
                        </button>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </Modal>
          </form>
        );
      }}
    </Formik>
  );
};

export default HoldingsDetailsModal;
