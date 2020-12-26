import { useLayoutEffect, useState } from 'react';

import { isEmpty } from 'lodash';
import { Account } from 'auth/auth.types';
import { useAuthState } from 'auth/auth.context';
import { appRouteConstants } from 'app/app-route.constant';
import { pricingDetailConstant } from 'common/common.constant';
import { StripeSubscriptionStatus } from 'setting/setting.enum';

const useSubscriptionValidation = () => {
  const { currentSubscription, subscriptionDetail, onboarded, accounts } = useAuthState();
  const [accessibleRoute, setAccessibleRoutes] = useState('');

  const subStatus = currentSubscription?.subscriptionStatus;
  const hasAllValues = [currentSubscription, subscriptionDetail, accounts].every((item) => !isEmpty(item));

  const active = StripeSubscriptionStatus.ACTIVE;
  const unpaid = StripeSubscriptionStatus.UNPAID;
  const canceled = StripeSubscriptionStatus.CANCELED;
  const trailing = StripeSubscriptionStatus.TRIALING;
  const isPlanExist = subStatus === active || subStatus === trailing;
  const isPlanExpired = subStatus === canceled || subStatus === unpaid;

  const existingManualAccounts = accounts?.filter((account: Account) => account.isManual).length;
  const existingAutoAccounts = accounts?.filter((account: Account) => !account.isManual).length;
  const numberOfConnectedAccountOnPlan = subscriptionDetail?.details?.[pricingDetailConstant.CONNECTED_ACCOUNT] || '0';
  const numberOfManualAccountOnPlan = subscriptionDetail?.details?.[pricingDetailConstant.MANUAL_ACCOUNT] || '0';
  const hasUnlimitedConnectedAccount = numberOfConnectedAccountOnPlan.toUpperCase() === 'UNLIMITED';
  const hasUnlimitedManualAccount = numberOfManualAccountOnPlan.toUpperCase() === 'UNLIMITED';

  const checkPlanExceeds = () => {
    if (hasUnlimitedConnectedAccount && hasUnlimitedManualAccount) {
      return false;
    }

    if (
      existingAutoAccounts > +numberOfConnectedAccountOnPlan ||
      existingManualAccounts > +numberOfManualAccountOnPlan
    ) {
      return true;
    }

    return false;
  };

  const isPlanExceeds = checkPlanExceeds();

  useLayoutEffect(() => {
    let route: string = '';
    (() => {
      if (hasAllValues) {
        if (isPlanExpired) {
          route = appRouteConstants.subscription.SUBSCRIPTION;
          return route;
        }

        if (isPlanExist) {
          if (isPlanExceeds) {
            route = appRouteConstants.subscription.REVIEW;

            return route;
          }
        }

        if (isPlanExist && onboarded && !isPlanExceeds) {
          route = 'all';

          return route;
        }

        route = appRouteConstants.auth.CONNECT_ACCOUNT;

        return route;
      }
    })();

    setAccessibleRoutes(route);
  }, [isPlanExpired, isPlanExist, onboarded, isPlanExceeds, hasAllValues]);

  return {
    accessibleRoute,
  };
};

export default useSubscriptionValidation;
