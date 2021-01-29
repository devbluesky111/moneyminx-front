import React, { useEffect, useState } from 'react';

import { Formik } from 'formik';
import { Account } from 'auth/auth.types';
import { IBalanceData } from 'account/account.type';
import { Modal, ModalType } from 'common/components/modal';
import { getAccountDetailBalances } from 'api/request.api';
import CircularSpinner from 'common/components/spinner/circular-spinner';
import { dateToString, parseDateFromString, getPreviousYearFirstDate } from 'common/moment.helper';

interface IAccountBalanceModal {
  accountBalanceModal: ModalType;
  account?: Account;
}

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
  const formBalances = balances?.map((balanceItem) => ({
    date: dateToString(parseDateFromString(balanceItem.interval)),
    balance: balanceItem.balance,
  }));

  const renderModalContent = () => {
    if (loading || !formBalances?.length) {
      return <CircularSpinner />;
    }

    // filter and make data for three different years
    // formik initialize
    // create tab and render form fields based on the year
    // on-tab change do not reinitialize the data

    return (
      <Formik
        initialValues={{
          balances: formBalances,
        }}
        onSubmit={() => {}}
      >
        {(props) => {
          return <div>form here</div>;
        }}
      </Formik>
    );
  };

  return (
    <Modal {...accountBalanceModal.props} title='Account Balance Modal' canBeClosed>
      {renderModalContent()}
      Account detail Modal
    </Modal>
  );
};

export default AccountBalanceModal;
