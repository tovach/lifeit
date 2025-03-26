export interface IncrementByValuePayload {
  curr: number;
  value: number;
}

export const ACTION_TYPES = {
  INCREMENT_ASYNC: 'INCREMENT_ASYNC',
  DECREMENT_ASYNC: 'DECREMENT_ASYNC',
  INCREMENT_BY_VALUE_ASYNC: 'INCREMENT_BY_VALUE_ASYNC',
  DECREMENT_BY_VALUE_ASYNC: 'DECREMENT_BY_VALUE_ASYNC',
  OPERATION_SUCCESS: 'OPERATION_SUCCESS',
  CANCEL_OPERATION: 'CANCEL_OPERATION',
} as const;

export const incrementAsync = (payload: number) => ({
  type: ACTION_TYPES.INCREMENT_ASYNC,
  payload,
});

export const decrementAsync = (payload: number) => ({
  type: ACTION_TYPES.DECREMENT_ASYNC,
  payload,
});

export const incrementByValueAsync = (curr: number, value: number) => ({
  type: ACTION_TYPES.INCREMENT_BY_VALUE_ASYNC,
  payload: { curr, value } as IncrementByValuePayload,
});

export const decrementByValueAsync = (curr: number, value: number) => ({
  type: ACTION_TYPES.DECREMENT_BY_VALUE_ASYNC,
  payload: { curr, value } as IncrementByValuePayload,
});

export const operationSuccess = (value: number) => ({
  type: ACTION_TYPES.OPERATION_SUCCESS,
  payload: value,
});


export const cancelOperation = () => ({
  type: ACTION_TYPES.CANCEL_OPERATION,
});

export type IncrementAsyncAction = ReturnType<typeof incrementAsync>;
export type DecrementAsyncAction = ReturnType<typeof decrementAsync>;
export type IncrementByValueAsyncAction = ReturnType<typeof incrementByValueAsync>;
export type DecrementByValueAsyncAction = ReturnType<typeof decrementByValueAsync>;
export type OperationSuccessAction = ReturnType<typeof operationSuccess>;
export type CancelOperationAction = ReturnType<typeof cancelOperation>;

export type AppAction =
  | IncrementAsyncAction
  | DecrementAsyncAction
  | IncrementByValueAsyncAction
  | DecrementByValueAsyncAction
  | OperationSuccessAction
  | CancelOperationAction;
