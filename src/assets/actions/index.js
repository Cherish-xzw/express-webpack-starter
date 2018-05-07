const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export const LOGIN = createRequestTypes('LOGIN');
export const LOGOUT = createRequestTypes('LOGOUT');
export const GET_USER = createRequestTypes('GET_USER');

export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const toggleSidebar = collapsed => ({
  type: TOGGLE_SIDEBAR,
  collapsed
});

export const logout = {
  request: () => ({
    type: LOGOUT[REQUEST]
  }),
  success: () => ({
    type: LOGOUT[SUCCESS]
  }),
  failure: () => ({
    type: LOGOUT[FAILURE]
  })
};
