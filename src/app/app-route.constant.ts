export const appRouteConstants = {
  auth: {
    def: '/auth',
    me: '/auth/me',
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
  },
  food: {
    menu: {
      add: '/food/menu/add',
      view: '/food/menu/v/:slug',
    },
    item: {
      def: '/food/item',
      add: '/food/item/add',
      list: '/food/item/list',
      grid: '/food/item/grid',
    },
  },
  misc: {
    notFound: '/404',
  },
};
