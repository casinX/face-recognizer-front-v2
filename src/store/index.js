import { combineReducers } from 'redux';

import landingOffers from './landingOffers';


const reducers = combineReducers({
  landingOffers: landingOffers.reducers,
});

const sagas = [].concat(
  landingOffers.sagas,
);

const actions = {
  landingOffers: landingOffers.actions,
};


export {
  landingOffers,
};

export default {
  reducers,
  sagas,
  actions,
}
