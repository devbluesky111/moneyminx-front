import React from 'react';
import { Redirect } from 'react-router-dom';

import LoadingScreen from 'common/loading-screen';
import useSubscriptionValidation from 'auth/hooks/useSubscriptionValidation';
import { logger } from 'common/logger.helper';

const AuthorizedProvider: React.FC = ({ children }) => {
  const { accessibleRoutes } = useSubscriptionValidation();

  const hasRoutes = accessibleRoutes.filter(Boolean).length;
  const hasAllAccess = accessibleRoutes.includes('all');
  const [accessibleRoute] = accessibleRoutes;

  logger.log('Accessible routes', accessibleRoutes);

  if (!hasRoutes) {
    return <LoadingScreen />;
  }

  if (hasAllAccess) {
    return <>{children}</>;
  }

  if (accessibleRoute) {
    return <Redirect to={accessibleRoute} />;
  }

  return <LoadingScreen />;
};

export default AuthorizedProvider;
