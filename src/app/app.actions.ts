export enum EAppActions {
  SET_FASTLINK_LOADING = 'SET_FASTLINK_LOADING',
  RESET_FASTLINK_LOADING = 'RESET_FASTLINK_LOADING',
}

export interface IAppAction {
  type: EAppActions;
}

export const setFastlinkLoading = () => {
  return {
    type: EAppActions.SET_FASTLINK_LOADING,
  };
};

export const resetFastlinkLoading = () => {
  return {
    type: EAppActions.RESET_FASTLINK_LOADING,
  };
};
