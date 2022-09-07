import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import posts from '../redux/modules/posts'
import user from '../redux/modules/user'
import comments from '../redux/modules/comments'

const middlewares = [thunk]
const rootReducer = combineReducers({ posts, user, comments });
const enhancer = applyMiddleware(...middlewares)


const store = createStore(rootReducer, enhancer);

export default store;