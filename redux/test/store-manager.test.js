import * as StoreManager from '../store-manager';



test("init a sealed state", () => {
  const state = StoreManager.createState({
    total: 0,
    list: []
  });
  expect(Object.isSealed(state)).toBe(true)
})

test("add an action", () => {
  const manager = StoreManager.createStoreManager();
  manager.create("ADD", "total", (total, payload) => {
    return total + payload;
  });
  expect(manager.action("ADD", 1)).toEqual({
    type: "ADD",
    payload: 1
  })
})

test("dispatch an action", () => {
  const state = StoreManager.createState({
    total: 0
  });
  const manager = StoreManager.createStoreManager();
  manager.create("ADD", "total", (total, payload) => {
    return total + payload;
  });
  const action = manager.action("ADD", 1);
  const newState = manager.reducer(state, action);
  expect(newState).toEqual({
    total: 1
  })
})


