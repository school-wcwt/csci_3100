import React from "react";
import { app } from '../../base';

const Upload_Photo = async (photoFileArray) => {
  const downloadURL = [];
  downloadURL.length = photoFileArray.length;
  try {
    return Promise.all(Array.from(photoFileArray).map(async (photo, i) => {
      const storageRef = app.storage().ref();
      const newfile = photo;
      newfile["id"] = Math.random();
      const fileRef = storageRef.child(newfile.id + "/" + newfile.id + newfile.name);
      return new Promise((resolve, reject) => {
        fileRef.put(photo).then(async () => {
          // console.log(i + '*****')
          // console.log(await fileRef.getDownloadURL())
          return resolve(await fileRef.getDownloadURL())
        })
      })
    }))
  }
  catch (err) {
    console.log('gg')
  }
  //  return downloadURL;
};

export { Upload_Photo }