import UserType from '../types/UserType';

const me = {
  type: UserType,
  resolve() {
    return {
      id: 1,
      email: 'travisxu@upchina.com',
    };
  },
};

export default me;
