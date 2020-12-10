export const events = {
  completeProfile: {
    category: 'Net Worth',
    action: 'Clicked on Complete Profile',
    label: 'Accessed profile tab from Net Worth screen',
  },
  startTrail: {
    category: 'Subscription',
    action: 'Start Trail',
    label: 'Trial for VIP plan',
    value: 60, // edit this if plan price changed
  },
  trialFromPricing: {
    category: 'Pricing',
    action: `Clicked on Start Trial Button`,
    label: `Accessed sign up page from pricing`,
    value: 0,
  },
  manualConnectAccount: {
    category: 'Connect Accounts',
    action: 'Clicked Add Manual Account',
    label: 'Add Manual Account',
  },
  connectAccount: {
    category: 'Connect Accounts',
    action: 'Clicked Add Banks and Investments',
    label: 'Add Banks and Investments',
  },
  cryptoExchange: {
    category: 'Connect Accounts',
    action: 'Clicked Add Crypto Exchanges',
    label: 'Add Crypto Exchanges',
  },
};
