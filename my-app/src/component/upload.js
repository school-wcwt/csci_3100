import React from "react";
import { app } from '../base';

/**
 * upload photo and return download URL
 * @param   {file} photoFileArray  array of photos
 * @return {Promise<JSON>[]} array of download URL in JSON format
 */

function uploadPhoto(photoFileArray) {
  return Promise.all(Array.from(photoFileArray).map((photo, i) => {
    const storageRef = app.storage().ref();
    const newfile = photo;
    newfile["id"] = Math.random();
    const fileRef = storageRef.child(newfile.id + "/" + newfile.id + newfile.name);
    return fileRef.put(photo).then(() => {
      return fileRef.getDownloadURL()
    })
  }))
} 
export default uploadPhoto