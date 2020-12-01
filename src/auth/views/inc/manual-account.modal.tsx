import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

import { FormControl } from 'react-bootstrap';
import { Modal, ModalType } from 'common/components/modal';
import { patchAllocationChartSettings } from 'api/request.api';

interface SettingModalProps {
    manualAccountModal: ModalType;
}

const initialData = {
    yodleeAccountType: '',
    accountName: '',
    balance: 0,
    accountNumber: '',
    currency: '',
};

const ManualAccountModal: React.FC<SettingModalProps> = ({ manualAccountModal }) => {
    const [data, setData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<any>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleCancel = () => manualAccountModal.close();

    const handleSubmit = async () => {

        const { data: patchResponse, error: allocationError } = await patchAllocationChartSettings(data);

        if (!allocationError) {
            setData({ ...patchResponse });
            manualAccountModal.close();
        }
    };

    return (
        <Modal {...manualAccountModal.props} title='Add Manual Accounts' size='lg' canBeClosed onClose={() => manualAccountModal.close()}>
            <div className='modal-wrapper mm-manual-account-modal'>
                <span className='description'>With manual accounts you can track any asset and liablity that is not currently supported by our integration partners.</span>
                <div className='mm-manual-account-modal__title'>
                    <Form>
                        <Form.Group controlId='ManualAccountForm.AccountName'>
                            <Form.Label className='mm-manual-account-modal__sub-title'>Account Name</Form.Label>
                            <Form.Control
                                type='text'
                                size='lg'
                                placeholder='Sapphire Credit Card'
                                onChange={handleChange}
                                name='title'
                                value={data.accountName}
                            />
                            <FormControl.Feedback type='invalid' className='feedback text-right'>
                                Sapphire Credit Card
                            </FormControl.Feedback>
                        </Form.Group>
                        <div className='row-set'>
                            <Form.Group controlId='ManualAccountForm.AccountType' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Account Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name='description'
                                    onChange={handleChange}
                                    value={data.yodleeAccountType}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='ManualAccountForm.AccountNumber' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Account Number</Form.Label>
                                <Form.Control
                                    name='description'
                                    type='number'
                                    placeholder='45432'
                                    onChange={handleChange}
                                    value={data.yodleeAccountType}
                                />
                            </Form.Group>
                        </div>
                        <div className='row-set'>
                            <Form.Group controlId='ManualAccountForm.CurrentBalance' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Current Balance</Form.Label>
                                <Form.Control
                                    name='description'
                                    type='number'
                                    placeholder='43,233'
                                    onChange={handleChange}
                                    value={data.yodleeAccountType}
                                />
                            </Form.Group>
                            <Form.Group controlId='ManualAccountForm.Currency' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Currency</Form.Label>
                                <Form.Control
                                    name='description'
                                    placeholder='USD'
                                    onChange={handleChange}
                                    value={data.yodleeAccountType}
                                />
                            </Form.Group>
                        </div>
                    </Form>
                    <div className='action-wrapper mt-3'>
                        <button className='btn-outline-primary mm-btn-animate' onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className='mm-btn-animate mm-btn-primary' onClick={handleSubmit}>
                            Add <span className='hide-sm'>Account</span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ManualAccountModal;
