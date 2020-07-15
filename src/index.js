import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore,compose, applyMiddleware,combineReducers} from 'redux';
import burgerBuilderReducer from './store/redurcers/burgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/redurcers/order';
import authReducer from './store/redurcers/auth';

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


//combined reducers
const rootReducer = combineReducers({
 burgerBuilder: burgerBuilderReducer,
 order: orderReducer,
 auth : authReducer
});

const store = createStore(rootReducer,enhancers(
    applyMiddleware(thunk)
));


const app =(
<Provider store={store}>
<BrowserRouter>
<App/>

</BrowserRouter>
</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
