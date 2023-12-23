import React, {useState} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@clientio/rappid/rappid.css';
import {Route, Routes} from "react-router";
import LoadingPage from "../pages/loadingPage/loadingPage";
import AuthPage from "../pages/authPage/authPage";
import MainPage from "../pages/mainPage/mainPage";
import {ToastContainer} from "../comps/ToastContainer/toastContainer";
import {useSelector} from "react-redux";
import {RootState} from "../utils/store";
import DemoGraph from "../comps/DemoGraph/DemoGraph";
import {Link} from "react-router-dom";
import DemoDataBase from "../comps/DemoDataBase/DemoDataBase";

const App: React.FC<any> = () => {

    const state = useSelector((state: RootState) => {
        return state.commonReducer;
    });

    const {messages, isAuthorized, isLoading, user} = state;

    console.log('render app.ts')

    return <React.StrictMode>
        {/*<ToastContainer messages={messages}/>*/}
        {/*{isLoading && <LoadingPage/>}*/}
        <div className="">
            <Link className='navigation_link ps-3' to="/demoGraph">demoGraph</Link>
            <Link className='navigation_link ps-3' to="/demoDataBase">demoDataBase</Link>
        </div>
        <Routes>
            <Route path='/demoGraph' element={<DemoGraph/>}/>
            <Route path='/demoDataBase' element={<DemoDataBase/>}/>
        </Routes>
        {/*{!isLoading && <Routes>*/}
        {/*    /!*{!isAuthorized && <Route path='/' element={<AuthPage/>}/>}*!/*/}
        {/*    /!*{!isAuthorized && <Route path='/*' element={<AuthPage/>}/>}*!/*/}
        {/*    /!*{isAuthorized && <Route path='/main' element={<MainPage/>}/>}*!/*/}
        {/*</Routes>}*/}
    </React.StrictMode>;
};
export default App;