# All avaliable routes

Not all updated.

* Auth 
    * [`POST` login](#post-login)
    * [`POST` register](#post-register)
* Entity 
    * [`GET`    entity/:entityID](#get-entityentityid) 
    * [`POST`   entity/](#post-entity)
    * [`POST`   entity/new](#post-entitynew)
    * [`DELETE` entity/](#delete-entity)
    * [`PUT`    entity/](#put-entity)
    * [`PATCH`  entity/follow/:entityID](#patch-entityfollowentityid)
* Grouplist
    * [`GET`    grouplist/:entityID/:listName](#get-grouplistentityidlistname)
    * [`POST`   grouplist/](#post-grouplist)
    * [`POST`   grouplist/new](#post-grouplistlistname)
    * [`DELETE` grouplist/:listName](#post-dgrouplistlistname)
    * [`PUT`    grouplist/:listName](#put-grouplistlistname)
    * [`PATCH`  grouplist/content/:listName](#patch-grouplistcontentlistname)
* Post
    * [`GET`    post/:postID](#get-postpostid)
    * [`POST`   post/](#post-post)
    * [`POST`   post/new](#post-postnew)
    * [`DELETE` post/:postID](#delete-postpostid)
    * [`PUT`    post/:postID](#put-postpostid)
    * [`PATCH`  post/like/:postID](#patch-postlikepostid)
* Comment
    * [`GET`    comment/:commentID](#get-commentcommentid)
    * [`POST`   comment/](#post-comment)
    * [`POST`   comment/new](#post-commentnew)
    * [`DELETE` comment/:commentID](#delete-commentcommentid)
    * [`PUT`    comment/:commentID](#put-commentcommentid)

## Auth Routes

#### POST login
- Authenticate (log in) an user.
- **Body:** 

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object | Yes | Entity filter. Preferrably `email` or `entityID`.
password | String | Yes | Password.

- **Status Code:**
    - 200: Authentication success.
    - 403: Authentication failed. Incorrect Password.
    - 404: Entity not found.
    - 500: Unknown error.
- **Returns:** `Entity` with `groupList` populated.


#### POST register
- Register a new entity.
- **Body:** 

Key      | Type     | Required | Description
:-------:|:--------:|:---:|--|
type     | String   | Yes | `'User'` or `'Rest'`.
username | String   | Yes | Username or restaurant's english name.
password | String   | Yes | [`User`] Password.
email    | String   | Yes | [`User`] Email.
address  | String   | Yes | [`Rest`] Address.
name     | String   |     | Name or restaurant's chinese name.
phone    | String   |     | Phone number.
profPhoto| [String] |     | Link to profile photo(s).
gender   | String   |     | [`User`] Gender
status   | String   |     | [`Rest`] Opening status.
openingHr|[[String]]|     | [`Rest`] Opening hours.

- **Status Code:**
    - 201: Entity created.
    - 409: Email already exists in DB.
    - 500: Unknown error.
- **Returns:** `Entity` (`[U]` with `groupList` populated)


## Entity Routes


#### GET entity/:entityID
- Get data of an Entity.
- **Body:** NULL
- **Status Code:**
    - 200: Entity found.
    - 204: Entity not found.
    - 500: Unknown error.
- **Returns:** `Entity` (`[U]` with `groupList` populated), or; `null` if not found


#### POST entity/
- Get data of multiple Entities.
- **Body:** 

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object | Yes | Entities filter. 

- **Status Code:**
    - 200: Entity found.
    - 204: Entity not found.
    - 500: Unknown error.
- **Returns:** `Entity` (`[U]` with `groupList` populated), or; `null` if not found


#### POST entity/new
- Register a new entity. Redirect to [`register`](#post-authregister)


#### DELETE entity/
- Delete an Entity.
- **Body:** NULL
- **Status Code:**
    - 200: Entity deleted.
    - 404: Entity not found.
    - 500: Unknown error.
- **Returns:** `Entity`


#### PUT entity/
- Edit an Entity.
- **Body:** 

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
data     | Object | Yes | Edit content.

- **Status Code:**
    - 200: Entity updated.
    - 404: Entity not found.
    - 409: Email already exists in DB. (Only on updating emails.)
    - 500: Unknown error.
- **Returns:** `Entity` (`[U]` with `groupList` populated)


#### PATCH entity/follow/:entityID
- Follow or unfollow an Entity with `entityID`.
- **Body:** 

Key          | Type    | Required | Description
:-----------:|:-------:|:---:|--|
addFlag      | Boolean | Yes | Whether to add or delete a follow.

- **Status Code:**
    - 200: Success.
    - 404: Entity not found.
    - 500: Unknown error.
- **Returns:** `Entity` with `groupList` populated.


## Grouplist Routes


#### GET grouplist/:entityID/:listName
- Get content of a list `listName` under User with `entityID`.
- **Body:** NULL
- **Status Code:**
    - 200: GroupList found.
    - 204: GroupList not found.
    - 500: Unknown error.
- **Returns:** `GroupList` with `content` populated, or `null` if not found


#### POST grouplist/
- Get content of multiple lists.
- **Body:** 

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object | Yes | Posts filter. 

- **Status Code:**
    - 200: GroupList(s) found.
    - 204: GroupList(s) not found.
    - 500: Unknown error.
- **Returns:** `Post`(s) with `author`, `target`, `hashtag`, and 3 `comment`s populated; `null` if not found.


#### POST grouplist/new
- Add a GroupList and push it under requesting User.
- **Body:** NULL

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
listName | String | Yes | Name of the new list.

- **Status Code:**
    - 201: Success.
    - 404: Entity not found.
    - 409: List with same name exists.
    - 500: Unknown error.
- **Returns:** `Entity` with `groupList` populated


#### DELETE grouplist/:listName
- Delete a GroupList and pull it under requesting User.
- **Body:** Null
- **Status Code:**
    - 200: Success.
    - 404: Entity/List not found.
    - 500: Unknown error.
- **Returns:** `Entity` with `groupList` populated


#### PUT grouplist/:listName
- Edit a GroupList (NOT include content).
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
data     | Object | Yes | Data to be updated.

- **Status Code:**
    - 200: Success.
    - 404: Entity/List not found.
    - 500: Unknown error.
- **Returns:** `GroupList` with `content` populated


#### PATCH groupList/content/:listName
- Add/Delete a restaurant into/in a GroupList.
- **Body:** Object

Key          | Type    | Required | Description
:-----------:|:-------:|:---:|--|
targetFilter | Object  | Yes | Target (restaurant) filter. 
addFlag      | Boolean | Yes | Whether to add or delete.

- **Status Code:**
    - 200: Success.
    - 404: Entity/List not found.
    - 500: Unknown error.
- **Returns:** `GroupList` with `content` populated


## Post Routes


#### GET post/:postID
- Get data of a post.
- **Body:** NULL
- **Status Code:**
    - 200: Post found.
    - 204: Post not found.
    - 500: Unknown error.
- **Returns:** `Post` with `author`, `target`, `hashtag`, and 3 `comment`s populated; `null` if not found.


#### POST post/
- Get data of multiple posts.
- **Body:** 

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object | Yes | Posts filter. 

- **Status Code:**
    - 200: Post(s) found.
    - 204: Post(s) not found.
    - 500: Unknown error.
- **Returns:** `Post`(s) with `author`, `target`, `hashtag`, and 3 `comment`s populated; `null` if not found.


#### POST post/new
- Add a new Post.
- **Body:**

Key          | Type     | Required | Description
:-----------:|:--------:|:---:|--|
targetFilter | Object   | Yes | Target (restaurant) filter. 
data         | Object   | Yes | Data to be added.
\- type      | Number   | Yes | 0: Check-in, 1: Review 
\- content   | String   | Yes | Content of the post.
\- rating    | Number   | Yes | [`Review`] Rating between 0-10. 
\- hashtag   | String   |     | Embedded hashtag(s).
\- photo     | [String] |     | Link to attached photo(s).

- **Status Code:**
    - 201: Success.
    - 404: Entity not found.
    - 500: Unknown error.
- **Returns:** `Post` with `author`, `target`, `hashtag`, and 3 `comment`s populated.


#### DELETE post/:postID
- Delete a Post, delete attached comments, and update related tags.
- **Body:** NULL
- **Status Code:**
    - 200: Success.
    - 404: Post/Comment/Tag not found.
    - 500: Unknown error.
- **Returns:** `Post`


#### PUT post/:postID
- Edit a Post.
- **Body:** 

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
data     | Object | Yes | Data used to modify.

- **Status Code:**
    - 200: Success.
    - 404: Post not found.
    - 500: Unknown error.
- **Returns:** `Post` with `author`, `target`, `hashtag`, and 3 `comment`s populated.


#### PATCH post/like/:postID
- Like a post.
- **Body:**

Key          | Type    | Required | Description
:-----------:|:-------:|:---:|--|
addFlag      | Boolean | Yes | Whether to add or delete a like.

- **Status Code:**
    - 200: Success.
    - 404: Post/Entity not found.
    - 500: Unknown error.
- **Returns:** `Post` with `author`, `target`, `hashtag`, and 3 `comment`s populated.


## Comment Routes


#### GET comment/:commentID
- Get data of a comment.
- **Body:** NULL
- **Status Code:**
    - 200: Comment found.
    - 204: Comment not found.
    - 500: Unknown error.
- **Returns:** `Comment` with `author` populated; `null` if not found.


#### POST comment/
- Get data of multiple comments.
- **Body:** 

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object | Yes | Comments filter. 

- **Status Code:**
    - 200: Comment(s) found.
    - 204: Comment(s) not found.
    - 500: Unknown error.
- **Returns:** `Comment`(s) with `author` populated; `null` if not found.


#### POST comment/new
- Add a new comment and append it to a Post.
- **Body:** Object

Key          | Type    | Required | Description
:-----------:|:-------:|:---:|--|
postFilter   | Object  | Yes | Post filter. Default as `postID`.
data         | Object  | Yes | Data to be added.
- content    | String  | Yes | Content of the comment.

- **Status Code:**
    - 201: Success.
    - 404: Post/Entity not found.
    - 500: Unknown error.
- **Returns:** `Post` with `author`, `target`, and `hashtag` populated


#### DELETE comment/:commentID
- Delete a comment and remove it from a Post.
- **Body:** NULL
- **Status Code:**
    - 200: Success.
    - 404: Post/Comment not found.
    - 500: Unknown error.
- **Returns:** `Post` with `author`, `target`, and `hashtag` populated


#### PUT comment/:commentID
- Edit a comment.
- **Body:** NULL

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
data     | Object | Yes | Data used to modify.

- **Status Code:**
    - 200: Success.
    - 404: Post/Comment not found.
    - 500: Unknown error.
- **Returns:** `Post` with `author`, `target`, and `hashtag` populated
