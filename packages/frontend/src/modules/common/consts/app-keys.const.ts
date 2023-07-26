// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_AUTH: 'JWT_TOKEN_AUTH',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  USER: 'USER',
  TOKEN: 'TOKEN',
  STATISTIC: 'statistic',
  TRENDING: 'trending'
};

// Backend Routes
export const BACKEND_KEYS = {
  TODOS: '/todos',
  CURRENT_USER: '/user/current',
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  LOGOUT: '/user/logout',
  CHANGE_PASSWORD: '/user/change_pass',
  SEND_VERIFY: '/user/verify',
  VERIFY: '/user/verify/:verifyToken',
  SENT_RESET_PASWORD: '/user/reset_password',
  RESET_PASWORD: '/user/reset_password/:resetToken'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  TODO: '/todo',
  ONE_TODO: '/todo/:id',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PROFILE: '/profile',
  FORGET_PASSWORD: '/forget',
  VERIFY: '/verify/:token',
  RESET: '/reset/:token'
};
