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
};
