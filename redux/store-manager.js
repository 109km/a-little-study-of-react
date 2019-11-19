
export const createAtom = () => {
  return Object.create(null);
}

export const createState = (obj) => {
  return Object.seal(obj)
}

export const createStoreManager = () => {
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
