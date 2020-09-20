import React from 'react';

import { InlineAlert } from 'common/components/alert';
import { ConnectionAlertProps } from 'networth/networth.type';

const ConnectionAlert: React.FC<ConnectionAlertProps> = ({ connectionAlert, message }) => {
  return <InlineAlert {...connectionAlert.props} message={message} />;
};

export default ConnectionAlert;
