import { appRouteConstants } from './app-route.constant';

export const appRoutes = {
  dashboard: {
    title: 'DASHBOARD',
    route: '/dashboard',
  },
  food: [
    {
      title: 'FOOD_CATEGORY',
      route: '/food/cat',
    },
    {
      title: 'FOOD_LIST',
      route: appRouteConstants.food.item.list,
    },
    {
      title: 'FOOD_GRID',
      route: appRouteConstants.food.item.grid,
    },
    {
      title: 'FOOD_ITEM',
      route: appRouteConstants.food.item.def,
    },
    {
      title: 'ADD_FOOD',
      route: appRouteConstants.food.item.add,
    },
  ],
  order: {
    title: 'ORDER',
    route: '/order',
  },
  promotion: {
    title: 'PROMOTION',
    route: '/promotion',
  },
  user: [
    {
      title: 'PROFILE',
      route: '/auth/me',
    },
    {
      title: 'LOGOUT',
      route: '/auth/logout',
    },
  ],
};
