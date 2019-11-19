

// Create an atom object which has no `Object`'s functions.
// Cause its prototype is `null`.
export const createAtom = () => {
  return Object.create(null);
}

// The state's structure must be defined at 
// the beginning, it's not allow to add or remove
// any its property.
export const createState = (obj) => {
  return Object.seal(obj)
}

export const createStoreManager = () => {
  const Actions = createAtom();
  const Reducers = createAtom();

  // Define an action and its reducer.
  function create(actionName, stateName, actionReducer) {
    Actions[actionName] = (payload) => {
      return {
        type: actionName,
        payload: payload
      }
    }
    // Each reducer must be a pure function
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

  // The export reducer for `store`
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
