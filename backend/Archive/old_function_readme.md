#### findEntity(filter, [entityOnly?], [populate?], [entitySelect], [subentitySelect])
- Finds a single `Entity` in Entity and User/Rest. 0-1: all, 0-0: user/rest only, 1-0/1: entity only.
-   | Parameter       | Type               | Optional | Default  | Description |
    |:---------------:|:------------------:|:--------:|:--------:|-|
    | filter          | `Object`           |          |          | Filter of the entity to be searched. |
    | entityOnly      | `Boolean`          | Y        | false    | Whether to find Entity only and not User/Rest. |
    | populate        | `Boolean`          | Y        | true     | Whether to populate `entity` within User/Rest. |
    | entitySelect    | `SelectResolvable` | Y        | {__v: 0} | Select certain fields of the Entity. |
    | subentitySelect | `SelectResolvable` | Y        | {__v: 0} | Select certain fields of the Entity. |
    
    *Remarks:* 
    - `SelectResolvable`: `Object | String | List`
    - Either exclusive (e.g. `{password:0}`) or inclusive (e.g. `{username:1, tag:1}`).
- **Returns:** `Promise<Entity>` or `Promise<null>`

#### addEntity(data)
- Creates an Entity and its corresponding User/Rest.
-   | Parameter | Type     | Optional | Default | Description |
    |:---------:|:--------:|:--------:|:-------:|-|
    | data      | `Object` |          |         | Data of the entity to be created. |
- **Returns:** `Promise<Entity>`

#### updateEntity(filter, data)
- Updates an Entity's info.
-   | Parameter | Type     | Optional | Default | Description |
    |:---------:|:--------:|:--------:|:-------:|-|
    | filter    | `Object` |          |         | Filter of the entity to be updated. |
    | data      | `Object` |          |         | Data of the entity to be updated. |
- **Returns:** `Promise<{oldEntity, newEntity}>`

#### deleteEntity(filter)
- Deletes an Entity and its corresponding User/Rest.
-   | Parameter | Type     | Optional | Default | Description |
    |:---------:|:--------:|:--------:|:-------:|-|
    | filter    | `Object` |          |         | Filter of the entity to be deleted. |
- **Returns:** `Promise<{deletedEntity, deletedSubentity}>`
