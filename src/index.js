import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import createStore, { history } from './store/createStore'
const store = createStore(window.__INITIAL_STATE__);
const MOUNT_NODE = document.getElementById('root');

let render = () => {

    store.dispatch({ type: 'STORE_ROUTES_SAGA' });
    ReactDOM.render(
        <Provider store={store}>
            <App history={history} />
        </Provider>,
        MOUNT_NODE
    );
};
render();
