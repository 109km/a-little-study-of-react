import { createStore } from 'redux';
import { create } from 'domain';

const INIT_STATE = {
  total: 0,
  todos: []
}

const actions = {
  add(num) {
    return {
      type: "ADD",
      payload: num
    }
  },
  minus(num) {
    return {
      type: "MINUS",
      payload: num
    }
  },
  addTodo(item) {
    return {
      type: "ADD_TODO",
      payload: item
    }
  }
}
function createReducer(initState, handlers) {
  return function (state = initState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action.payload)
    } else {
      return state
    }
  }
}

function add(totalState, payload) {
  return totalState + payload
}
function minus(totalState, payload) {
  return totalState - payload
}
function addTodo(todosState, payload) {
  return todosState.concat(payload)
}

const totalsReducer = createReducer(INIT_STATE.total, {
  "ADD": add,
  "MINUS": minus
});
const todosReducer = createReducer(INIT_STATE.todos, {
  "ADD_TODO": addTodo
});


function appReducer(state = INIT_STATE, action) {
  return {
    total: totalsReducer(state.total, action),
    todos: todosReducer(state.todos, action)
  }
}


const store = createStore(appReducer, INIT_STATE);

const unsubsccribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(actions.add(1));
store.dispatch(actions.minus(2));
store.dispatch(actions.addTodo("Yang"));


