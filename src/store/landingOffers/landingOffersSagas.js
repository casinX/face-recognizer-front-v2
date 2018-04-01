import api from 'config/api';
import saga from 'utils/saga';
import request from 'utils/request';

import actions, { loadStatus, setData } from './landingOffersActions';


const loadFiltersSaga = saga(async (store, action, dispatch) => {
  dispatch(loadStatus('loading'));

  const { response, error } = await request(api.getLanding, 'GET');

  if(response){
    dispatch(setData(response.data.offers));
    dispatch(loadStatus('loaded'));
    return;
  }

  dispatch(loadStatus('error'));
}, actions.LANDING_OFFERS__START_LOAD);


export default [
  loadFiltersSaga,
]
