
const createStore = (reducer, preloadState = null) => {

  if (typeof reducer !== "function") {
    throw new TypeError('Reducer must be a function.');
  }

  if (typeof preloadState === null) {
    throw new TypeError('Init state must not be empty.');
  }

  let currentState = preloadState;
  const updateCallbacks = {};
  let callbacksIndex = 0;

  const updateState = (action) => {
    currentState = reducer(currentState, action);
    Object.freeze(currentState);
    for (let key in updateCallbacks) {
      updateCallbacks[key]();
    }

  }

  // 订阅每次
  const subscribe = (fn) => {
    let index = callbacksIndex;
    updateCallbacks[callbacksIndex] = fn;
    callbacksIndex++;
    return () => {
      delete updateCallbacks[index];
    }
  }

  return {
    dispatch(action) {
      updateState(action);
    },
    getState() { return currentState; },
    subscribe
  };
}

const reducer = (state, action) => {
  if (action.type === 'ADD') {
    return Object.assign({}, state, {
      total: state.total + action.payload
    })
  }
}

const initState = {
  total: 0
}

const store = createStore(reducer, initState);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "ADD",
  payload: 1
});


unsubscribe();

// 不会触发 console.log
store.dispatch({
  type: "ADD",
  payload: 2
});