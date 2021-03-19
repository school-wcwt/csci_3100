import React from 'react';
//import {get_entity,follow} from"../../component/load_backend/load_backend.js";
import {PersonList}  from "../../component/load_backend/try_backend.js";
import {get_entity} from "../../component/load_backend/load_backend.js";
const Followers = ()=>{
    var authorID='jon-8934';
    var author=  get_entity(authorID);
    get_entity(authorID).then(data=>{
        console.log('1 inside');
        console.log(data);
        console.log('2 inside')
        return data;
    });
    return (
        <div>
            hi
        </div>
    )
}



export default Followers;
