import './mainPage.scss'
import React from 'react';
import Header from "../../comps/Header/Header";
import {Types} from "../../utils/types";
import { googleLogout } from '@react-oauth/google';
import {setIsAuthorizedAction} from "../../utils/store/actionCreators";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../utils/store";
import DemoGraph from "../../comps/DemoGraph/DemoGraph";

const MainPage: React.FC<Types.MainPage> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => {
        return state.commonReducer.user;
    });


    return <div className="page main-page">
        <Header name={user.name}/>
        <div className="content">
            <div className="picture_container">
                <img src={user.picture}/>
            </div>
            <button onClick={() => {
                googleLogout();
                dispatch(setIsAuthorizedAction(false));
                navigate('/');
            }}>logout</button>
        </div>
    </div>
};
export default MainPage;
