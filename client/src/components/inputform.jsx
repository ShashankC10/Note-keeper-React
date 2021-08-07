import React,{useState} from "react";
import axios from "axios";
const baseurl="http://localhost:3000/articles";


function Inputform(prop){
    const [note,setNote]=useState({
        title:"",
        content:""
    });
    function handleChange(event){
        const {name,value}=event.target;
        setNote(prevNote=>{
            return{
                ...prevNote,
                [name]:value
            }
        });
    }

    function submitNote(event){
        event.preventDefault();
        setNote({
            title:"",
            content:""
        });
        axios.post(baseurl,{
            title:note.title,
            content:note.content
        })
        .then(response=>{
            console.log(response);
        });
        prop.onAdd();
    }
    return(
        <div>
            <form>
                <input name="title" onChange={handleChange} value={note.title} placeholder="Title"></input>
                <textarea name="content" onChange={handleChange} value={note.content} placeholder="Take a note..." rows="3"></textarea>
                <button onClick={submitNote}>Add</button>
            </form>
        </div>
    );
}


export default Inputform;