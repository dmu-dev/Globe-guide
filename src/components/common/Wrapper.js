import React from "react";

function Wrapper(props){
    return(
        <div className="crop">{props.children}</div>
    )
}

export default Wrapper;