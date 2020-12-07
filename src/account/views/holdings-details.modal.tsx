import React, { useState } from 'react';
import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import { Tabs, Tab, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { CurrencyOptions } from 'auth/enum/currency-options';
import { enumerateStr, getUnique } from 'common/common-helper';
import { Formik } from 'formik';
import { getMonthYear, getQuarter, getYear } from 'common/moment.helper';
import { getClassification, getHoldingTypes, patchPosition, postPosition } from 'api/request.api';
import { Modal, ModalType } from 'common/components/modal';

import { ReactComponent as AddNewIcon } from '../../assets/images/account/AddNew.svg';
import { ReactComponent as DeleteIcon } from '../../assets/images/account/Delete.svg';

interface SettingModalProps {
    holdingsDetailsModal: ModalType;
    holdingsDetails?: any;
    accountId?: number
}

const DisabledInput: React.FC = () => {
    return (
        <div className='form-field-group'>
            <Form.Control
                type='number'
                disabled
            />
            <span className='input-add-on'>%</span>
        </div>
    )
}

const HoldingsDetailsModal: React.FC<SettingModalProps> = ({ holdingsDetailsModal, holdingsDetails, accountId }) => {

    const [loading, setLoading] = useState(false);
    const [years, setYears] = useState<string[]>([]);
    const curArr = enumerateStr(CurrencyOptions);
    const [classificationForTypes, setClassificationForTypes] = useState<string[]>([]);
    const [classificationForAssetClass, setClassificationForAssetClass] = useState<string[]>([]);
    const [classificationForCountry, setClassificationForCountry] = useState<string[]>([]);
    const [classificationForRisk, setClassificationForRisk] = useState<string[]>([]);
    const [holdingTypes, setHoldingTypes] = useState<string[]>([]);

    const handleCancel = () => {
        holdingsDetailsModal.close();
    }

    const fetchClassification = async () => {
        let filters = ['Type', 'Asset Class', 'Country', 'Risk'];
        for (let i = 0; i < filters.length; i++) {
            const { data, error } = await getClassification(filters[i]);
            if (!error) {
                // console.log('fetchfilter: ', filters[i], data);
                switch (filters[i]) {
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
        }
    };

    const fetchHoldingTypes = async () => {
        const { data, error } = await getHoldingTypes();
        if (!error) {
            console.log(data);
            setHoldingTypes(data);
        }
    }

    React.useEffect(() => {
        fetchClassification();
        fetchHoldingTypes();
    }, [])

    React.useEffect(() => {

        let _years = []
        for (let i = 0; i < holdingsDetails?.intervalValues.length; i++) {
            (holdingsDetails?.intervalValues)[i].date = new Date((holdingsDetails?.intervalValues)[i]['interval']);
            _years.push((holdingsDetails?.intervalValues)[i].interval.split(' ')[1]);
        }

        let unique_years = getUnique(_years);
        setYears(unique_years);

    }, [holdingsDetails]);

    const isCurrent = (interval: string) =>
        getMonthYear() === interval || getYear() === interval || getQuarter() === interval;

    const gc = (interval: string) => {
        if (interval) {
            if (isCurrent(interval)) {
                return 'current-m';
            }
        }
        // return 'tab-hide';
        return '';
    };

    // new position
    let yearsArr: any[] = [];
    if (holdingsDetails) {
        yearsArr = years;
    } else {
        const cYear = new Date().getFullYear();
        yearsArr = [(cYear - 2).toString(), (cYear - 1).toString(), cYear.toString(), (cYear + 1).toString()];
    }

    const foramtHoldingType = (str: string) => {
        if (['CD', 'ETF', 'ETN'].includes(str)) {
            return str;
        }
        const newStr = str[0].toUpperCase() + str.slice(1);
        const strArr = newStr.split(/(?=[A-Z])/);
        return strArr?.join(' ');
    }

    return (
        <Formik
            initialValues={{
                holdingType: holdingsDetails?.holdingType || '',
                securityType: holdingsDetails?.securityType || '',
                value: holdingsDetails?.value || 0,
                price: holdingsDetails?.price || 0,
                priceCurrency: holdingsDetails?.priceCurrency || CurrencyOptions.USD,
                symbol: holdingsDetails?.symbol || '',
                quantity: holdingsDetails?.quantity || 0,
                costBasis: holdingsDetails?.costBasis || 0,
                costBasisCurrency: holdingsDetails?.costBasisCurrency || CurrencyOptions.USD,
                cusipNumber: holdingsDetails?.cusipNumber || '',
                isin: holdingsDetails?.isin || '',
                sedol: holdingsDetails?.sedol || '',
                isShort: holdingsDetails?.isShort || true,
                unvestedQuantity: holdingsDetails?.unvestedQuantity || 0,
                unvestedValue: holdingsDetails?.unvestedValue || 0,
                unvestedValueCurrency: holdingsDetails?.unvestedValueCurrency || CurrencyOptions.USD,
                vestedQuantity: holdingsDetails?.vestedQuantity || 0,
                vestedSharesExercisable: holdingsDetails?.vestedSharesExercisable || 0,
                vestedValue: holdingsDetails?.vestedValue || 0,
                vestedValueCurrency: holdingsDetails?.vestedValueCurrency || CurrencyOptions.USD,
                vestedDate:
                    holdingsDetails && holdingsDetails.vestedDate ? new Date(holdingsDetails.vestedDate) : new Date(),
                contractQuantity: holdingsDetails?.contractQuantity || 0,
                couponRate: holdingsDetails?.couponRate || 0,
                exercisedQuantity: holdingsDetails?.exercisedQuantity || 0,
                expirationDate:
                    holdingsDetails && holdingsDetails.expirationDate ? new Date(holdingsDetails.expirationDate) : new Date(),
                grantDate:
                    holdingsDetails && holdingsDetails.grantDate ? new Date(holdingsDetails.grantDate) : new Date(),
                interestRate: holdingsDetails?.interestRate || 0,
                maturityDate:
                    holdingsDetails && holdingsDetails.maturityDate ? new Date(holdingsDetails.maturityDate) : new Date(),
                optionType: holdingsDetails?.optionType || '',
                spread: holdingsDetails?.spread || 0,
                spreadCurrency: holdingsDetails?.spreadCurrency || CurrencyOptions.USD,
                strikePrice: holdingsDetails?.strikePrice || 0,
                strikePriceCurrency: holdingsDetails?.strikePriceCurrency || CurrencyOptions.USD,
                term: holdingsDetails?.term || '',
                matchStatus: holdingsDetails?.matchStatus || '',
                accruedInterest: holdingsDetails?.accruedInterest || 0,
                accruedInterestCurrency: holdingsDetails?.accruedInterestCurrency || CurrencyOptions.USD,
                accruedIncome: holdingsDetails?.accruedIncome || 0,
                accruedIncomeCurrency: holdingsDetails?.accruedIncomeCurrency || CurrencyOptions.USD,
                description: holdingsDetails?.description || '',
                originalClassifications: holdingsDetails?.classifications || {
                    'Type': [{
                        allocation: 100,
                        classificationType: "Type",
                        classificationValue: "Unclassified"
                    }],
                    'Asset Class': [{
                        allocation: 100,
                        classificationType: "Asset Class",
                        classificationValue: "Unclassified"
                    }],
                    'Country': [{
                        allocation: 100,
                        classificationType: "Country",
                        classificationValue: "Unclassified"
                    }],
                    'Risk': [{
                        allocation: 100,
                        classificationType: "Risk",
                        classificationValue: "Unclassified"
                    }]
                },
                originalValues: holdingsDetails?.intervalValues || [{ date: new Date(), interval: new Date().toLocaleString('default', { month: 'short' }), value: 0 }],
                accountId: accountId
            }}
            onSubmit={async (values: any, actions: any) => {


                const positionId = holdingsDetails?.id;

                // if (!positionId) {
                //     return;
                // }

                let _classifications: any[] = [];

                Object.keys(values.originalClassifications).forEach((key: any) => {
                    const value = (values.originalClassifications as any)[key];
                    value.forEach((element: any) => {
                        _classifications.push(element);
                    });
                });

                let _values: any[] = [];

                values.originalValues.forEach((element: any) => {
                    _values.push(element);
                });

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
                        return toast('Error Occurred', { type: 'error' });
                    }
                    setLoading(false);
                    holdingsDetailsModal.close();
                    return toast('Successfully updated', { type: 'success' });
                }

                // new position
                const res = await postPosition(data);
                if (res?.error) {
                    setLoading(false);
                    return toast('Error Occurred', { type: 'error' });
                }
                setLoading(false);
                holdingsDetailsModal.close();
                return toast('Successfully Added', { type: 'success' });
            }}
        >
            {(props) => {
                const { values, handleChange, setValues, setFieldValue } = props;

                const handleSelectChange = (e: React.ChangeEvent<any>) => {
                    setValues({ ...values, [e.target.name]: e.target.value });
                };

                const handleMonthlyChange = (e: React.ChangeEvent<any>) => {

                    let _values = values.originalValues;
                    for (let i = 0; i < _values.length; i++) {
                        if (_values[i].interval === e.target.id) {
                            _values[i].value = parseFloat(e.target.value);
                        }
                    }
                    setValues({ ...values, 'originalValues': _values });
                }

                const handleMonthlyNewChange = (value: string, e: any) => {
                    console.log(value, e.target.value);

                    let _values = values.originalValues;
                    let existStatus = false;
                    for (let i = 0; i < _values.length; i++) {
                        if (_values[i].interval === value) {
                            existStatus = true;
                            _values[i].value = parseFloat(e.target.value);
                        }
                    }
                    if (!existStatus) {
                        _values.push({ date: new Date(value), value: e.target.value, interval: value })
                    }
                    setValues({ ...values, 'originalValues': _values });
                }

                const handleClassificationsAllocationChange = (tabName: string, e: any) => {
                    let _classifications = values.originalClassifications;
                    for (let i = 0; i < _classifications[`${tabName}`].length; i++) {
                        if (_classifications[`${tabName}`][i].classificationValue === e.target.id) {
                            _classifications[`${tabName}`][i].allocation = parseFloat(e.target.value);
                        }
                    }
                    setValues({ ...values, 'originalClassifications': _classifications });
                }

                const handleClassificationsValueChange = (tabName: string, e: any) => {
                    let _classifications = values.originalClassifications;
                    for (let i = 0; i < _classifications[`${tabName}`].length; i++) {
                        if (_classifications[`${tabName}`][i].classificationValue === e.target.id) {
                            _classifications[`${tabName}`][i].classificationValue = e.target.value;
                            break;
                        }
                    }
                    setValues({ ...values, 'originalClassifications': _classifications });
                }

                const addNewClassification = (tabName: string) => {
                    let _classifications = values.originalClassifications;
                    let sum = 0;
                    for (let i = 0; i < values.originalClassifications[`${tabName}`].length; i++) {
                        sum += values.originalClassifications[`${tabName}`][i].allocation;
                    }

                    _classifications[`${tabName}`].push({
                        accountId: holdingsDetails?.accountId,
                        allocation: (sum > 100) ? 0 : (100 - sum),
                        classificationType: `${tabName}`,
                        classificationValue: '',
                        positionId: holdingsDetails?.id,
                        yodleeId: null
                    });
                    setValues({ ...values, 'originalClassifications': _classifications });
                }

                const deleteClassification = (tabName: string, item: any) => {
                    let _classifications = values.originalClassifications;
                    for (let i = 0; i < _classifications[`${tabName}`].length; i++) {
                        if (_classifications[`${tabName}`][i].classificationValue === item.classificationValue) {
                            _classifications[`${tabName}`].splice(i, 1);
                        }
                    }
                    setValues({ ...values, 'originalClassifications': _classifications });
                }

                const checkDisabled = (tabName: string, element: string) => {
                    for (let i = 0; i < values.originalClassifications[`${tabName}`].length; i++) {
                        if (values.originalClassifications[`${tabName}`][i].classificationValue === element) {
                            return true;
                        }
                    }
                    return false;
                }

                const handleIsShortChange = (e: React.ChangeEvent<any>) => {
                    setValues({ ...values, 'isShort': !values.isShort });
                }

                return (
                    <form onSubmit={props.handleSubmit}>
                        <Modal {...holdingsDetailsModal.props} title={holdingsDetails?.description || 'New Position'} size='xxl' canBeClosed onClose={() => holdingsDetailsModal.close()}>
                            <div className='modal-wrapper mm-holdings-details-modal' >
                                <span className='description'>To maintain integrity of the data with your institution you can only update a few of the fields.</span>
                                <div className='mm-manual-account-modal__title mt-3'>
                                    <Tabs defaultActiveKey='details' transition={false} id='holdings-details-modal'>
                                        <Tab eventKey='details' title='Details'>
                                            {holdingsDetails && !holdingsDetails?.isManual ?
                                                <div className='row mt-4'>
                                                    <div className='col-sm'>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Description
                                                                </div>
                                                            <div className='col-sm'>
                                                                {values.description}
                                                            </div>
                                                        </div>
                                                        {values.holdingType &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm key'>
                                                                    Holding Type
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {foramtHoldingType(values.holdingType)}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.securityType &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm key'>
                                                                    Security Type
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.securityType}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.price &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm key'>
                                                                    Price
                                                                </div>
                                                                <div className='col-sm'>
                                                                    ${values.price}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.priceCurrency &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm key'>
                                                                    Price Currency
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.priceCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.quantity &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm key'>
                                                                    Quantity
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.quantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.symbol &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm key'>
                                                                    Symbol
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.symbol}
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Cost
                                                            </div>
                                                            <div className='col-sm '>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='costBasis'
                                                                        value={values.costBasis}
                                                                    />
                                                                    <span className='input-add-on'>$</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Cost Currency
                                                                </div>
                                                            <div className='col-sm '>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        as='select'
                                                                        onChange={handleSelectChange}
                                                                        name='costBasisCurrency'
                                                                        value={values.costBasisCurrency}
                                                                    >
                                                                        {curArr.map((item, index) => (
                                                                            <option key={index} value={item}>{item}</option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm'>
                                                        {!((holdingsDetails?.optionType === 'unknown' || !holdingsDetails?.optionType) &&
                                                            !holdingsDetails?.vestedQuantity &&
                                                            !holdingsDetails?.vestedSharesExercisable &&
                                                            !holdingsDetails?.vestedValue &&
                                                            !holdingsDetails?.vestedDate &&
                                                            !holdingsDetails?.unvestedQuantity &&
                                                            !holdingsDetails?.unvestedValue &&
                                                            !holdingsDetails?.exercisedQuantity &&
                                                            !holdingsDetails?.expirationDate &&
                                                            !holdingsDetails?.grantDate &&
                                                            !holdingsDetails?.spread &&
                                                            !holdingsDetails?.strikePrice
                                                        ) &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm key'>
                                                                    Options and Stock Options
                                                                </div>
                                                            </div>
                                                        }
                                                        {(values.optionType !== 'unknown' && values.optionType) &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Option Type
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.optionType}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedQuantity !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Vested Quantity
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.vestedQuantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedSharesExercisable !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Vested Shared Exercisable
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.vestedSharesExercisable}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedValue !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Vested Value
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.vestedValue}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedValue !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Vested Currency
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.vestedValueCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedDate &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Vested Date
                                                                </div>
                                                                <div className='col-sm'>
                                                                    <ReactDatePicker
                                                                        name='vestedDate'
                                                                        selected={new Date(values.vestedDate)}
                                                                        onChange={(val: Date) => {
                                                                            setFieldValue('vestedDate', moment(val).toISOString());
                                                                        }}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.unvestedQuantity !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Unvested Quantity
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.unvestedQuantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.unvestedValue !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Unvested Value
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.unvestedValue}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.unvestedValue !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Unvested Currency
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.unvestedValueCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.exercisedQuantity !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Excercised Quantity
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.exercisedQuantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.expirationDate &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Expiration Date
                                                                </div>
                                                                <div className='col-sm'>
                                                                    <ReactDatePicker
                                                                        name='expirationDate'
                                                                        selected={new Date(values.expirationDate)}
                                                                        onChange={(val: Date) => {
                                                                            setFieldValue('expirationDate', moment(val).toISOString());
                                                                        }}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.grantDate &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Grant Date
                                                                </div>
                                                                <div className='col-sm'>
                                                                    <ReactDatePicker
                                                                        name='grantDate'
                                                                        selected={new Date(values.grantDate)}
                                                                        onChange={(val: Date) => {
                                                                            setFieldValue('grantDate', moment(val).toISOString());
                                                                        }}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.spread !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Spread
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.spread}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.spread !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Spread Currency
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.spreadCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.strikePrice !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Strike Price
                                                                </div>
                                                                <div className='col-sm'>
                                                                    ${values.strikePrice}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.strikePrice !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Strike Currency
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.strikePriceCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className='row mt-2'>
                                                            {!(!holdingsDetails?.contractQuantity &&
                                                                !holdingsDetails?.cusipNumber &&
                                                                !holdingsDetails?.isin &&
                                                                !holdingsDetails?.sedol &&
                                                                !holdingsDetails?.isShort) &&
                                                                <div className='col-sm key mt-1'>
                                                                    Futures and Commodities
                                                                </div>
                                                            }
                                                        </div>
                                                        {values.contractQuantity !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Contract Quantity
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.contractQuantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.cusipNumber &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    CUSIP
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.cusipNumber}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.isin &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    ISIN
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.isin}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.sedol &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    SEDOL
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.sedol}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.isShort &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Short?
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.isShort ? 'Yes' : 'No'}
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className='col-sm'>
                                                        <div className='row mt-2'>
                                                            {!(!holdingsDetails?.couponRate &&
                                                                !holdingsDetails?.interestRate &&
                                                                !holdingsDetails?.maturityDate &&
                                                                !holdingsDetails?.term &&
                                                                !holdingsDetails?.accruedInterest &&
                                                                !holdingsDetails?.accruedIncome) &&
                                                                <div className='col-sm key'>
                                                                    CDs, Bonds and Loans
                                                                </div>
                                                            }
                                                        </div>
                                                        {values.couponRate !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Coupon
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.couponRate}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.interestRate !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Interest Rate
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.interestRate}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.maturityDate &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Maturity Date
                                                                </div>
                                                                <div className='col-sm'>
                                                                    <ReactDatePicker
                                                                        name='maturityDate'
                                                                        selected={new Date(values.maturityDate)}
                                                                        onChange={(val: Date) => {
                                                                            setFieldValue('maturityDate', moment(val).toISOString());
                                                                        }}
                                                                        readOnly
                                                                    />
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.term !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Term
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.term}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.accruedInterest !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Accrued Interest
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.accruedInterest}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.accruedInterest !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Interest Currency
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.accruedInterestCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.accruedIncome !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Accrued Income
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.accruedIncome}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.accruedIncome !== 0 &&
                                                            <div className='row mt-2'>
                                                                <div className='col-sm'>
                                                                    Income Currency
                                                                </div>
                                                                <div className='col-sm'>
                                                                    {values.accruedIncomeCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div> :
                                                <div className='row mt-4'>
                                                    <div className='col-sm'>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Description
                                                            </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        name='description'
                                                                        value={values.description}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Holding Type
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        as='select'
                                                                        onChange={handleSelectChange}
                                                                        name='holdingType'
                                                                        value={values.holdingType}
                                                                    >
                                                                        <option value=''> Select Type</option>
                                                                        {holdingTypes.map((item, index) => (
                                                                            <option key={index} value={item}>{foramtHoldingType(item)}</option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Price
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='price'
                                                                        value={values.price}
                                                                    />
                                                                    <span className='input-add-on'>$</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Price Currency
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        as='select'
                                                                        onChange={handleSelectChange}
                                                                        name='priceCurrency'
                                                                        value={values.priceCurrency}
                                                                    >
                                                                        {curArr.map((item, index) => (
                                                                            <option key={index} value={item}>{item}</option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Quantity
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='quantity'
                                                                        value={values.quantity}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Cost
                                                            </div>
                                                            <div className='col-sm '>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='costBasis'
                                                                        value={values.costBasis}
                                                                    />
                                                                    <span className='input-add-on'>$</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Cost Currency
                                                                </div>
                                                            <div className='col-sm '>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        as='select'
                                                                        onChange={handleSelectChange}
                                                                        name='costBasisCurrency'
                                                                        value={values.costBasisCurrency}
                                                                    >
                                                                        {curArr.map((item, index) => (
                                                                            <option key={index} value={item}>{item}</option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm'>

                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                Options and Stock Options
                                                                </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Option Type
                                                            </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        as='select'
                                                                        onChange={handleSelectChange}
                                                                        name='optionType'
                                                                        value={values.optionType}
                                                                    >
                                                                        <option value=''>Select Type</option>
                                                                        {['call', 'put'].map((item, index) => (
                                                                            <option key={index} value={item}>{item}</option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Vested Quantity
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='vestedQuantity'
                                                                        value={values.vestedQuantity}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Vested Shared Exercisable
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='vestedSharesExercisable'
                                                                        value={values.vestedSharesExercisable}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Vested Value
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='vestedValue'
                                                                        value={values.vestedValue}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Vested Currency
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        as='select'
                                                                        onChange={handleSelectChange}
                                                                        name='vestedValueCurrency'
                                                                        value={values.vestedValueCurrency}
                                                                    >
                                                                        {curArr.map((item, index) => (
                                                                            <option key={index} value={item}>{item}</option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Vested Date
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <ReactDatePicker
                                                                        name='vestedDate'
                                                                        selected={new Date(values.vestedDate)}
                                                                        onChange={(val: Date) => {
                                                                            setFieldValue('vestedDate', moment(val).toISOString());
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Unvested Quantity
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='unvestedQuantity'
                                                                        value={values.unvestedQuantity}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Unvested Value
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='unvestedValue'
                                                                        value={values.unvestedValue}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Unvested Currency
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        as='select'
                                                                        onChange={handleSelectChange}
                                                                        name='unvestedValue'
                                                                        value={values.unvestedValue}
                                                                    >
                                                                        {curArr.map((item, index) => (
                                                                            <option key={index} value={item}>{item}</option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Excercised Quantity
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='exercisedQuantity'
                                                                        value={values.exercisedQuantity}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Expiration Date
                                                                </div>
                                                            <div className='col-sm'>
                                                                <ReactDatePicker
                                                                    name='expirationDate'
                                                                    selected={new Date(values.expirationDate)}
                                                                    onChange={(val: Date) => {
                                                                        setFieldValue('expirationDate', moment(val).toISOString());
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Grant Date
                                                                </div>
                                                            <div className='col-sm'>
                                                                <ReactDatePicker
                                                                    name='grantDate'
                                                                    selected={new Date(values.grantDate)}
                                                                    onChange={(val: Date) => {
                                                                        setFieldValue('grantDate', moment(val).toISOString());
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Strike Price
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='strikePrice'
                                                                        value={values.strikePrice}
                                                                    />
                                                                    <span className='input-add-on'>$</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Strike Currency
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        as='select'
                                                                        onChange={handleSelectChange}
                                                                        name='strikePriceCurrency'
                                                                        value={values.strikePriceCurrency}
                                                                    >
                                                                        {curArr.map((item, index) => (
                                                                            <option key={index} value={item}>{item}</option>
                                                                        ))}
                                                                    </Form.Control>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key mt-1'>
                                                                Futures and Commodities
                                                                </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Contract Quantity
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='contractQuantity'
                                                                        value={values.contractQuantity}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Short?
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <input
                                                                        type='radio'
                                                                        onChange={handleIsShortChange}
                                                                        name='isShort'
                                                                        checked={values.isShort === true}
                                                                        aria-checked={!!values.isShort}
                                                                    />
                                                                    <label className='mr-3'>Yes</label>
                                                                    <input
                                                                        onChange={handleIsShortChange}
                                                                        type='radio'
                                                                        name='isShort'
                                                                        checked={values.isShort === false}
                                                                        aria-checked={!!values.isShort}
                                                                    />
                                                                    <label>No</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm'>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm key'>
                                                                CDs, Bonds and Loans
                                                                </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Coupon
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='couponRate'
                                                                        value={values.couponRate}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Interest Rate
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='interestRate'
                                                                        value={values.interestRate}
                                                                    />
                                                                    <span className='input-add-on'>%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Maturity Date
                                                                </div>
                                                            <div className='col-sm'>
                                                                <ReactDatePicker
                                                                    name='maturityDate'
                                                                    selected={new Date(values.maturityDate)}
                                                                    onChange={(val: Date) => {
                                                                        setFieldValue('maturityDate', moment(val).toISOString());
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='row mt-2'>
                                                            <div className='col-sm'>
                                                                Term
                                                                </div>
                                                            <div className='col-sm'>
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        name='term'
                                                                        value={values.term}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </Tab>
                                        <Tab eventKey='monthlyValues' title='Monthly Values' className='monthly-values-sub-tabs'>
                                            <Tabs defaultActiveKey={years?.[0]} id='mothly-value-sub-tab' className='mt-3'>
                                                {yearsArr?.map((item, index) => (
                                                    <Tab eventKey={item} title={item} key={index}>
                                                        {holdingsDetails && !holdingsDetails?.isManual ?
                                                            <div className='row mt-4'>
                                                                <div className='col-sm'>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm'>
                                                                            Month
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            Amount
                                                                        </div>
                                                                    </div>

                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm key'>
                                                                            January
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Jan ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Jan ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className='col-sm key'>
                                                                            February
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Feb ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Feb ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm key'>
                                                                            March
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Mar ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Mar ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className='col-sm key'>
                                                                            April
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Apr ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Apr ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm key'>
                                                                            May
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `May ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `May ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className='col-sm key'>
                                                                            June
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Jun ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Jun ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-sm'>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm'>
                                                                            Month
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            Amount
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm key'>
                                                                            July
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Jul ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Jul ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className='col-sm key'>
                                                                            August
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Aug ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Aug ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm key'>
                                                                            September
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Sep ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Sep ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className='col-sm key'>
                                                                            October
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Oct ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Oct ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm key'>
                                                                            November
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Nov ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Nov ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className='col-sm key'>
                                                                            December
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Dec ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Dec ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        {i.value} %
                                                                                    </div>
                                                                                ))
                                                                            ) : (
                                                                                    <span>-</span>
                                                                                )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div> :
                                                            <div className='row mt-4'>
                                                                <div className='col-sm'>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm'>
                                                                            Month
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            Amount
                                                                        </div>
                                                                    </div>

                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className={[`col-sm key`, gc(`Jan ${item}`)].join(' ')}>
                                                                            January
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Jan ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Jan ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Jan ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Jan ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className={[`col-sm key`, gc(`Feb ${item}`)].join(' ')}>
                                                                            February
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Feb ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Feb ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Feb ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Feb ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className={[`col-sm key`, gc(`Mar ${item}`)].join(' ')}>
                                                                            March
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Mar ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Mar ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Mar ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Mar ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className={[`col-sm key`, gc(`Apr ${item}`)].join(' ')}>
                                                                            April
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Apr ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Apr ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Apr ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Apr ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className={[`col-sm key`, gc(`May ${item}`)].join(' ')}>
                                                                            May
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `May ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `May ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`May ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`May ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className={[`col-sm key`, gc(`Jun ${item}`)].join(' ')}>
                                                                            June
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Jun ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Jun ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Jun ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Jun ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-sm'>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className='col-sm'>
                                                                            Month
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            Amount
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className={[`col-sm key`, gc(`Jul ${item}`)].join(' ')}>
                                                                            July
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Jul ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Jul ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Jul ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Jul ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className={[`col-sm key`, gc(`Aug ${item}`)].join(' ')}>
                                                                            August
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Aug ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Aug ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Aug ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Aug ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className={[`col-sm key`, gc(`Sep ${item}`)].join(' ')}>
                                                                            September
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Sep ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Sep ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Sep ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Sep ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className={[`col-sm key`, gc(`Oct ${item}`)].join(' ')}>
                                                                            October
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Oct ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Oct ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Oct ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Oct ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center'>
                                                                        <div className={[`col-sm key`, gc(`Nov ${item}`)].join(' ')}>
                                                                            November
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Nov ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Nov ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Nov ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Nov ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                    <div className='row pt-2 pb-2 align-items-center liner-gradient'>
                                                                        <div className={[`col-sm key`, gc(`Dec ${item}`)].join(' ')}>
                                                                            December
                                                                        </div>
                                                                        <div className='col-sm'>
                                                                            {(values.originalValues.filter((i: any) => i.interval === `Dec ${item}`).length > 0) ? (
                                                                                values.originalValues.filter((i: any) => i.interval === `Dec ${item}`).map((i: any, k: number) => (
                                                                                    <div className='form-field-group' key={k}>
                                                                                        <Form.Control
                                                                                            onChange={handleMonthlyChange}
                                                                                            type='number'
                                                                                            id={`Dec ${item}`}
                                                                                            value={i.value}
                                                                                        />
                                                                                        <span className='input-add-on'>%</span>
                                                                                    </div>
                                                                                ))
                                                                            ) : !holdingsDetails ? (
                                                                                <div className='form-field-group'>
                                                                                    <Form.Control
                                                                                        onChange={(e) => handleMonthlyNewChange(`Dec ${item}`, e)}
                                                                                        type='number'
                                                                                        defaultValue={0}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ) : (
                                                                                        <DisabledInput />
                                                                                    )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </Tab>
                                                ))}

                                            </Tabs>
                                        </Tab>
                                        <Tab eventKey='classifications' title='Classifications' className='monthly-values-sub-tabs'>
                                            <Tabs defaultActiveKey='type' id='mothly-value-sub-tab' className='mt-3'>
                                                <Tab eventKey='type' title='Type'>
                                                    <div className='row mt-4'>
                                                        <div className='col-sm'>
                                                            <div className='row pt-2 pb-2 align-items-center classification-total'>
                                                                <div className='col-sm'>
                                                                    Type Classification Total
                                                                </div>
                                                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                                                    <div className='form-field-group'>
                                                                        100 %
                                                                    </div>
                                                                    <AddNewIcon onClick={() => addNewClassification('Type')} />
                                                                </div>
                                                            </div>
                                                            {values.originalClassifications.Type.map((item: any, index: number) => (
                                                                <div className='row pt-2 pb-2 align-items-center' key={index}>
                                                                    <div className='col-sm'>
                                                                        <div className='form-field-group'>
                                                                            <Form.Control
                                                                                onChange={(e) => handleClassificationsValueChange('Type', e)}
                                                                                as='select'
                                                                                value={item.classificationValue}
                                                                                id={item.classificationValue}
                                                                            >
                                                                                <option value=''>Select Type</option>
                                                                                {classificationForTypes.map((element, k) => (
                                                                                    <option key={k} value={element} disabled={checkDisabled('Type', element)}>{element}</option>
                                                                                ))}
                                                                            </Form.Control>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-sm d-flex align-items-center'>
                                                                        <div className='form-field-group mr-3'>
                                                                            <Form.Control
                                                                                onChange={(e) => handleClassificationsAllocationChange('Type', e)}
                                                                                type='number'
                                                                                value={item.allocation}
                                                                                id={item.classificationValue}
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
                                                <Tab eventKey='assetclass' title='Asset Class'>
                                                    <div className='row mt-4'>
                                                        <div className='col-sm'>
                                                            <div className='row pt-2 pb-2 align-items-center classification-total'>
                                                                <div className='col-sm'>
                                                                    Asset Class Classification Total
                                                                </div>
                                                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                                                    <div className='form-field-group'>
                                                                        100 %
                                                                    </div>
                                                                    <AddNewIcon onClick={() => addNewClassification('Asset Class')} />
                                                                </div>
                                                            </div>
                                                            {values.originalClassifications['Asset Class'].map((item: any, index: number) => (
                                                                <div className='row pt-2 pb-2 align-items-center' key={index}>
                                                                    <div className='col-sm'>
                                                                        <div className='form-field-group'>
                                                                            <Form.Control
                                                                                onChange={(e) => handleClassificationsValueChange('Asset Class', e)}
                                                                                as='select'
                                                                                value={item.classificationValue}
                                                                                id={item.classificationValue}
                                                                            >
                                                                                <option value=''>Select Type</option>
                                                                                {classificationForAssetClass.map((element, k) => (
                                                                                    <option key={k} value={element} disabled={checkDisabled('Asset Class', element)}>{element}</option>
                                                                                ))}
                                                                            </Form.Control>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-sm d-flex align-items-center'>
                                                                        <div className='form-field-group mr-3'>
                                                                            <Form.Control
                                                                                onChange={(e) => handleClassificationsAllocationChange('Asset Class', e)}
                                                                                type='number'
                                                                                value={item.allocation}
                                                                                id={item.classificationValue}
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
                                                                <div className='col-sm'>
                                                                    Country Class Classification Total
                                                                </div>
                                                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                                                    <div className='form-field-group'>
                                                                        100 %
                                                                    </div>
                                                                    <AddNewIcon onClick={() => addNewClassification('Country')} />
                                                                </div>
                                                            </div>
                                                            {values.originalClassifications.Country.map((item: any, index: number) => (
                                                                <div className='row pt-2 pb-2 align-items-center' key={index}>
                                                                    <div className='col-sm'>
                                                                        <div className='form-field-group'>
                                                                            <Form.Control
                                                                                onChange={(e) => handleClassificationsValueChange('Country', e)}
                                                                                as='select'
                                                                                value={item.classificationValue}
                                                                                id={item.classificationValue}
                                                                            >
                                                                                <option value=''>Select Type</option>
                                                                                {classificationForCountry.map((element, k) => (
                                                                                    <option key={k} value={element} disabled={checkDisabled('Country', element)}>{element}</option>
                                                                                ))}
                                                                            </Form.Control>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-sm d-flex align-items-center'>
                                                                        <div className='form-field-group mr-3'>
                                                                            <Form.Control
                                                                                onChange={(e) => handleClassificationsAllocationChange('Country', e)}
                                                                                type='number'
                                                                                value={item.allocation}
                                                                                id={item.classificationValue}
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
                                                                <div className='col-sm'>
                                                                    Risk Class Classification Total
                                                                </div>
                                                                <div className='col-sm d-flex justify-content-end align-items-center'>
                                                                    <div className='form-field-group'>
                                                                        100 %
                                                                    </div>
                                                                    <AddNewIcon onClick={() => addNewClassification('Risk')} />
                                                                </div>
                                                            </div>
                                                            {values.originalClassifications.Risk.map((item: any, index: number) => (
                                                                <div className='row pt-2 pb-2 align-items-center' key={index}>
                                                                    <div className='col-sm'>
                                                                        <div className='form-field-group'>
                                                                            <Form.Control
                                                                                onChange={(e) => handleClassificationsValueChange('Risk', e)}
                                                                                as='select'
                                                                                value={item.classificationValue}
                                                                                id={item.classificationValue}
                                                                            >
                                                                                <option value=''>Select Type</option>
                                                                                {classificationForRisk.map((element, k) => (
                                                                                    <option key={k} value={element} disabled={checkDisabled('Risk', element)}>{element}</option>
                                                                                ))}
                                                                            </Form.Control>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-sm d-flex align-items-center'>
                                                                        <div className='form-field-group mr-3'>
                                                                            <Form.Control
                                                                                onChange={(e) => handleClassificationsAllocationChange('Risk', e)}
                                                                                type='number'
                                                                                value={item.allocation}
                                                                                id={item.classificationValue}
                                                                            />
                                                                            <span className='input-add-on'>%</span>
                                                                        </div>
                                                                        <div className='text-right'>
                                                                            <DeleteIcon onClick={() => deleteClassification('Risk', item)} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Tab>
                                            </Tabs>
                                        </Tab>
                                    </Tabs>
                                    <div className='action-wrapper mt-3'>
                                        <button className='btn-outline-primary mm-btn-animate' onClick={handleCancel}>
                                            Cancel
                                        </button>
                                        <button className='mm-btn-animate mm-btn-primary d-flex align-items-center justify-content-center' type='submit'>
                                            {loading ? (
                                                <>
                                                    <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true' />
                                                    <span className='ml-1'>Saving...</span>
                                                </>
                                            ) : (
                                                    <>Save<span className='hide-sm ml-1'>Changes</span></>
                                                )
                                            }
                                        </button>

                                    </div>
                                </div>
                            </div >
                        </Modal >
                    </form>
                )
            }}
        </Formik>
    );
};

export default HoldingsDetailsModal;
