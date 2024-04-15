import { Action } from "redux";

export const ADD_REQUEST = "ADD_REQUEST";

export interface Request {
  description: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface AddRequestAction extends Action<typeof ADD_REQUEST> {
  payload: Request;
}

export const addRequest = (request: Request): AddRequestAction => ({
  type: ADD_REQUEST,
  payload: request,
});
