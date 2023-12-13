import './authPage.scss'
import React from 'react';
import {Types} from "../../utils/types";
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../utils/store/asyncThunks";
import GoogleLoginButton from "../../comps/GoogleLoginButton/GoogleLoginButton";
import {GOOGLE_CLIENT_ID} from "../../public.config";
import {GoogleLogin} from '@react-oauth/google';
import {setIsAuthorizedAction, setUserAction} from "../../utils/store/actionCreators";
import {jwtDecode} from "jwt-decode";

const AuthPage: React.FC<Types.AuthPage> = () => {

    const id = GOOGLE_CLIENT_ID;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login2 = async () => {
        // const data = await fetch('./assets/stub/user.json');
        //
        // const properData: any = await data.json();
        // console.log(properData.data);
        //
        // setName(properData.data.name);
        // setIsAuthorized(true);
        navigate('/main');
    };

    const onSuccess = (credentialResponse: any) => {
        console.log(credentialResponse);
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
        // @ts-ignore
        dispatch(setUserAction({name: decoded.name, picture: decoded.picture}));
        dispatch(setIsAuthorizedAction(true));
        navigate('/main');
    }

    const login = () => {
        // @ts-ignore
        dispatch(fetchUser());
        navigate('/main');
    };

    return <div className="page auth-page">
        {/*<button onClick={login}>login</button>*/}
        <GoogleLogin
            onSuccess={onSuccess}
            onError={() => {
                console.log('Login Failed');
            }}
            // useOneTap
        />
    </div>

};
export default AuthPage;
