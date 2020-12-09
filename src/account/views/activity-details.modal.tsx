import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { Formik } from 'formik';
import { ActivityDetailsModalProps } from 'account/account.type';
import { Modal } from 'common/components/modal';
import { getActivityTypes, patchTransaction, postTransaction } from 'api/request.api';
import { SelectInput } from 'common/components/input/select.input';

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({ activityDetailsModal, activityDetails, closeEditActivityModal, accountId, closeNewActivityModal, currencySymbol }) => {

    const [loading, setLoading] = useState(false);
    const [activityTypes, setActivityTypes] = useState<string[]>([]);

    const handleCancel = () => {
        activityDetailsModal.close();
    }

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
                const { values, handleChange, setValues } = props;

                const handleSelectChange = (e: React.ChangeEvent<any>) => {
                    setValues({ ...values, [e.target.name]: e.target.value });
                };

                const handleYesNoChange = (e: React.ChangeEvent<any>) => {
                    const value = e.target.value === 'Yes' ? true : false;
                    setValues({ ...values, [e.target.name]: value });
                };

                return (
                    <form onSubmit={props.handleSubmit}>
                        <Modal {...activityDetailsModal.props} title={activityDetails?.description || 'New Activity'} size='xxl' canBeClosed onClose={() => activityDetailsModal.close()}>
                            <div className='modal-wrapper mm-holdings-details-modal' >
                                <div className='mm-manual-account-modal__title mt-3'>
                                    {activityDetails && !activityDetails.isManual ?
                                        <div className='row align-items-center'>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    {moment(values.date).format('MM/DD/YYYY')}
                                                </div>
                                            </div>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    <SelectInput
                                                        args={activityTypes}
                                                        onChange={handleSelectChange}
                                                        value={values.type}
                                                        name='type'
                                                    />
                                                </div>
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
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    {currencySymbol}{values.amount}
                                                </div>
                                            </div>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    {currencySymbol}{values.balance}
                                                </div>
                                            </div>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    <SelectInput
                                                        args={['Yes', 'No']}
                                                        onChange={handleYesNoChange}
                                                        value={values.income ? 'Yes' : 'No'}
                                                        name='income'
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    <SelectInput
                                                        args={['Yes', 'No']}
                                                        onChange={handleYesNoChange}
                                                        value={values.cashFlow ? 'Yes' : 'No'}
                                                        name='cashFlow'
                                                    />
                                                </div>
                                            </div>
                                        </div> :
                                        <div className='row align-items-center'>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    {moment(values.date).format('MM/DD/YYYY')}
                                                </div>
                                            </div>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    <SelectInput
                                                        args={activityTypes}
                                                        onChange={handleSelectChange}
                                                        value={values.type}
                                                        name='type'
                                                    />
                                                </div>
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
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    <Form.Control
                                                        onChange={handleChange}
                                                        type='number'
                                                        name='amount'
                                                        value={values.amount}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    <Form.Control
                                                        onChange={handleChange}
                                                        type='number'
                                                        name='balance'
                                                        value={values.balance}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    <SelectInput
                                                        args={['Yes', 'No']}
                                                        onChange={handleYesNoChange}
                                                        value={values.income ? 'Yes' : 'No'}
                                                        name='income'
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-sm'>
                                                <div className='form-field-group'>
                                                    <SelectInput
                                                        args={['Yes', 'No']}
                                                        onChange={handleYesNoChange}
                                                        value={values.cashFlow ? 'Yes' : 'No'}
                                                        name='cashFlow'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className='action-wrapper mt-3'>
                                        <button className='btn-outline-primary mm-btn-animate' onClick={handleCancel} type='button'>
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

export default ActivityDetailsModal;
