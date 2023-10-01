import React from "react";


function AutorList(props){

return(
<div className="AutorList">

    <h1> API flask proof </h1>
    {props.data && props.data.map(data=>{

        return (
        <div key ={data.id}>
        <h2>{data.firstname}</h2>
        <h2>{data.lastname}</h2>
        </div>

        )
    })}


</div>
);
}

export default AutorList