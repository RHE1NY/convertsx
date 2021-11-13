import React, {FC} from 'react';
import './loader.css'

interface ILoader {
    loader:boolean;
}

const Loader:FC<ILoader> = ({loader}) => {
    return (
        <div className={"loaderCircle"}>

        </div>
    );
};

export default Loader;