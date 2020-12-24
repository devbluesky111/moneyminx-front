import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { logger } from 'common/logger.helper';
import useSubscriptionValidation from 'auth/hooks/useSubscriptionValidation';

const AuthorizedRoute = ({ component: Component, ...rest }: any) => {
  const { accessibleRoutes } = useSubscriptionValidation();

  logger.log('Accessible Routes', accessibleRoutes);

  return (
    <Route
      {...rest}
      render={(props) => {
        logger.log('props here', props);

        const allAllowed = accessibleRoutes.includes('all');
        const [allowed] = accessibleRoutes;

        return allAllowed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: allowed,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default AuthorizedRoute;
