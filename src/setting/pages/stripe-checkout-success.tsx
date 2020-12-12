import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useToast from 'common/hooks/useToast';
import { useModal } from 'common/components/modal';
import useAnalytics from 'common/hooks/useAnalytics';
import { appRouteConstants } from 'app/app-route.constant';
import PlanChangedModal from 'setting/inc/plan-changed.modal';
import { pricingDetailConstant } from 'common/common.constant';
import SubscriptionModal from 'setting/inc/subscription.modal';
import { getAccountsCount, getSubscription } from 'api/request.api';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';

const StripeCheckoutSuccess = () => {
  const history = useHistory();
  const location = useLocation();
  const { event } = useAnalytics();
  const { mmToast } = useToast();
  const isTrial = queryString.parse(location.search).trial === 'true';

  const subscriptionModal = useModal();
  const planChangedModal = useModal();

  const { fetchingCurrentSubscription, currentSubError, currentSubscription } = useCurrentSubscription();

  if (currentSubError) {
    mmToast('Error on getting current subscription', { type: 'error' });
  }

  useEffect(() => {
    if (currentSubscription) {
      event({
        category: 'Subscription',
        action: 'Subscribed',
        label: `Subscribed on ${currentSubscription.name} plan'`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSubscription]);

  useEffect(() => {
    if (isTrial) {
      return subscriptionModal.open();
    }

    return planChangedModal.open();
  }, [isTrial, subscriptionModal, planChangedModal]);

  if (fetchingCurrentSubscription) {
    return <CircularSpinner />;
  }

  const redirectToNetworth = async () => {
    const { priceId } = currentSubscription;
    const {
      data: { connectedAccounts, manualAccounts },
    } = await getAccountsCount();
    const {
      data: { details },
    } = await getSubscription({ priceId });
    if (
      connectedAccounts >= details[pricingDetailConstant.CONNECTED_ACCOUNT] ||
      manualAccounts >= details[pricingDetailConstant.MANUAL_ACCOUNT]
    ) {
      history.push(appRouteConstants.subscription.REVIEW);
    } else history.push(appRouteConstants.networth.NET_WORTH);
  };

  return (
    <>
      <SubscriptionModal subscriptionModal={subscriptionModal} onSuccess={redirectToNetworth} />
      <PlanChangedModal planChangedModal={planChangedModal} onSuccess={redirectToNetworth} />
    </>
  );
};

export default StripeCheckoutSuccess;
