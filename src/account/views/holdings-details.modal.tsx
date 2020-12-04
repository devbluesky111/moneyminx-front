import React, { useState } from 'react';
import { Tabs, Tab, Form } from 'react-bootstrap';

import { getUnique } from 'common/common-helper';
import { Modal, ModalType } from 'common/components/modal';

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

    const handleCancel = () => {
        holdingsDetailsModal.close();
    }

    const handleSubmit = async () => {

    }

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
        <Modal {...holdingsDetailsModal.props} title={holdingsDetails?.description} size='xxl' canBeClosed onClose={() => holdingsDetailsModal.close()}>
            < div className='modal-wrapper mm-holdings-details-modal' >
                <span className='description'>To maintain integrity of the data with your institution you can only update a few of the fields.</span>
                <div className='mm-manual-account-modal__title mt-3'>
                    <Tabs defaultActiveKey="details" transition={false} id="holdings-details-modal">
                        <Tab eventKey="details" title="Details">
                            {!holdingsDetails?.isManual ?
                                <div className="row mt-4">
                                    <div className="col-sm">
                                        {holdingsDetails?.holdingType &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Holding Type
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.holdingType}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.securityType &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Security Type
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.securityType}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.price &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Price
                                        </div>
                                                <div className="col-sm">
                                                    ${holdingsDetails?.price}
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
                                        {holdingsDetails?.quantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Quantity
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.quantity}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.symbol &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Symbol
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.symbol}
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
                                                        onChange={() => { }}
                                                        type='number'
                                                        placeholder='5'
                                                        name='costBasis'
                                                        value={holdingsDetails?.costBasis || 0}
                                                    />
                                                    <span className='input-add-on'>$</span>
                                                </div>
                                            </div>
                                        </div>
                                        {holdingsDetails?.costBasisCurrency &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Cost Currency
                                                </div>
                                                <div className="col-sm ">
                                                    {holdingsDetails?.costBasisCurrency}
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
                                        {(holdingsDetails?.optionType !== 'unknown' && holdingsDetails?.optionType) &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Option Type
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.optionType}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedQuantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Quantity
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.vestedQuantity}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedSharesExercisable &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Shared Exercisable
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.vestedSharesExercisable}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedValue &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Value
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.vestedValue}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedValue &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Currency
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.vestedValueCurrency}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedDate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Date
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.vestedDate}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.unvestedQuantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Unvested Quantity
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.unvestedQuantity}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.unvestedValue &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Unvested Value
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.unvestedValue}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.unvestedValue &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Unvested Currency
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.unvestedValueCurrency}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.exercisedQuantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Excercised Quantity
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.exercisedQuantity}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.expirationDate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Expiration Date
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.expirationDate}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.grantDate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Grant Date
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.grantDate}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.spread &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Spread
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.spread}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.spread &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Spread Currency
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.spreadCurrency}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.strikePrice &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Strike Price
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.strikePrice}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.strikePrice &&
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
                                        {holdingsDetails?.contractQuantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Contract Quantity
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.contractQuantity}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.cusipNumber &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    CUSIP
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.cusipNumber}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.isin &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    ISIN
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.isin}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.sedol &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    SEDOL
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.sedol}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.isShort &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Short?
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.isShort ? 'Yes' : 'No'}
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
                                        {holdingsDetails?.couponRate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Coupon
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.couponRate}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.interestRate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Interest Rate
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.interestRate}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.maturityDate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Maturity Date
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.maturityDate}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.term &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Term
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.term}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.accruedInterest &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Accrued Interest
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.accruedInterest}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.accruedInterest &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Interest Currency
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.accruedInterestCurrency}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.accruedIncome &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Accrued Income
                                        </div>
                                                <div className="col-sm">
                                                    {holdingsDetails?.accruedIncome}
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.accruedIncome &&
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
                                        {holdingsDetails?.holdingType &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Holding Type
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='holdingType'
                                                            value={holdingsDetails?.holdingType}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.price &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Price
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='price'
                                                            value={holdingsDetails?.price}
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
                                                            onChange={() => { }}
                                                            name='priceCurrency'
                                                            value={holdingsDetails?.priceCurrency}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.quantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Quantity
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='quantity'
                                                            value={holdingsDetails?.quantity}
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
                                                        onChange={() => { }}
                                                        type='number'
                                                        name='costBasis'
                                                        value={holdingsDetails?.costBasis || 0}
                                                    />
                                                    <span className='input-add-on'>$</span>
                                                </div>
                                            </div>
                                        </div>
                                        {holdingsDetails?.costBasisCurrency &&
                                            <div className="row mt-2">
                                                <div className="col-sm key">
                                                    Cost Currency
                                                </div>
                                                <div className="col-sm ">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='costBasisCurrency'
                                                            value={holdingsDetails?.costBasisCurrency}
                                                        />
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
                                        {(holdingsDetails?.optionType !== 'unknown' && holdingsDetails?.optionType) &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Option Type
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='optionType'
                                                            value={holdingsDetails?.optionType}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedQuantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Quantity
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='vestedQuantity'
                                                            value={holdingsDetails?.vestedQuantity}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedSharesExercisable &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Shared Exercisable
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='vestedSharesExercisable'
                                                            value={holdingsDetails?.vestedSharesExercisable}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedValue &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Value
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='vestedValue'
                                                            value={holdingsDetails?.vestedValue}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedValue &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Currency
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='vestedValueCurrency'
                                                            value={holdingsDetails?.vestedValueCurrency}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.vestedDate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Vested Date
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='vestedDate'
                                                            value={holdingsDetails?.vestedDate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.unvestedQuantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Unvested Quantity
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='unvestedQuantity'
                                                            value={holdingsDetails?.unvestedQuantity}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.unvestedValue &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Unvested Value
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='unvestedValue'
                                                            value={holdingsDetails?.unvestedValue}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.unvestedValue &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Unvested Currency
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='unvestedValue'
                                                            value={holdingsDetails?.unvestedValue}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.exercisedQuantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Excercised Quantity
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='exercisedQuantity'
                                                            value={holdingsDetails?.exercisedQuantity}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.expirationDate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Expiration Date
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='expirationDate'
                                                            value={holdingsDetails?.expirationDate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.grantDate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Grant Date
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='grantDate'
                                                            value={holdingsDetails?.grantDate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.strikePrice &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Strike Price
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='strikePrice'
                                                            value={holdingsDetails?.strikePrice}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.strikePrice &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Strike Currency
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='strikePriceCurrency'
                                                            value={holdingsDetails?.strikePriceCurrency}
                                                        />
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
                                        {holdingsDetails?.contractQuantity &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Contract Quantity
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='contractQuantity'
                                                            value={holdingsDetails?.contractQuantity}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.isShort &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Short?
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='isShort'
                                                            value={holdingsDetails?.isShort}
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
                                        {holdingsDetails?.couponRate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Coupon
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='couponRate'
                                                            value={holdingsDetails?.couponRate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.interestRate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Interest Rate
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            type='number'
                                                            name='interestRate'
                                                            value={holdingsDetails?.interestRate}
                                                        />
                                                        <span className='input-add-on'>%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.maturityDate &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Maturity Date
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='maturityDate'
                                                            value={holdingsDetails?.maturityDate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {holdingsDetails?.term &&
                                            <div className="row mt-2">
                                                <div className="col-sm">
                                                    Term
                                                </div>
                                                <div className="col-sm">
                                                    <div className='form-field-group'>
                                                        <Form.Control
                                                            onChange={() => { }}
                                                            name='term'
                                                            value={holdingsDetails?.term}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                        onChange={() => { }}
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
                                                                onChange={() => { }}
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
                                                                onChange={() => { }}
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
                                                                onChange={() => { }}
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
                                                                onChange={() => { }}
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
                        <button className='mm-btn-animate mm-btn-primary d-flex align-items-center justify-content-center' onClick={handleSubmit}>
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
    );
};

export default HoldingsDetailsModal;
