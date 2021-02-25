## Welcome to CSCI_3100 Project
### You may view all the Diagram and doc in 
+ [google drive](https://drive.google.com/drive/folders/1KoTn5ugbMzSGxRS61RfaG0zq1o0gV_ry?usp=sharing) 
+ [OneDrive](https://mycuhk-my.sharepoint.com/personal/1155109240_link_cuhk_edu_hk/_layouts/15/onedrive.aspx?id=%2Fpersonal%2F1155109240%5Flink%5Fcuhk%5Fedu%5Fhk%2FDocuments%2Fcsci3100%5FGroupE6&originalPath=aHR0cHM6Ly9teWN1aGstbXkuc2hhcmVwb2ludC5jb20vOmY6L2cvcGVyc29uYWwvMTE1NTEwOTI0MF9saW5rX2N1aGtfZWR1X2hrL0Vva3dBSDUzZTE5THFzN1ZNLVFtMzBvQkZJSXVVOFF2Ymo3eS1MaUV5M3pFMlE_cnRpbWU9TmhsU1RrYlQyRWc)

### How to run me
use the following code to download the file
```
git clone git@github.com:school-wcwt/csci_3100.git
```
- cd to my-app and run `npm init` and `npm install` and `npm start`

### Commands you may use with ***git***
- You may update file using `git pull` 
- (you may want to do this every times as your groupmate might have updated something)
- After all testing , you can use  `git status` to check all the modificed files
- You can either use `git add yourfile` to add them or `git add --all` to add all file in the waiting stage
- After adding your modified file, use `git commit -m "your message" ` to conclude what you have updated
- Finally use `git push` to upload file into github

### MongoDB commands ###
-  Getting into mongo:
```
mongo 
use csci3100;
```
- Manipulating collections:
  - `db.getCollectionNames()` returns all collections
  - `db.<collection>.find() ` returns all data in collection
  - `db.<collection>.findOne({param})` returns first data fitting param in collection
- For more: https://docs.mongodb.com/manual/reference/method/ 

