export const LANDING_OFFERS__LOAD_STATUS = 'LANDING_OFFERS__LOAD_STATUS';
export const LANDING_OFFERS__SET_DATA = 'LANDING_OFFERS__SET_DATA';
export const LANDING_OFFERS__START_LOAD = 'LANDING_OFFERS__START_LOAD';


export const loadStatus = (status) => ({
  type: LANDING_OFFERS__LOAD_STATUS,
  status,
});

export const setData = (data) => ({
  type: LANDING_OFFERS__SET_DATA,
  data,
});

export const startLoad = () => ({
  type: LANDING_OFFERS__START_LOAD,
});


const actions = {
  loadStatus,
  setData,
  startLoad,
};


export default {
  LANDING_OFFERS__LOAD_STATUS,
  LANDING_OFFERS__SET_DATA,
  LANDING_OFFERS__START_LOAD,

  actions,
}
