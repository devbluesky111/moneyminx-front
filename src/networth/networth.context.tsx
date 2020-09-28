import React, { createContext } from 'react';
import { NetworthActionEnum } from './networth.enum';
import { NetworthDispatch, NetworthState, NetworthProviderProps, Action } from './networth.type';

const initialState: NetworthState = {
  fromDate: undefined,
  category: undefined,
  accountType: undefined,
  timeInterval: undefined,
};

const NetworthDispatchContext = createContext<NetworthDispatch | undefined>(undefined);
const NetworthStateContext = createContext<NetworthState | undefined>(undefined);

function networthReducer(state: NetworthState, action: Action): any {
  switch (action.type) {
    case NetworthActionEnum.SET_CATEGORY: {
      return { ...state, category: action.payload?.category };
    }

    case NetworthActionEnum.SET_ACCOUNT_TYPE: {
      return { ...state, category: action.payload?.accountType };
    }

    case NetworthActionEnum.SET_FROM_DATE: {
      return { ...state, category: action.payload?.fromDate };
    }

    case NetworthActionEnum.SET_TIME_INTERVAL: {
      return { ...state, category: action.payload?.timeInterval };
    }

    default: {
      throw new Error('Unhandled action type');
    }
  }
}

function NetworthProvider({ children }: NetworthProviderProps) {
  const [state, dispatch] = React.useReducer(networthReducer, initialState);

  return (
    <NetworthStateContext.Provider value={state}>
      <NetworthDispatchContext.Provider value={dispatch as any}>{children}</NetworthDispatchContext.Provider>
    </NetworthStateContext.Provider>
  );
}

function useNetworthState() {
  const context = React.useContext(NetworthStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a App Provider');
  }

  return context;
}

function useNetworthDispatch() {
  const context = React.useContext(NetworthDispatchContext);

  if (context === undefined) {
    throw new Error('Must be used within a Settings Provider');
  }

  return context;
}

export { NetworthProvider, useNetworthDispatch, useNetworthState };
