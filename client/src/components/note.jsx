import React from "react";
import axios from "axios";

const baseurl="http://localhost:3000/articles/delete";

function Note(prop){

    function clickHandle(event){
        event.preventDefault();
        console.log(prop.title);
        axios.post(baseurl,{
            title:prop.title,
            content:prop.content
        })
        .then((response)=>{
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        });
        prop.onDelete();
    }
    

    return(
        <div className="note">
            <h1>
                {prop.title}
            </h1>
            <p>
                {prop.content}
            </p>
            <button onClick={clickHandle}>Delete</button>
        </div>
    );
}

export default Note;