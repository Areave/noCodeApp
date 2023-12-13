import React, {useState} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router";
import LoadingPage from "../pages/loadingPage/loadingPage";
import AuthPage from "../pages/authPage/authPage";
import MainPage from "../pages/mainPage/mainPage";
import {ToastContainer} from "../comps/ToastContainer/toastContainer";
import {useSelector} from "react-redux";
import {RootState} from "../utils/store";

const App: React.FC<any> = () => {

    const state = useSelector((state: RootState) => {
        return state.commonReducer;
    });

    const {messages, isAuthorized, isLoading, user} = state;

    return <React.StrictMode>
        <ToastContainer messages={messages}/>
        {isLoading && <LoadingPage/>}
        {!isLoading && <Routes>
            {!isAuthorized && <Route path='/' element={<AuthPage/>}/>}
            {!isAuthorized && <Route path='/*' element={<AuthPage/>}/>}
            {isAuthorized && <Route path='/main' element={<MainPage/>}/>}
        </Routes>}
    </React.StrictMode>;
};
export default App;