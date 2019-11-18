import { createStore } from 'redux';

const INIT_STATE = {
  total: 0,
  todos: []
}

const Operations = {
  ADD: {
    action(num) {
      return {
        type: "ADD",
        payload: num
      }
    },
    reducer(currentState, payload) {
      return Object.assign({}, currentState, {
        total: currentState.total + payload
      })
    }
  },
  MINUS: {
    action(num) {
      return {
        type: "MINUS",
        payload: num
      }
    },
    reducer(currentState, payload) {
      return Object.assign({}, currentState, {
        total: currentState.total - payload
      })
    }
  },
  ADD_TODO: {
    action(item) {
      return {
        type: "ADD_TODO",
        payload: item
      }
    },
    reducer(currentState, payload) {
      const todos = currentState.todos.concat(payload);
      return Object.assign({}, currentState, {
        todos: todos
      })
    }
  }
}

const appReducer = (state = INIT_STATE, action) => {
  if (Operations.hasOwnProperty(action.type)) {
    return Operations[action.type].reducer(state, action.payload);
  } else {
    return state;
  }
}


const store = createStore(appReducer, INIT_STATE);

const unsubsccribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(Operations.ADD.action(1));
store.dispatch(Operations.MINUS.action(2));
store.dispatch(Operations.ADD_TODO.action("Hello"));
store.dispatch(Operations.ADD_TODO.action("World"));


