import userReducer from './reducers/UserReducer'
import locationReducer from './reducers/LocationReducer'
import { createStore, combineReducers } from 'redux';


const rootReducer = combineReducers({
  userReducer: userReducer,
  locationReducer: locationReducer
})

const configureStore = createStore(rootReducer);
export default configureStore;