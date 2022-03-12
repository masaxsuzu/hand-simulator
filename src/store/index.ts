import { combineReducers, createStore } from "redux";
import { simulatorReducer } from "./sim/reducer";

const rootReducer = combineReducers({
  sim: simulatorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
