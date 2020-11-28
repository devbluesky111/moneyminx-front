import React from 'react';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import { appRouteConstants } from 'app/app-route.constant';
import useCurrentSubscription from 'auth/hooks/useCurrentSubscription';
import CircularSpinner from 'common/components/spinner/circular-spinner';

const StripeCheckoutSuccess = () => {
  const { fetchingCurrentSubscription, currentSubError } = useCurrentSubscription();
  if (currentSubError) {
    toast('Error on getting current subscription', { type: 'error' });
  }
  if (fetchingCurrentSubscription) {
    return <CircularSpinner />;
  }

  return <Redirect to={`${appRouteConstants.settings.SETTINGS}?active=Plan`} />;
};

export default StripeCheckoutSuccess;
