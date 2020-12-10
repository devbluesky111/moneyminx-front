import moment from 'moment';
import ReactDatePicker from 'react-datepicker';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import { ActivityDetailsModalProps } from 'account/account.type';
import { getDateFormatedString } from 'common/moment.helper';
import { getActivityTypes, patchTransaction, postTransaction } from 'api/request.api';
import { Modal } from 'common/components/modal';
import { SelectInput } from 'common/components/input/select.input';

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ activityDetailsModal, activityDetails, closeEditActivityModal, accountId, closeNewActivityModal, currencySymbol }) => {

    const [loading, setLoading] = useState(false);
    const [activityTypes, setActivityTypes] = useState<string[]>([]);

    const fetchActivityTypes = async () => {
        const { data, error } = await getActivityTypes();
        if (!error) {
            let types = [];
            for (let i = 0; i < data.length; i++) {
                types.push(data[i].type);
            }
            setActivityTypes(types);
        }
    }

    useEffect(() => {
        fetchActivityTypes();
    }, [])

    return (
        <Formik
            initialValues={{
                date: activityDetails && activityDetails.date ? new Date(activityDetails.date) : new Date(),
                type: activityDetails?.type || '',
                description: activityDetails?.description || '',
                amount: activityDetails?.amount || 0,
                balance: activityDetails?.balance || 0,
                income: activityDetails?.income || false,
                cashFlow: activityDetails?.cashFlow || false,
                isIgnored: activityDetails?.isIgnored || false,
                accountId: accountId
            }}
            onSubmit={async (values: any, actions: any) => {

                const activityId = activityDetails?.id;

                let data = {};

                Object.keys(values).forEach((key: any) => {
                    const value = (values as any)[key];

                    if (value === '') {
                        data = { ...data, [key]: undefined };
                        return;
                    }

                    data = { ...data, [key]: value };
                });

                setLoading(true);
                if (activityId) {
                    const res = await patchTransaction(`${activityId}`, data);
                    if (res?.error) {
                        setLoading(false);
                        return toast('Error Occurred', { type: 'error' });
                    }
                    setLoading(false);
                    closeEditActivityModal?.();
                    activityDetailsModal.close();
                    return toast('Successfully updated', { type: 'success' });
                }

                // new position
                const res = await postTransaction(data);
                if (res?.error) {
                    setLoading(false);
                    return toast('Error Occurred', { type: 'error' });
                }
                setLoading(false);
                closeNewActivityModal?.();
                activityDetailsModal.close();
                return toast('Successfully Added', { type: 'success' });
            }}
        >
            {(props) => {
                const { values, handleChange, setValues, setFieldValue } = props;

                const handleSelectChange = (e: React.ChangeEvent<any>) => {
                    setValues({ ...values, [e.target.name]: e.target.value });
                };

                const handleYesNoChange = (e: React.ChangeEvent<any>) => {
                    const value = e.target.value === 'Yes' ? true : false;
                    setValues({ ...values, [e.target.name]: value });
                };

                const toggleFormCheck = (name: string) => {
                    setFieldValue(name, !(values as any)[name]);
                };

                return (
                    <form onSubmit={props.handleSubmit}>
                        <Modal {...activityDetailsModal.props} title={activityDetails?.description || 'New Activity'} size='xxl' bgColor='#081833' canBeClosed onClose={() => activityDetailsModal.close()}>
                            <div className='modal-wrapper mm-activity-details-modal' >
                                <div className='mm-manual-account-modal__title mt-3'>
                                    {activityDetails && !activityDetails.isManual ?
                                        <>
                                            <div className='row one-row'>
                                                <div className='col-sm-12 col-md-4 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Date
                                                    </div>
                                                    <div className='col-sm-8 text-light'>
                                                        {getDateFormatedString(values.date)}
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-4 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Type
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <SelectInput
                                                            args={activityTypes}
                                                            onChange={handleSelectChange}
                                                            value={values.type}
                                                            name='type'
                                                            format={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-4 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Description
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <Form.Control
                                                            onChange={handleChange}
                                                            name='description'
                                                            value={values.description}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row one-row'>
                                                <div className='col-sm-12 col-md-3 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Amount
                                                    </div>
                                                    <div className='col-sm-8 text-light'>
                                                        {currencySymbol}{values.amount}
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-3 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Balance
                                                    </div>
                                                    <div className='col-sm-8 text-light'>
                                                        {currencySymbol}{values.balance}
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-3 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Income
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <SelectInput
                                                            args={['Yes', 'No']}
                                                            onChange={handleYesNoChange}
                                                            value={values.income ? 'Yes' : 'No'}
                                                            name='income'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-3 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        CashFlow
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <SelectInput
                                                            args={['Yes', 'No']}
                                                            onChange={handleYesNoChange}
                                                            value={values.cashFlow ? 'Yes' : 'No'}
                                                            name='cashFlow'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </> :
                                        <>
                                            <div className='row one-row'>
                                                <div className='col-sm-12 col-md-4 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Date
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <ReactDatePicker
                                                            name='date'
                                                            selected={values.date ? new Date(values.date) : null}
                                                            onChange={(val: Date) => {
                                                                setFieldValue('date', moment(val).toISOString());
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-4 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Type
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <SelectInput
                                                            args={activityTypes}
                                                            onChange={handleSelectChange}
                                                            value={values.type}
                                                            name='type'
                                                            format={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-4 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Description
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <Form.Control
                                                            onChange={handleChange}
                                                            name='description'
                                                            value={values.description}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row one-row'>
                                                <div className='col-sm-12 col-md-3  mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Amount
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <Form.Control
                                                            onChange={handleChange}
                                                            type='number'
                                                            name='amount'
                                                            value={values.amount}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-3 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Balance
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <Form.Control
                                                            onChange={handleChange}
                                                            type='number'
                                                            name='balance'
                                                            value={values.balance}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-3 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        Income
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <SelectInput
                                                            args={['Yes', 'No']}
                                                            onChange={handleYesNoChange}
                                                            value={values.income ? 'Yes' : 'No'}
                                                            name='income'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-sm-12 col-md-3 mt-3 row align-items-center'>
                                                    <div className='col-sm-4 text-light'>
                                                        CashFlow
                                                    </div>
                                                    <div className='col-sm-8'>
                                                        <SelectInput
                                                            args={['Yes', 'No']}
                                                            onChange={handleYesNoChange}
                                                            value={values.cashFlow ? 'Yes' : 'No'}
                                                            name='cashFlow'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    <div className='action-wrapper mt-3 form-wrap'>
                                        <span className='checkbox-item'>
                                            <label className='check-box'>
                                                Ignore this transaction
                                                <input
                                                    type='checkbox'
                                                    name='isIgnored'
                                                    value='false'
                                                    checked={values.isIgnored}
                                                    onChange={() => toggleFormCheck('isIgnored')}
                                                    aria-checked={values.isIgnored}
                                                />
                                                <span className='geekmark' />
                                            </label>
                                        </span>
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

export default ActivityDetailsModal;
