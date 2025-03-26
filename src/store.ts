import createSagaMiddleware from "redux-saga";
import { reducer } from "./ducks/reducer";
import { rootSaga } from "./ducks/sagas";
import { applyMiddleware, createStore } from "./quax";

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  return store;
};
