import { combineReducers, createStore, EmptyObject } from "redux";
import { simulatorReducer, State } from "./sim/reducer";

const storeVersion = "v1";
const storeKey = `https://github.com/masaxsuzu/hand-simulator.git-${storeVersion}`;

function saveToLocalStorage(state: EmptyObject & { sim: State }) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storeKey, serializedState);
  } catch (e) {
    console.warn(e);
  }
}
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem(storeKey);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const rootReducers = combineReducers({
  sim: simulatorReducer,
});

const store = createStore(rootReducers, loadFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof rootReducers>;

export default store;
