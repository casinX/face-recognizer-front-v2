import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


const createConnectedActions = (entitiesToAction, dispatch) => {
  let connectedActions = {};
  Object.keys(entitiesToAction).forEach(entityKey => {
    connectedActions[entityKey] = bindActionCreators(entitiesToAction[entityKey].actions.actions, dispatch);
  });
  return connectedActions;
};

const createStore = (entitiesToAction) => (allStore) => {
  const store = {};
  Object.keys(entitiesToAction).forEach(entityKey => {
    store[entityKey] = allStore[entityKey];
  });
  return { store };
};

const createActions = (entitiesToAction) => (dispatch) => {
  const connectedActions = createConnectedActions(entitiesToAction, dispatch);
  return { actions: connectedActions };
};

export default (entitiesToAction={}) => (component) => {
  return connect(createStore(entitiesToAction), createActions(entitiesToAction), null, { pure:false })(component);
}
