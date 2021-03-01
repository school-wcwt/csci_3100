### Entities Route

#### GET entity/:entityID
- Get data of an Entity and its its corresponding User/Rest of `entityID`.
- **Body:** null
- **Status Code**:
    - 200: Entity found.
    - 204: Entity not found.
    - 400: Unknown error.
- **Returns:** `User/Rest` with `Entity` and `groupList` populated, or; `null` if not found


#### POST entity/new
- Add a new Entity and its corresponding User/Rest into DB.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
type     | Number | Yes | 0: User, 1: Restaurant.
username | String | Yes | Username or restaurant's english name (\*1).
email    | String | Yes | Email or restaurant's address.
password | Hash   |     | Hashed password (using `bcrypt`).
name     | String |     | Name or restaurant's chinese name (\*1).
phone    | String |     | Phone number.
status   | String |     | Gender or Restaurant's opening status.
openingHr| [[String]] | | Restaurant's opening hour.

*\*1*: Preferrably both names, otherwise chinese name will be used as username.
- **Status Code**:
    - 201: Entity created.
    - 409: (E)Mail already exists in DB.
    - 400: Unknown error.
- **Returns:** `User/Rest` with `Entity` and `groupList` populated.

#### PUT entity/:entityID
- Edit an Entity of `entityID`.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
data     | Object | Yes | Key-value pair(s) of the edit. Ref: Entity.
filter   | Object |     | Filter for searching the entity. Default as `entityID` in URL. Ref: Entity.

- **Status Code**:
    - 200: Entity updated.
    - 404: Entity not found.
    - 409: (E)Mail already exists in DB. (Only on updating emails.
    - 400: Unknown error.
- **Returns:** Object

Key           | Type   | Description
:------------:|:------:|--|
oldEntity     | Object | Previous entity.
updatedentity | Object | Updated entity.

#### DELETE entity/:entityID
- Delete an Entity of `entityID`.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object |     | Filter for searching the entity. Default as `entityID` in URL. Ref: Entity. 

- **Status Code**:
    - 200: Entity deleted.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** Object

Key             | Type   | Description
:--------------:|:------:|--|
deletedEntity   | Object | Deleted entity. Ref: Entity.
deltedSubentity | Object | Deleted subeneity. Ref: User/Rest. 

##

#### POST user/auth
- Authenticate (log in) an user.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
filter   | Object | Yes | Filter for searching the entity. Preferrably `email` or `entityID`.
password | Object | Yes | Hashed password (using `bcrypt`).

- **Status Code**:
    - 200: Authentication success.
    - 403: Authentication failed. Incorrect Password.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** `User/Rest` with `Entity` and `groupList` populated.

#### POST user/:entityID/groupList
- Add a GroupList and push it under User with `entityID`.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
listName | Object | Yes | List name to be added.

- **Status Code**:
    - 201: Success.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** `User` with `Entity` and `groupList` populated.

#### DELETE user/:entityID/groupList
- Delete a GroupList and pull it under User with `entityID`.
- **Body:** Object

Key      | Type   | Required | Description
:-------:|:------:|:---:|--|
listName | Object | Yes | List name to be deleted.

- **Status Code**:
    - 200: Success.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** `User` with `Entity` and `groupList` populated.

#### POST user/:entityID/groupList/:listName
- Add a restaurant (Entity) into a user's list.
- **Body**: Object

Key          | Type   | Required | Description
:-----------:|:------:|:---:|--|
targetFilter | Object | Yes | Filter of the target (restaurant) to be added into the list. 

- **Status Code**:
    - 200: Success.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** `User` with `Entity` and `groupList` populated.

#### DELETE user/:entityID/groupList/:listName
- Add a restaurant (Entity) into a user's list.
- **Body**: Object

Key          | Type   | Required | Description
:-----------:|:------:|:---:|--|
targetFilter | Object | Yes | Filter of the target (restaurant) to be added into the list. 

- **Status Code**:
    - 200: Success.
    - 404: Entity not found.
    - 400: Unknown error.
- **Returns:** `User` with `Entity` and `groupList` populated.




