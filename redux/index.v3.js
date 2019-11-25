import { createStore } from 'redux';
import { createState, createStoreManager, createAtom } from './store-manager';

const storeManger = createStoreManager();

// Define an action and its reducer at the same time,
// so it's easy to understand what this action will do.
// And also we know which property of state will be changed
// by this action. 
storeManger.create("ADD", "total", (total, payload) => {
  return total + payload;
});
storeManger.create("MINUS", "total", (total, payload) => {
  return total - payload;
});

const INIT_STATE = createState({
  total: 0,
  todos: []
});

const store = createStore(storeManger.reducer, INIT_STATE);



const unsubsccribe = store.subscribe(() => {
  console.log(store.getState());
});

// Can define actions after `store` is created
storeManger.create("ADD_TODO", "todos", (todos, payload) => {
  return todos.concat(payload);
});
storeManger.create("REMOVE_TODO", "todos", (todos, payload) => {
  return todos.filter((item) => {
    return item !== payload
  })
});

store.dispatch(storeManger.action("ADD", 1))
store.dispatch(storeManger.action("ADD", 3))
store.dispatch(storeManger.action("ADD_TODO", "A"))
store.dispatch(storeManger.action("ADD_TODO", "B"))
store.dispatch(storeManger.action("REMOVE_TODO", "A"))


