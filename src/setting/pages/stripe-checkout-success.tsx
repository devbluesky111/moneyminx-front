import queryString from 'query-string';
import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useModal } from 'common/components/modal';
import PlanChangedModal from 'setting/inc/plan-changed.modal';
import SubscriptionModal from 'setting/inc/subscription.modal';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';

const StripeCheckoutSuccess = () => {
  const location = useLocation();
  const history = useHistory();
  const isTrial = queryString.parse(location.search).trial === 'true';

  const subscriptionModal = useModal();
  const planChangedModal = useModal();

  const { fetchingCurrentSubscription, currentSubError } = useCurrentSubscription();

  if (currentSubError) {
    toast('Error on getting current subscription', { type: 'error' });
  }

  useEffect(() => {
    if (isTrial) {
      return subscriptionModal.open();
    }

    return planChangedModal.open();
  }, [isTrial, subscriptionModal, planChangedModal]);

  if (fetchingCurrentSubscription) {
    return <CircularSpinner />;
  }

  const redirectToNetworth = () => {
    history.push('/net-worth');
  };

  return (
    <>
      <SubscriptionModal subscriptionModal={subscriptionModal} onSuccess={redirectToNetworth} />
      <PlanChangedModal planChangedModal={planChangedModal} onSuccess={redirectToNetworth} />
    </>
  );
};

export default StripeCheckoutSuccess;
