import { useEffect, useState } from 'react';

import { Account } from 'auth/auth.types';
import { useAuthState } from 'auth/auth.context';
import { appRouteConstants } from 'app/app-route.constant';
import { pricingDetailConstant } from 'common/common.constant';
import { StripeSubscriptionStatus } from 'setting/setting.enum';
import { logger } from 'common/logger.helper';

const useSubscriptionValidation = () => {
  const { currentSubscription, subscriptionDetail, onboarded, accounts } = useAuthState();
  const [accessibleRoutes, setAccessibleRoutes] = useState(['']);

  const subStatus = currentSubscription?.subscriptionStatus;

  logger.gp('Use subscription validation');
  logger.log('Current subscription', currentSubscription);
  logger.log('subscription Details', subscriptionDetail);
  logger.log('onboarded', onboarded);
  logger.log('Accounts', accounts);
  logger.gpEnd();

  const active = StripeSubscriptionStatus.ACTIVE;
  const unpaid = StripeSubscriptionStatus.UNPAID;
  const canceled = StripeSubscriptionStatus.CANCELED;
  const trailing = StripeSubscriptionStatus.TRIALING;
  const isPlanExist = subStatus === active || subStatus === trailing;
  const isPlanExpired = subStatus === canceled || subStatus === unpaid;

  const existingManualAccounts = accounts?.filter((account: Account) => account.isManual).length;
  const existingAutoAccounts = accounts?.filter((account: Account) => !account.isManual).length;
  const numberOfConnectedAccountOnPlan = subscriptionDetail?.details?.[pricingDetailConstant.CONNECTED_ACCOUNT] || 0;
  const numberOfManualAccountOnPlan = subscriptionDetail?.details?.[pricingDetailConstant.MANUAL_ACCOUNT] || 0;
  const isPlanExceeds =
    existingAutoAccounts > numberOfConnectedAccountOnPlan || existingManualAccounts > numberOfManualAccountOnPlan;

  useEffect(() => {
    if (isPlanExpired) {
      return setAccessibleRoutes([appRouteConstants.subscription.SUBSCRIPTION, appRouteConstants.subscription.REVIEW]);
    }

    if (isPlanExist) {
      if (isPlanExceeds) {
        return setAccessibleRoutes([appRouteConstants.subscription.REVIEW]);
      }
    }

    if (onboarded) {
      return setAccessibleRoutes(['all']);
    }

    return setAccessibleRoutes([appRouteConstants.auth.CONNECT_ACCOUNT]);
  }, [isPlanExpired, isPlanExist, onboarded, isPlanExceeds]);

  return {
    accessibleRoutes,
  };
};

export default useSubscriptionValidation;
