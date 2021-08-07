import React,{useState,useEffect} from "react";
import Header from "./header";
import Footer from "./footer";
import Note from "./note";
import Inputform from "./inputform";
import axios from "axios";
const baseurl="http://localhost:3000/articles";

function App(){

        const [notes,setNote]=useState([]);
        
        useEffect(() => {
                addNote();
              },[]);
        


        function addNote(){
                axios.get(baseurl).then(response=>{
                        let l=[];
                        for(let i=0;i<response.data.length;i++){
                                var abc={
                                        title:response.data[i].title,
                                        content:response.data[i].content
                                };
                        l.push(abc);
                        }
                setNote(()=>{
                        return l;
                });
                        
                
                
        });
        }

        function deleteNote(id){
                
                axios.get(baseurl).then(response=>{
                        console.log(response.data);
                        let l=[];
                        for(let i=0;i<response.data.length;i++){
                                var ab={
                                        title:response.data[i].title,
                                        content:response.data[i].content
                                };
                        l.push(ab);
                        }
                console.log(l);
                setNote(()=>{
                        return l;
                });
                
        });
}


        return (<div>
                <Header/>
                <Inputform
                onAdd={addNote}
                />
                {notes.map((noteitem,index)=>(
                        <Note
                        key={index}
                        id={index}
                        title={noteitem.title}
                        content={noteitem.content}
                        onDelete={deleteNote}
                        />
                
                ))}
                <Footer/>
                </div>);
}

export default App;