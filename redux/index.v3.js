import { createStore } from 'redux';

const INIT_STATE = {
  total: 0,
  todos: []
}



const actionCreater = (state = INIT_STATE) => {
  const actions = Object.create(null);
  const reducers = Object.create(null);

  const create = (actionName, statePropName, reducer) => {

    reducers[actionName] = (payload) => {
      const res = reducer(state, payload);
      return Object.assign({}, state, {
        [statePropName]: res
      });
    }
    actions[actionName] = (payload) => {
      return {
        type: actionName,
        stateProp: statePropName,
        payload: payload
      }
    }
  }

  const get = (actionName) => {
    return actions[actionName];
  }

  return {
    get,
    create,
  }
}
const ActionsOperator = actionCreater();


ActionsOperator.create("ADD", "total");

const store = createStore(appReducer, INIT_STATE);

const unsubsccribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(ActionsOperator.get("ADD", 1));



