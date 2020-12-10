import React from 'react';
import { EventArgs } from 'react-ga';
import { Link, LinkProps } from 'react-router-dom';

import useAnalytics from 'common/hooks/useAnalytics';

interface IGALink extends LinkProps {
  eventArgs: EventArgs;
}

const GALink: React.FC<IGALink> = ({ children, to, eventArgs, ...rest }) => {
  const { event } = useAnalytics();

  const triggerEvent = () => {
    return event(eventArgs);
  };

  return (
    <Link to={to} onClick={triggerEvent} {...rest}>
      {children}
    </Link>
  );
};

export default GALink;
