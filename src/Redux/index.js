import { createStore } from "redux";
import { Provider } from "react-redux";

//customs
import allReducers from "./reducer";

const store = createStore(
    allReducers,
);
const ReduxProvider = ({children}) => {
    return (
        <Provider store = {store}>
            {children}
        </Provider>
    );
}

export default ReduxProvider;