import React from 'react'
import './loader.scss'
import {Types} from "../../utils/types";

const Loader: React.FC<Types.Loader> = ({isForItem}) => {

    const getClassName = () => {
        let className = 'loader';
        if (isForItem) {
            className += ' loader_for-item-little';
        }
        return className;
    };

    return <span className={getClassName()}/>
};

export default Loader;