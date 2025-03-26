import {
  put,
  takeEvery,
  race,
  take,
} from "redux-saga/effects";
import { 
  operationSuccess, 
  ACTION_TYPES,
  IncrementAsyncAction,
  DecrementAsyncAction,
  IncrementByValueAsyncAction,
  DecrementByValueAsyncAction
} from "./actions";
import { makeOperation } from "../api";

function* handleOperation(operation: Promise<number>): Generator<any, void, any> {
  try {
    const { result, cancel, timeout } = yield race({
      result: operation,
      cancel: take(ACTION_TYPES.CANCEL_OPERATION),
      timeout: new Promise(resolve => setTimeout(resolve, 10000))
    });
    
    if (result !== undefined) {
      yield put(operationSuccess(result));
    } else if (cancel) {
      console.log('Operation was cancelled');
    } else if (timeout) {
      console.log('Operation timed out');
      yield put({ type: ACTION_TYPES.CANCEL_OPERATION });
    }
  } catch (error) {
    alert('Operation failed with error: ' + error);
    console.error('Operation failed:', error);
    yield put({ type: ACTION_TYPES.CANCEL_OPERATION });
  }
}

function* increment(action: IncrementAsyncAction): Generator<any, void, number> {
  yield handleOperation(makeOperation(action.payload, 1));
}

function* decrement(action: DecrementAsyncAction): Generator<any, void, number> {
  yield handleOperation(makeOperation(action.payload, -1));
}

function* incrementByValue(action: IncrementByValueAsyncAction): Generator<any, void, number> {
  yield handleOperation(makeOperation(action.payload.curr, action.payload.value));
}

function* decrementByValue(action: DecrementByValueAsyncAction): Generator<any, void, number> {
  yield handleOperation(makeOperation(action.payload.curr, -action.payload.value));
}

export function* rootSaga(): Generator<any, void, unknown> {
  yield takeEvery(ACTION_TYPES.INCREMENT_ASYNC, increment);
  yield takeEvery(ACTION_TYPES.DECREMENT_ASYNC, decrement);
  yield takeEvery(ACTION_TYPES.INCREMENT_BY_VALUE_ASYNC, incrementByValue);
  yield takeEvery(ACTION_TYPES.DECREMENT_BY_VALUE_ASYNC, decrementByValue);
}
