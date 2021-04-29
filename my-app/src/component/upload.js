import React from "react";
import { app } from '../base';
/**
 * - Upload Photo to firebase and return array of URL
 * @param ArrayOfFile
 * @returns [URL]
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