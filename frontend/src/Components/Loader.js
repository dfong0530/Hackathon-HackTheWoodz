import React from 'react';
import { HalfMalf } from 'react-spinner-animated';
import "../CSS/Loader.css";

import 'react-spinner-animated/dist/index.css'

const Loader = () => {
    return (
        <div className="loader-location">
            <HalfMalf bgColor={"transparent"} 
            center={false} width={"200px"} height={"200px"} />
        </div>
    );

}

export default Loader;