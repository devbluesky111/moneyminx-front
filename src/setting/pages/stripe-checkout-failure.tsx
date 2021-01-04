import React from 'react';
import { Redirect } from 'react-router-dom';

import useToast from 'common/hooks/useToast';
import { appRouteConstants } from 'app/app-route.constant';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';

const StripeCheckoutSuccess = () => {
  const { mmToast } = useToast();
  const { fetchingCurrentSubscription, currentSubError } = useCurrentSubscription();

  if (currentSubError) {
    mmToast('Error on getting current subscription', { type: 'error' });
  }

  if (fetchingCurrentSubscription) {
    return <CircularSpinner />;
  }

  return <Redirect to={`${appRouteConstants.settings.SETTINGS}?active=Plan`} />;
};

export default StripeCheckoutSuccess;
