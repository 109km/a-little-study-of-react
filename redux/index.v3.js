import { createStore } from 'redux';

const createAtom = () => {
  return Object.create(null);
}

const INIT_STATE = {
  total: 0,
  todos: []
}


const createStoreManager = () => {
  const Actions = createAtom();
  const Reducers = createAtom();

  function create(actionName, stateName, actionReducer) {
    Actions[actionName] = (payload) => {
      return {
        type: actionName,
        payload: payload
      }
    }
    Reducers[actionName] = (state, action) => {
      return Object.assign({}, state, {
        [stateName]: actionReducer(state[stateName], action.payload)
      })
    }
  }

  function action(actionName, payload) {
    if (Actions[actionName]) {
      return Actions[actionName](payload);
    } else {
      throw new TypeError(`Action "${actionName}" doesn't exsit.`)
    }
  }

  function reducer(state, action) {
    Object.freeze(Actions);
    Object.freeze(Reducers);
    if (Reducers[action.type]) {
      return Reducers[action.type](state, action);
    } else {
      return state;
    }
  }

  return {
    create,
    action,
    reducer
  }
};

const storeManger = createStoreManager();
storeManger.create("ADD", "total", (total, payload) => {
  return total + payload;
});
storeManger.create("MINUS", "total", (total, payload) => {
  return total - payload;
});

const store = createStore(storeManger.reducer, INIT_STATE);

const unsubsccribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(storeManger.action("ADD", 1))
store.dispatch(storeManger.action("ADD", 3))
store.dispatch(storeManger.action("ADD_TODO", "HELLLO"))


