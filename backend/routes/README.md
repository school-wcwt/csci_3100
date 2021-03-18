### Entities Route

#### GET entity/:entityID
- Get data of an Entity.
- **Body:** null
- **Status Code**:
    - 200: Entity found.
    - 204: Entity not found.
    - 400: Unknown error.
- **Returns:** `Entity` (`[U]` with `groupList` populated), or; `null` if not found

#### POST entity/
- Get data of multiple Entities.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object | Yes | Entities filter. 

- **Status Code**:
    - 200: Entity found.
    - 204: Entity not found.
    - 400: Unknown error.
- **Returns:** `Entity` (`[U]` with `groupList` populated), or; `null` if not found

#### POST entity/new
- Create a new Entity.
- **Body:** Object

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

- **Status Code**:
    - 201: Entity created.
    - 409: Email already exists in DB.
    - 400: Unknown error.
- **Returns:** `Entity` (`[U]` with `groupList` populated)

#### PUT entity/:entityID
- Edit an Entity of `entityID`.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
data     | Object | Yes | Edit content.
filter   | Object |     | Entity filter. Default as `entityID`

- **Status Code**:
    - 200: Entity updated.
    - 404: Entity not found.
    - 409: Email already exists in DB. (Only on updating emails.)
    - 400: Unknown error.
- **Returns:** `Entity` (`[U]` with `groupList` populated)

#### DELETE entity/:entityID
- Delete an Entity of `entityID`.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object |     | Entity filter. Default as `entityID`.

- **Status Code**:
    - 200: Entity deleted.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** `Entity`

### User Routes

#### POST user/auth
- Authenticate (log in) an user.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object | Yes | Entity filter. Preferrably `email` or `entityID`.
password | String | Yes | Password.

- **Status Code**:
    - 200: Authentication success.
    - 403: Authentication failed. Incorrect Password.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** `Entity` with `groupList` populated.

#### PATCH user/:entityID/follow/:entityID
- Follow or unfollow an Entity.
- **Body:** Object

Key          | Type    | Required | Description
:-----------:|:-------:|:---:|--|
addFlag      | Boolean | Yes | Whether to add or delete a follow.
authorFilter | Object  |     | Author (user) filter. Default as `entityID`.
targetFilter | Object  |     | Target (entity) filter. Default as `entityID`.

- **Status Code**:
    - 200: Success.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** `Entity` with `groupList` populated.

### GroupLists

#### GET user/:entityID/groupList/:listName
- Get content of a list `listName` under User with `entityID`.
- **Body:** None
- **Status Code**:
    - 200: GroupList found.
    - 204: GroupList not found.
    - 400: Unknown error.
- **Returns:** `GroupList` with `content` populated, or `null` if not found

#### POST user/:entityID/groupList/:listName
- Add a GroupList and push it under User with `entityID`.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object |  | Entity filter. Default as `entityID`.
listName | String |  | List name. Default as `listName`.

- **Status Code**:
    - 201: Success.
    - 404: Entity not found.
    - 409: List with same name exists.
    - 400: Unknown error.
- **Returns:** `Entity` with `groupList` populated

#### DELETE user/:entityID/groupList/:listName
- Delete a GroupList and pull it under User with `entityID`.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object |  | Entity filter. Default as `entityID`.
listName | String |  | List name. Default as `listName`.

- **Status Code**:
    - 200: Success.
    - 404: Entity/List not found.
    - 400: Unknown error.
- **Returns:** `Entity` with `groupList` populated

#### PUT user/:entityID/groupList/:listName
- Edit a GroupList (NOT include content).
- **Body**: Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
data     | Object | Yes | Data to be updated.
filter   | Object |     | Entity filter. Default as `entityID`.
listName | String |     | List name. Default as `listName`.

- **Status Code**:
    - 200: Success.
    - 404: Entity/List not found.
    - 400: Unknown error.
- **Returns:** `GroupList` with `content` populated

#### PATCH user/:entityID/groupList/:listName
- Add/Delete a restaurant into/in a GroupList.
- **Body**: Object

Key          | Type    | Required | Description
:-----------:|:-------:|:---:|--|
targetFilter | Object  | Yes | Target (restaurant) filter. 
addFlag      | Boolean | Yes | Whether to add or delete.
authorFilter | Object  |     | Author (user) filter. Default as `entityID`.
listName     | String  |     | List name. Default as `listName`.

- **Status Code**:
    - 200: Success.
    - 404: Entity/List not found.
    - 400: Unknown error.
- **Returns:** `GroupList` with `content` populated

### Posts / Comment / Like

#### POST user/:entityID/post/new
- Add a new Post.
- **Body:** Object

Key          | Type    | Required | Description
:-----------:|:-------:|:---:|--|
targetFilter | Object  | Yes | Target (restaurant) filter. 
data         | Object  | Yes | Data to be added.
- type       | Number  | Yes | 0: Check-in, 1: Review 
- content    | String  | Yes | Content of the post.
- rating     | Number  | Yes | [`Review`] Rating between 0-10. 
- hashtag    | String  |     | Embedded hashtag(s).
- photo      | [String]|     | Link to attached photo(s).
authorFilter | Object  |     | Author (user) filter. Default as `entityID`.

- **Status Code**:
    - 201: Success.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** `Post` with `author`, `target`, and `hashtag` populated

#### DELETE user/post/:postID
- Delete a Post, delete attached comments, and update related tags.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object |     | Post filter. Default as `postID`.

- **Status Code**:
    - 200: Success.
    - 404: Post/Comment/Tag not found.
    - 400: Unknown error.
- **Returns:** `Post`


#### PUT user/post/:postID
- Edit a post.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
data     | Object | Yes | Data used to modify.
filter   | Object |     | Post filter. Default as `postID`.

- **Status Code**:
    - 200: Success.
    - 404: Post not found.
    - 400: Unknown error.
- **Returns:** `Post` with `author`, `target`, and `hashtag` populated


#### PATCH user/:entityID/post/:postID/like
- Like a post.
- **Body:** Object

Key          | Type    | Required | Description
:-----------:|:-------:|:---:|--|
addFlag      | Boolean | Yes | Whether to add or delete a like.
authorFilter | Object  |     | Author (user) filter. Default as `entityID`.
postFilter   | Object  |     | Post filter. Default as `postID`.

- **Status Code**:
    - 200: Success.
    - 404: Post/Entity not found.
    - 400: Unknown error.
- **Returns:** `Post` with `author`, `target`, and `hashtag` populated


#### POST user/:entityID/post/:postID/comment/new
- Add a new comment and append it to a Post.
- **Body:** Object

Key          | Type    | Required | Description
:-----------:|:-------:|:---:|--|
data         | Object  | Yes | Data to be added.
- content    | String  | Yes | Content of the comment.
authorFilter | Object  |     | Author (user) filter. Default as `entityID`.
postFilter   | Object  |     | Post filter. Default as `postID`.

- **Status Code**:
    - 201: Success.
    - 404: Post/Entity not found.
    - 400: Unknown error.
- **Returns:** `Post` with `author`, `target`, and `hashtag` populated


#### DELETE user/:entityID/post/:postID/comment/:commentID
- Delete a comment and remove it from a Post.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object |     | Comment filter. Default as `commentID`.

- **Status Code**:
    - 200: Success.
    - 404: Post/Comment not found.
    - 400: Unknown error.
- **Returns:** `Post` with `author`, `target`, and `hashtag` populated


#### PUT user/:entityID/post/:postID/comment/:commentID
- Edit a comment.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
data     | Object | Yes | Data used to modify.
filter   | Object |     | Comment filter. Default as `commentID`.

- **Status Code**:
    - 200: Success.
    - 404: Post/Comment not found.
    - 400: Unknown error.
- **Returns:** `Post` with `author`, `target`, and `hashtag` populated
