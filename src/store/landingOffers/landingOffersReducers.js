import update from 'immutability-helper';

import actions from './landingOffersActions';


const initialState = {
  data: {},
  status: null,
};

const actionsMap = {
  [actions.LANDING_OFFERS__LOAD_STATUS]: (state, { status }) => {
    return update(state, {
      status: { $set: status },
    });
  },

  [actions.LANDING_OFFERS__SET_DATA]: (state, { data }) => {
    return update(state, {
      data: { $set: data },
    });
  },
};

export default (state = initialState, action = {}) => {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
