import { Reducer } from "redux";
import { Request, ADD_REQUEST, AddRequestAction } from "./actions";

export interface RequestsState {
  requests: Request[];
}

const initialState: RequestsState = {
  requests: [],
};

const reducer: Reducer<RequestsState, AddRequestAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_REQUEST:
      return {
        ...state,
        requests: [...state.requests, action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
