import { Store } from "redux";
import reducer, { RequestsState } from "./requet";
import { configureStore } from "@reduxjs/toolkit";

const store: Store<RequestsState, any> = configureStore({ reducer });

export default store;
