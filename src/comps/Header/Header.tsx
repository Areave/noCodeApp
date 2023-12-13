import React from "react";
import './Header.scss'
import {Types} from "../../utils/types";
import {useNavigate} from "react-router";
import {setIsAuthorizedAction} from "../../utils/store/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../utils/store";
import {logout} from "../../utils/store/asyncThunks";

const Header: React.FC<Types.Header> = ({name}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const state = useSelector((state: RootState) => {
        return state.commonReducer;
    });

    const onLogout = () => {
        // @ts-ignore
        dispatch(logout());
        navigate('/');
    };

    return <div className='header'>
        <div className='name'>
            {'HELLO, ' + name}
        </div>
    </div>
};

export default Header;