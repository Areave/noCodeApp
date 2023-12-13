import React from 'react'
import './GoogleLoginButton.scss'
import {Types} from '../../utils/types'
import {GOOGLE_CLIENT_ID} from "../../public.config";
import GoogleLogin from "react-google-login";


const GoogleLoginButton: any = () => {


    const id = GOOGLE_CLIENT_ID;


    return <div className='comp'>
        {/*<GoogleLogin clientId={id}*/}
        {/*buttonText={'Logiiin'}*/}
        {/*onSuccess={() => console.log('success')}*/}
        {/*onFailure={() => console.log('fail')}*/}
        {/*/>*/}
    </div>
};

export default GoogleLoginButton;