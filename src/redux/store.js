import { applyMiddleware, createStore } from 'redux';
import reducer from './modules/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import history from '../history';

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ history })))
);

export default store;
