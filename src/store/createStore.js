import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createRootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/sagas'

export let history
history = createBrowserHistory();

const routerMw = routerMiddleware(history)


const createStore = (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const sagaMiddleware = createSagaMiddleware()

    // ======================================================
    // Store Enhancers
    // ======================================================
    const enhancers = []
    let composeEnhancers = compose
    let applyMiddlewareVar


    applyMiddlewareVar = applyMiddleware(routerMw, sagaMiddleware);

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createReduxStore(
        createRootReducer(history),
        initialState,
        composeEnhancers(
            applyMiddlewareVar,
            ...enhancers
        )
    )
    store.asyncReducers = {}

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const reducers = require('./reducers').default
            store.replaceReducer(reducers(store.asyncReducers))
        })
    }

    sagaMiddleware.run(rootSaga)

    return store
}

export default createStore
