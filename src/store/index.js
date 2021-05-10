import appReducer from "../reducer";
import {createStore} from "redux";

export const appStore = createStore(appReducer)
