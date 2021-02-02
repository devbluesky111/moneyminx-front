import Tab from 'react-bootstrap/esm/Tab';
import Col from 'react-bootstrap/esm/Col';
import Tabs from 'react-bootstrap/esm/Tabs';
import Label from 'react-bootstrap/esm/FormLabel';
import React, { useEffect, useState } from 'react';
import FormControl from 'react-bootstrap/esm/FormControl';

import { Formik } from 'formik';
import { Account } from 'auth/auth.types';
import useToast from 'common/hooks/useToast';
import { IBalanceData } from 'account/account.type';
import { numberWithCommas } from 'common/number.helper';
import { Modal, ModalType } from 'common/components/modal';
import { getYear, groupBalanceByYear } from 'account/account.helper';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { getAccountDetailBalances, putBalanceAccountDetails } from 'api/request.api';
import {
  isToday,
  isFuture,
  dateToString,
  getFullMonth,
  getLastDateOfMonth,
  parseDateFromString,
  getPreviousYearFirstDate,
} from 'common/moment.helper';

interface IAccountBalanceModal {
  account?: Account;
  currencySymbol: string;
  accountBalanceModal: ModalType;
  onSuccess: () => void;
}

export interface IFormBalance {
  date: string;
  balance: number | null;
}

export type TFormBalances = IFormBalance[] | undefined;

const AccountBalanceModal: React.FC<IAccountBalanceModal> = ({
  account,
  onSuccess,
  currencySymbol,
  accountBalanceModal,
}) => {
  const [loading, setLoading] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [balanceData, setBalanceData] = useState<IBalanceData>();
  const accountId = account?.id;
  const { mmToast } = useToast();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fromDate = getPreviousYearFirstDate(2);
      const { data, error } = await getAccountDetailBalances({ accountId, fromDate });
      setLoading(false);

      if (!error) {
        setBalanceData(data);
      }
    })();
  }, [accountId, refreshCounter]);

  const getFormattedDate = (interval: string): Date => {
    const parsedDate = parseDateFromString(interval);

    if (isToday(parsedDate)) {
      return parsedDate;
    }

    return getLastDateOfMonth(parsedDate);
  };

  const balances = balanceData?.balances;
  const formBalances: TFormBalances = balances?.map((balanceItem) => ({
    date: dateToString(getFormattedDate(balanceItem.interval)),
    balance: balanceItem.balance || 0,
  }));

  const renderModalContent = () => {
    if (loading || !formBalances?.length) {
      return <CircularSpinner />;
    }

    const yearGroupedBalances = groupBalanceByYear(formBalances);

    const tabTitles = Object.keys(yearGroupedBalances);

    return (
      <Formik
        initialValues={{
          balances: formBalances,
          currentYear: new Date().getFullYear().toString() || '',
        }}
        onSubmit={async (values, actions) => {
          setLoading(true);
          const { error } = await putBalanceAccountDetails(`${accountId}`, { balances: values.balances });
          setLoading(false);
          actions.setSubmitting(false);

          if (error) {
            return mmToast('Error occurred on updating balance account', { type: 'error' });
          }

          setRefreshCounter((c) => c + 1);
          onSuccess();

          return accountBalanceModal.close();
        }}
      >
        {(props) => {
          const { values, setValues, setFieldValue, handleSubmit } = props;

          const handleBalanceChange = (e: React.ChangeEvent<any>) => {
            const name = e.target.name;
            const value = e.target.value;
            const balanceValues = values.balances;

            const filteredBalances = balanceValues.map((b) => {
              if (b.date === name) {
                return {
                  ...b,
                  balance: +value,
                };
              }
              return b;
            });

            setValues({ ...values, balances: filteredBalances });
          };

          const changeCurrentYear = (yearTitle: string) => {
            return setFieldValue('currentYear', yearTitle);
          };

          const getFieldValue = (key: string) => {
            return values.balances.find((bal) => bal.date === key)?.balance || 0;
          };

          const renderMonthElements = (from = 0, to = 6) => {
            return values.balances
              .filter((balance) => getYear(balance.date) === values.currentYear)
              .map((balanceItem, index) => {
                if (index >= from && index < to) {
                  return (
                    <li className='form-row' key={balanceItem.date}>
                      <Label sm='7'>{getFullMonth(balanceItem.date)}</Label>
                      <Col sm='5'>
                        {isFuture(balanceItem.date) ? (
                          <>
                            <span className='input-add-on left'>{currencySymbol || '$'}</span>
                            <span>{numberWithCommas(+balanceItem.balance! || 0)}</span>
                          </>
                        ) : (
                          <FormControl
                            disabled={isFuture(balanceItem.date)}
                            type='number'
                            step='0.01'
                            name={balanceItem.date}
                            onChange={handleBalanceChange}
                            value={getFieldValue(balanceItem.date)}
                          />
                        )}
                        {!isFuture(balanceItem.date) ? (
                          <span className='input-add-on'>{currencySymbol || '$'}</span>
                        ) : null}
                      </Col>
                    </li>
                  );
                }

                return null;
              });
          };

          const renderFormActions = () => {
            return (
              <div className='balance-modal-form__action-wrapper'>
                <button
                  className='mm-btn-animate btn-outline-primary'
                  type='button'
                  onClick={accountBalanceModal.close}
                  disabled={props.isSubmitting}
                >
                  Cancel
                </button>
                <button className='mm-btn-primary mm-btn-animate' type='submit' disabled={props.isSubmitting}>
                  Save Changes
                </button>
              </div>
            );
          };

          const renderFormElements = () => {
            return (
              <div className='form-elements-wrapper'>
                <ul className='modal-form-row'>{renderMonthElements(0, 6)}</ul>
                <ul className='modal-form-row'>{renderMonthElements(6, 12)}</ul>
              </div>
            );
          };

          const renderTabContent = () => {
            return (
              <div className='balance-modal-wrapper'>
                <span className='description'>Enter the monthly balance of this account</span>
                <Tabs
                  defaultActiveKey={new Date().getFullYear()}
                  id='yearly-balance'
                  className='mt-3'
                  style={{ maxWidth: tabTitles.length >= 4 ? '536.5px' : '403.5px' }}
                >
                  {tabTitles.map((title, index) => {
                    return (
                      <Tab eventKey={title} title={title} key={title} onEnter={() => changeCurrentYear(title)}>
                        <div className='yearly-form-wrapper'>{renderFormElements()}</div>
                      </Tab>
                    );
                  })}
                  <Tab title='' />
                </Tabs>
              </div>
            );
          };

          return (
            <form className='balance-modal-form' onSubmit={handleSubmit}>
              {renderTabContent()}
              {renderFormActions()}
            </form>
          );
        }}
      </Formik>
    );
  };

  return (
    <Modal {...accountBalanceModal.props} title='Monthly Balances' size='mdx' canBeClosed>
      {renderModalContent()}
    </Modal>
  );
};

export default AccountBalanceModal;
