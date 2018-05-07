import { TOGGLE_SIDEBAR } from '../actions';

const initialState = {
  collapsed: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, collapsed: action.collapsed };
    default:
      return state;
  }
}
