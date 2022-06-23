import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

//saga
import createSagaMiddleware from 'redux-saga';

//customs
import allReducers from "./reducer";

// sagas
import { addWatcher } from "./sagas/saga";

const saga = createSagaMiddleware()


const store = createStore(
    allReducers,
    applyMiddleware(saga)
);
saga.run(addWatcher);

const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export default ReduxProvider;