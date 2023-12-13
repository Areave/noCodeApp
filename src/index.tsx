import React from 'react';
import {render as renderApp} from 'react-dom';
import App from "./app/app";
import './style/fonts.scss';
import './style/normalize.scss';
import './style/root.scss';
import {BrowserRouter} from "react-router-dom";
// @ts-ignore
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import store from "./utils/store";
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID} from "./public.config";

const id = GOOGLE_CLIENT_ID;

//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
    <GoogleOAuthProvider clientId={id}>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </GoogleOAuthProvider>
);


