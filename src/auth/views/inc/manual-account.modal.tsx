import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

import CircularSpinner from 'common/components/spinner/circular-spinner';
import { currencyArray } from 'common/currency-helper';
import { Modal, ModalType } from 'common/components/modal';
import { getManualAccountType, postManualAccount } from 'api/request.api';
import { appRouteConstants } from 'app/app-route.constant';
import { useHistory } from 'react-router-dom';

interface SettingModalProps {
    manualAccountModal: ModalType;
}

const initialValues = {
    yodleeAccountType: '',
    accountName: '',
    nickname: '',
    balance: '',
    accountNumber: '',
    currency: '',
};

const ManualAccountModal: React.FC<SettingModalProps> = ({ manualAccountModal }) => {
    const history = useHistory();
    const [values, setValues] = useState(initialValues);
    const [AccountTypes, setAccountTypes] = useState([]);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const curArr = currencyArray();

    const handleChange = (e: React.ChangeEvent<any>) => {
        if (e.target.name === 'balance') {
            let _float = parseFloat(e.target.value);
            setValues({ ...values, [e.target.name]: _float });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const handleCancel = () => {
        manualAccountModal.close();
        setValues(initialValues);
    }

    const handleSubmit = async () => {
        setLoading(true);
        const { data: res, error: err } = await postManualAccount(values);
        if (!err) {
            console.log(res);
            setValues(initialValues);
            setLoading(false);
            toast('Add Success', { type: 'success' });
            manualAccountModal.close();
            history.push(appRouteConstants.account.ACCOUNT.replace(':accountId', res.id));
        } else {
            console.log(err);
            setLoading(false);
            toast(' Add Failed', { type: 'error' });
        }
    };

    const fetchAccountTypes = async () => {
        const { data, error } = await getManualAccountType();
        if (!error) {
            setAccountTypes(data);
        }
    };

    React.useEffect(() => {
        fetchAccountTypes();
    }, [])

    React.useEffect(() => {
        setValues(initialValues);
    }, [manualAccountModal])

    React.useEffect(() => {
        console.log(Object.values(values))
        for (let i = 0; i < Object.values(values).length; i++) {
            if (!Object.values(values)[i]) {
                setDisabled(true);
                break;
            }
            setDisabled(false);
        }
    }, [values])

    return (
        <Modal {...manualAccountModal.props} title='Add Manual Accounts' size='lg' canBeClosed onClose={() => manualAccountModal.close()}>
            <div className='modal-wrapper mm-manual-account-modal'>
                <span className='description'>With manual accounts you can track any asset and liablity that is not currently supported by our integration partners.</span>
                <div className='mm-manual-account-modal__title mt-3'>
                    <Form>
                        <div className='row-set'>
                            <Form.Group controlId='ManualAccountForm.AccountName' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Account Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Sapphire Credit Card'
                                    onChange={handleChange}
                                    name='accountName'
                                    value={values.accountName}
                                />
                            </Form.Group>
                            <Form.Group controlId='ManualAccountForm.nickname' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Nick Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Sapphire'
                                    onChange={handleChange}
                                    name='nickname'
                                    value={values.nickname}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className='row-set'>
                            <Form.Group controlId='ManualAccountForm.AccountType' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Account Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name='yodleeAccountType'
                                    onChange={handleChange}
                                >
                                    <option value=''>Select Account Type</option>
                                    {AccountTypes.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='ManualAccountForm.AccountNumber' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Account Number</Form.Label>
                                <Form.Control
                                    name='accountNumber'
                                    type='number'
                                    placeholder='45432'
                                    onChange={handleChange}
                                    value={values.accountNumber}
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className='row-set'>
                            <Form.Group controlId='ManualAccountForm.CurrentBalance' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Current Balance</Form.Label>
                                <Form.Control
                                    name='balance'
                                    type='number'
                                    placeholder='43,233'
                                    onChange={handleChange}
                                    value={values.balance}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId='ManualAccountForm.Currency' className='child'>
                                <Form.Label className='mm-manual-account-modal__sub-title'>Currency</Form.Label>
                                <Form.Control
                                    as='select'
                                    name='currency'
                                    onChange={handleChange}
                                >
                                    <option value=''>Select Currency</option>
                                    {curArr.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </Form>
                    <div className='action-wrapper mt-3'>
                        <button className='btn-outline-primary mm-btn-animate' onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className='mm-btn-animate mm-btn-primary' onClick={handleSubmit} disabled={disabled}>
                            Add <span className='hide-sm'>Account</span>
                            {loading &&
                                <span className='spinner'>
                                    <CircularSpinner />
                                </span>
                            }
                        </button>

                    </div>
                </div>
            </div>
        </Modal >
    );
};

export default ManualAccountModal;
