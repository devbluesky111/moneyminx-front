import React, { useEffect, useState } from 'react';
import FormControl from 'react-bootstrap/esm/FormControl';

import { Formik } from 'formik';
import { Account } from 'auth/auth.types';
import { IBalanceData } from 'account/account.type';
import { Modal, ModalType } from 'common/components/modal';
import { getAccountDetailBalances } from 'api/request.api';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { getYear, groupBalanceByYear } from 'account/account.helper';
import { dateToString, parseDateFromString, getPreviousYearFirstDate } from 'common/moment.helper';

interface IAccountBalanceModal {
  accountBalanceModal: ModalType;
  account?: Account;
}

export interface IFormBalance {
  date: string;
  balance: number | null;
}

export type TFormBalances = IFormBalance[] | undefined;

const AccountBalanceModal: React.FC<IAccountBalanceModal> = ({ accountBalanceModal, account }) => {
  const [loading, setLoading] = useState(false);
  const [balanceData, setBalanceData] = useState<IBalanceData>();
  const accountId = account?.id;

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
  }, [accountId]);

  const balances = balanceData?.balances;
  const formBalances: TFormBalances = balances?.map((balanceItem) => ({
    date: dateToString(parseDateFromString(balanceItem.interval)),
    balance: balanceItem.balance || 0,
  }));

  const renderModalContent = () => {
    if (loading || !formBalances?.length) {
      return <CircularSpinner />;
    }

    // filter and make data for three different years
    const yearGroupedBalances = groupBalanceByYear(formBalances);
    // formik initialize (done)
    // create tab and render form fields based on the year
    // on-tab change do not reinitialize the data

    const tabTitles = Object.keys(yearGroupedBalances);

    return (
      <Formik
        initialValues={{
          balances: formBalances,
          currentYear: tabTitles[0] || '',
        }}
        onSubmit={() => {}}
      >
        {(props) => {
          const { values, setValues, setFieldValue } = props;

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

          const inputCollection = values.balances
            .filter((balance) => getYear(balance.date) === values.currentYear)
            .map((balance, index) => {
              return (
                <React.Fragment key={index}>
                  {balance.date}
                  <FormControl
                    type='number'
                    step='0.1'
                    name={balance.date}
                    onChange={handleBalanceChange}
                    value={getFieldValue(balance.date)}
                  />
                </React.Fragment>
              );
            });

          const renderTabTitle = () => {
            return tabTitles.map((title) => {
              return (
                <span key={title} onClick={() => changeCurrentYear(title)} role='button'>
                  {title}
                </span>
              );
            });
          };

          return (
            <div>
              {renderTabTitle()}
              <br />
              {inputCollection}
            </div>
          );
        }}
      </Formik>
    );
  };

  return (
    <Modal {...accountBalanceModal.props} title='Account Balance Modal' canBeClosed>
      {renderModalContent()}
    </Modal>
  );
};

export default AccountBalanceModal;
