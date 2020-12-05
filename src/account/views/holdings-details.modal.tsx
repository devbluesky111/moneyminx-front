import React, { useState } from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { getClassification, patchPosition } from 'api/request.api';
import { enumerateStr, getUnique } from 'common/common-helper';
import { Modal, ModalType } from 'common/components/modal';
import { CurrencyOptions } from 'auth/enum/currency-options';
import { Formik } from 'formik';

interface SettingModalProps {
    holdingsDetailsModal: ModalType;
    holdingsDetails: any;
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

const HoldingsDetailsModal: React.FC<SettingModalProps> = ({ holdingsDetailsModal, holdingsDetails }) => {

    const [loading, setLoading] = useState(false);
    const [intervalValuessByYear, setIntervalValuessByYear] = useState<any[]>([]);
    const [years, setYears] = useState<string[]>([]);
    const curArr = enumerateStr(CurrencyOptions);
    const [classificationForTypes, setClassificationForTypes] = useState<string[]>([]);
    const [classificationForAssetClass, setClassificationForAssetClass] = useState<string[]>([]);
    const [classificationForCountry, setClassificationForCountry] = useState<string[]>([]);
    const [classificationForRisk, setClassificationForRisk] = useState<string[]>([]);

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

    React.useEffect(() => {
        fetchClassification();
    }, [])

    React.useEffect(() => {
        let _years = []
        let _temp = holdingsDetails?.intervalValues;
        for (let i = 0; i < holdingsDetails?.intervalValues.length; i++) {
            _years.push(holdingsDetails?.intervalValues[i].interval.split(' ')[1]);
        }

        if (_temp) {
            setIntervalValuessByYear(_temp);
        }

        let unique_years = getUnique(_years);
        setYears(unique_years);

    }, [holdingsDetails])

    return (
        <Formik
            initialValues={{
                holdingType: holdingsDetails?.holdingType || null,
                securityType: holdingsDetails?.securityType || null,
                value: holdingsDetails?.value || null,
                price: holdingsDetails?.price || null,
                symbol: holdingsDetails?.symbol || null,
                quantity: holdingsDetails?.quantity || null,
                costBasis: holdingsDetails?.costBasis || null,
                costBasisCurrency: holdingsDetails?.costBasisCurrency || null,
                cusipNumber: holdingsDetails?.cusipNumber || null,
                isin: holdingsDetails?.isin || null,
                sedol: holdingsDetails?.sedol || null,
                isShort: holdingsDetails?.isShort || false,
                unvestedQuantity: holdingsDetails?.unvestedQuantity || null,
                unvestedValue: holdingsDetails?.unvestedValue || null,
                vestedQuantity: holdingsDetails?.vestedQuantity || null,
                vestedSharesExercisable: holdingsDetails?.vestedSharesExercisable || null,
                vestedValue: holdingsDetails?.vestedValue || null,
                vestedDate:
                    holdingsDetails && holdingsDetails.vestedDate ? new Date(holdingsDetails.vestedDate) : new Date(),
                contractQuantity: holdingsDetails?.contractQuantity || null,
                couponRate: holdingsDetails?.couponRate || null,
                exercisedQuantity: holdingsDetails?.exercisedQuantity || null,
                expirationDate:
                    holdingsDetails && holdingsDetails.expirationDate ? new Date(holdingsDetails.expirationDate) : new Date(),
                grantDate:
                    holdingsDetails && holdingsDetails.grantDate ? new Date(holdingsDetails.grantDate) : new Date(),
                interestRate: holdingsDetails?.interestRate || null,
                maturityDate:
                    holdingsDetails && holdingsDetails.maturityDate ? new Date(holdingsDetails.maturityDate) : new Date(),
                optionType: holdingsDetails?.optionType || null,
                spread: holdingsDetails?.spread || null,
                strikePrice: holdingsDetails?.strikePrice || null,
                term: holdingsDetails?.term || null,
                matchStatus: holdingsDetails?.matchStatus || null,
                accruedInterest: holdingsDetails?.accruedInterest || null,
                accruedIncome: holdingsDetails?.accruedIncome || null,
                description: holdingsDetails?.description || null,
                // classifications: holdingsDetails?.classifications || [],
                // values: holdingsDetails?.values || []
            }}
            onSubmit={async (values: any, actions: any) => {


                const positionId = holdingsDetails?.id;

                if (!positionId) {
                    return;
                }

                let data = {
                    calculatedEntity:
                        values.ownEstimate && values.principalBalance ? +values.ownEstimate - +values.principalBalance : '',
                };

                Object.keys(values).forEach((key: any) => {
                    const value = (values as any)[key];

                    if (value === '') {
                        data = { ...data, [key]: undefined };
                        return;
                    }

                    data = { ...data, [key]: value };
                });
                setLoading(true);
                const res = await patchPosition(`${positionId}`, data);
                if (res?.error) {
                    setLoading(false);
                    return toast('Error Occurred', { type: 'error' });
                }
                setLoading(false);
                toast('Successfully updated', { type: 'success' });

                holdingsDetailsModal.close();

            }}
        >
            {(props) => {
                const { values, handleChange, setValues } = props;

                const handleSelectChange = (e: React.ChangeEvent<any>) => {
                    setValues({ ...values, [e.target.name]: e.target.value });
                    console.log(values);
                };

                return (
                    <form onSubmit={props.handleSubmit}>
                        <Modal {...holdingsDetailsModal.props} title={holdingsDetails?.description} size='xxl' canBeClosed onClose={() => holdingsDetailsModal.close()}>
                            < div className='modal-wrapper mm-holdings-details-modal' >
                                <span className='description'>To maintain integrity of the data with your institution you can only update a few of the fields.</span>
                                <div className='mm-manual-account-modal__title mt-3'>
                                    <Tabs defaultActiveKey="details" transition={false} id="holdings-details-modal">
                                        <Tab eventKey="details" title="Details">
                                            {!holdingsDetails?.isManual ?
                                                <div className="row mt-4">
                                                    <div className="col-sm">
                                                        {values.holdingType &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Holding Type
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.holdingType}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.securityType &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Security Type
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.securityType}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.price &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Price
                                                                </div>
                                                                <div className="col-sm">
                                                                    ${values.price}
                                                                </div>
                                                            </div>
                                                        }
                                                        {holdingsDetails?.priceCurrency &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Price Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    {holdingsDetails?.priceCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.quantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Quantity
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.quantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.symbol &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Symbol
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.symbol}
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="row mt-2">
                                                            <div className="col-sm key">
                                                                Cost
                                                            </div>
                                                            <div className="col-sm ">
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        placeholder='5'
                                                                        name='costBasis'
                                                                        value={values.costBasis || 0}
                                                                    />
                                                                    <span className='input-add-on'>$</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {values.costBasis &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Cost Currency
                                                                </div>
                                                                <div className="col-sm ">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            as='select'
                                                                            onChange={handleSelectChange}
                                                                            name='costBasisCurrency'
                                                                            value={holdingsDetails?.costBasisCurrency}
                                                                        >
                                                                            {curArr.map((item, index) => (
                                                                                <option key={index} value={item}>{item}</option>
                                                                            ))}
                                                                        </Form.Control>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-sm">
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
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Options and Stock Options
                                                                </div>
                                                            </div>
                                                        }
                                                        {(values.optionType !== 'unknown' && values.optionType) &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Option Type
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.optionType}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedQuantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Quantity
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.vestedQuantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedSharesExercisable &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Shared Exercisable
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.vestedSharesExercisable}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedValue &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Value
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.vestedValue}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedValue &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    {holdingsDetails?.vestedValueCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedDate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Date
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.vestedDate}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.unvestedQuantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Unvested Quantity
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.unvestedQuantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.unvestedValue &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Unvested Value
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.unvestedValue}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.unvestedValue &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Unvested Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    {holdingsDetails?.unvestedValueCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.exercisedQuantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Excercised Quantity
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.exercisedQuantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.expirationDate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Expiration Date
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.expirationDate}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.grantDate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Grant Date
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.grantDate}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.spread &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Spread
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.spread}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.spread &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Spread Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    {holdingsDetails?.spreadCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.strikePrice &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Strike Price
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.strikePrice}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.strikePrice &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Strike Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    {holdingsDetails?.strikePriceCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="row mt-2">
                                                            {!(!holdingsDetails?.contractQuantity &&
                                                                !holdingsDetails?.cusipNumber &&
                                                                !holdingsDetails?.isin &&
                                                                !holdingsDetails?.sedol &&
                                                                !holdingsDetails?.isShort) &&
                                                                <div className="col-sm key mt-1">
                                                                    Futures and Commodities
                                                                </div>
                                                            }
                                                        </div>
                                                        {values.contractQuantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Contract Quantity
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.contractQuantity}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.cusipNumber &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    CUSIP
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.cusipNumber}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.isin &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    ISIN
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.isin}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.sedol &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    SEDOL
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.sedol}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.isShort &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Short?
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.isShort ? 'Yes' : 'No'}
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-sm">
                                                        <div className="row mt-2">
                                                            {!(!holdingsDetails?.couponRate &&
                                                                !holdingsDetails?.interestRate &&
                                                                !holdingsDetails?.maturityDate &&
                                                                !holdingsDetails?.term &&
                                                                !holdingsDetails?.accruedInterest &&
                                                                !holdingsDetails?.accruedIncome) &&
                                                                <div className="col-sm key">
                                                                    CDs, Bonds and Loans
                                                                </div>
                                                            }
                                                        </div>
                                                        {values.couponRate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Coupon
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.couponRate}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.interestRate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Interest Rate
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.interestRate}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.maturityDate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Maturity Date
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.maturityDate}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.term &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Term
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.term}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.accruedInterest &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Accrued Interest
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.accruedInterest}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.accruedInterest &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Interest Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    {holdingsDetails?.accruedInterestCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.accruedIncome &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Accrued Income
                                                                </div>
                                                                <div className="col-sm">
                                                                    {values.accruedIncome}
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.accruedIncome &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Income Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    {holdingsDetails?.accruedIncomeCurrency}
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div> :
                                                <div className="row mt-4">
                                                    <div className="col-sm">
                                                        {values.holdingType &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Holding Type
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            name='holdingType'
                                                                            value={holdingsDetails?.holdingType}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.price &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Price
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {holdingsDetails?.priceCurrency &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Price Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            as='select'
                                                                            onChange={handleSelectChange}
                                                                            name='priceCurrency'
                                                                            value={holdingsDetails?.priceCurrency}
                                                                        >
                                                                            {curArr.map((item, index) => (
                                                                                <option key={index} value={item}>{item}</option>
                                                                            ))}
                                                                        </Form.Control>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.quantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Quantity
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        <div className="row mt-2">
                                                            <div className="col-sm key">
                                                                Cost
                                                            </div>
                                                            <div className="col-sm ">
                                                                <div className='form-field-group'>
                                                                    <Form.Control
                                                                        onChange={handleChange}
                                                                        type='number'
                                                                        name='costBasis'
                                                                        value={values.costBasis || 0}
                                                                    />
                                                                    <span className='input-add-on'>$</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {values?.costBasisCurrency &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Cost Currency
                                                                </div>
                                                                <div className="col-sm ">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            as='select'
                                                                            onChange={handleSelectChange}
                                                                            name='costBasisCurrency'
                                                                            value={values?.costBasisCurrency}
                                                                        >
                                                                            {curArr.map((item, index) => (
                                                                                <option key={index} value={item}>{item}</option>
                                                                            ))}
                                                                        </Form.Control>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-sm">
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
                                                            !holdingsDetails?.strikePrice
                                                        ) &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm key">
                                                                    Options and Stock Options
                                                                </div>
                                                            </div>
                                                        }
                                                        {(values.optionType !== 'unknown' && values.optionType) &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Option Type
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            name='optionType'
                                                                            value={values.optionType}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedQuantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Quantity
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {values.vestedSharesExercisable &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Shared Exercisable
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            name='vestedSharesExercisable'
                                                                            value={values.vestedSharesExercisable}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedValue &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Value
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {values.vestedValue &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            as='select'
                                                                            onChange={handleSelectChange}
                                                                            name='vestedValueCurrency'
                                                                            value={holdingsDetails?.vestedValueCurrency}
                                                                        >
                                                                            {curArr.map((item, index) => (
                                                                                <option key={index} value={item}>{item}</option>
                                                                            ))}
                                                                        </Form.Control>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.vestedDate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Vested Date
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            name='vestedDate'
                                                                        // value={values.vestedDate}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.unvestedQuantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Unvested Quantity
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {values.unvestedValue &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Unvested Value
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {values.unvestedValue &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Unvested Currency
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {values.exercisedQuantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Excercised Quantity
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {values.expirationDate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Expiration Date
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            name='expirationDate'
                                                                        // value={values.expirationDate}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.grantDate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Grant Date
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            name='grantDate'
                                                                        // value={values.grantDate}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.strikePrice &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Strike Price
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            type='number'
                                                                            name='strikePrice'
                                                                            value={values.strikePrice}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.strikePrice &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Strike Currency
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            as='select'
                                                                            onChange={handleSelectChange}
                                                                            name='strikePriceCurrency'
                                                                            value={holdingsDetails?.strikePriceCurrency}
                                                                        >
                                                                            {curArr.map((item, index) => (
                                                                                <option key={index} value={item}>{item}</option>
                                                                            ))}
                                                                        </Form.Control>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="row mt-2">
                                                            {!(!holdingsDetails?.contractQuantity &&
                                                                !holdingsDetails?.isShort) &&
                                                                <div className="col-sm key mt-1">
                                                                    Futures and Commodities
                                                                </div>
                                                            }
                                                        </div>
                                                        {values.contractQuantity &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Contract Quantity
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {values.isShort &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Short?
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            name='isShort'
                                                                            value={values.isShort}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-sm">
                                                        <div className="row mt-2">
                                                            {!(!holdingsDetails?.couponRate &&
                                                                !holdingsDetails?.interestRate &&
                                                                !holdingsDetails?.maturityDate &&
                                                                !holdingsDetails?.term) &&
                                                                <div className="col-sm key">
                                                                    CDs, Bonds and Loans
                                                                </div>
                                                            }
                                                        </div>
                                                        {values.couponRate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Coupon
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {values.interestRate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Interest Rate
                                                                </div>
                                                                <div className="col-sm">
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
                                                        }
                                                        {values.maturityDate &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Maturity Date
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            name='maturityDate'
                                                                        // value={values.maturityDate}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {values.term &&
                                                            <div className="row mt-2">
                                                                <div className="col-sm">
                                                                    Term
                                                                </div>
                                                                <div className="col-sm">
                                                                    <div className='form-field-group'>
                                                                        <Form.Control
                                                                            onChange={handleChange}
                                                                            name='term'
                                                                            value={values.term}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </Tab>
                                        <Tab eventKey="monthlyValues" title="Monthly Values" className='monthly-values-sub-tabs'>
                                            <Tabs defaultActiveKey={years?.[0]} id="mothly-value-sub-tab" className='mt-3'>
                                                {years?.map((item, index) => (
                                                    <Tab eventKey={item} title={item} key={index}>
                                                        <div className="row mt-4">
                                                            <div className="col-sm">
                                                                <div className="row mt-3">
                                                                    <div className="col-sm">
                                                                        Month
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        Amount
                                                                    </div>
                                                                </div>

                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        January
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Jan ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Jan ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        February
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Feb ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Feb ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        March
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Mar ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Mar ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        April
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Apr ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Apr ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        May
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `May ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `May ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        June
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Jun ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Jun ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm">
                                                                <div className="row mt-3">
                                                                    <div className="col-sm">
                                                                        Month
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        Amount
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        July
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Jul ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Jul ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        August
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Aug ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Aug ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        September
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Sep ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Sep ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        October
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Oct ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Oct ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        November
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Nov ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Nov ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-sm key">
                                                                        December
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        {(intervalValuessByYear.filter(i => i.interval === `Dec ${item}`).length > 0) ? (
                                                                            intervalValuessByYear.filter(i => i.interval === `Dec ${item}`).map((i, k) => (
                                                                                <div className='form-field-group' key={k}>
                                                                                    <Form.Control
                                                                                        onChange={handleChange}
                                                                                        type='number'
                                                                                        placeholder='5'
                                                                                        name='costBasis'
                                                                                        value={i.value}
                                                                                    />
                                                                                    <span className='input-add-on'>%</span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                                <DisabledInput />
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                ))}

                                            </Tabs>
                                        </Tab>
                                        <Tab eventKey="classifications" title="Classifications" className='monthly-values-sub-tabs'>
                                            <Tabs defaultActiveKey="type" id="mothly-value-sub-tab" className='mt-3'>
                                                <Tab eventKey="type" title="Type">
                                                    <div className="row mt-4">
                                                        <div className="col-sm">
                                                            {holdingsDetails?.classifications.Type.map((item: any, index: number) => (
                                                                <div className="row mt-3" key={index}>
                                                                    <div className="col-sm key">
                                                                        {item.classificationValue}
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        <div className='form-field-group'>
                                                                            <Form.Control
                                                                                onChange={handleChange}
                                                                                type='number'
                                                                                placeholder='5'
                                                                                name='costBasis'
                                                                                value={item.allocation || 0}
                                                                            />
                                                                            <span className='input-add-on'>%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="assetclass" title="Asset Class">
                                                    <div className="row mt-4">
                                                        <div className="col-sm">
                                                            {holdingsDetails?.classifications['Asset Class'].map((item: any, index: number) => (
                                                                <div className="row mt-3" key={index}>
                                                                    <div className="col-sm key">
                                                                        {item.classificationValue}
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        <div className='form-field-group'>
                                                                            <Form.Control
                                                                                onChange={handleChange}
                                                                                type='number'
                                                                                placeholder='5'
                                                                                name='costBasis'
                                                                                value={item.allocation || 0}
                                                                            />
                                                                            <span className='input-add-on'>%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="country" title="Country">
                                                    <div className="row mt-4">
                                                        <div className="col-sm">
                                                            {holdingsDetails?.classifications.Country.map((item: any, index: number) => (
                                                                <div className="row mt-3" key={index}>
                                                                    <div className="col-sm key">
                                                                        {item.classificationValue}
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        <div className='form-field-group'>
                                                                            <Form.Control
                                                                                onChange={handleChange}
                                                                                type='number'
                                                                                placeholder='5'
                                                                                name='costBasis'
                                                                                value={item.allocation || 0}
                                                                            />
                                                                            <span className='input-add-on'>%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="risk" title="Risk">
                                                    <div className="row mt-4">
                                                        <div className="col-sm">
                                                            {holdingsDetails?.classifications.Risk.map((item: any, index: number) => (
                                                                <div className="row mt-3" key={index}>
                                                                    <div className="col-sm key">
                                                                        {item.classificationValue}
                                                                    </div>
                                                                    <div className="col-sm">
                                                                        <div className='form-field-group'>
                                                                            <Form.Control
                                                                                onChange={handleChange}
                                                                                type='number'
                                                                                placeholder='5'
                                                                                name='costBasis'
                                                                                value={item.allocation || 0}
                                                                            />
                                                                            <span className='input-add-on'>%</span>
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
