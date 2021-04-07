import React from "react";
import {app} from '../../base';

const Upload_Photo = (photoFileArray)=>{
    const downloadURL = [];
    downloadURL.length = photoFileArray.length;
    Array.from(photoFileArray).map((photo,i)=>{
      const storageRef = app.storage().ref();  
      const newfile = photo;
      newfile["id"] = Math.random();
      const fileRef = storageRef.child(newfile.id + "/" + newfile.id + newfile.name);
      fileRef.put(photo).then(() => {
       fileRef.getDownloadURL().then((url) => {
          downloadURL[i] = url;
        })
      })
    })
    return downloadURL;
  };

export {Upload_Photo}