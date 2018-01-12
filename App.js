import React, { Component } from 'react';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./app/reducers";
import Main from "./app/visualScreen";
import thunk from "redux-thunk";

let state = {
    data: [],
    Element_click: null,
    element_Fetching: false,
    element_data_fetched: false,
    click_Back_To_Home: false,
    back_To_Element_List: false
};

let store = createStore(reducers, state, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main/>
            </Provider>
        )
    }
}

