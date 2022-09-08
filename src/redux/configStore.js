import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import posts from "../redux/modules/posts";
import comments from "../redux/modules/comments";

const nickname = localStorage.getItem("nickname");
const middlewares = [thunk];
const rootReducer = combineReducers({ posts, nickname, comments });
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
