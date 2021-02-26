### findEntity(filter, [entityOnly?], [populate?], [entitySelect], [subentitySelect])
- Parameter: 
    | Parameter       | Type                     | Optional | Default  | Description |
    |-----------------|--------------------------|----------|----------|-|
    | filter          | Object                   |          |          | Filter of the entity to be searched. |
    | entityOnly      | Boolean                  | Y        | false    | Whether to find Entity only and not User/Rest. |
    | populate        | Boolean                  | Y        | true     | Whether to populate `entity` within User/Rest. |
    | entitySelect    | Object \| String \| List | Y        | {__v: 0} | Select certain fields of the Entity. Either all exclusive (e.g. `{password:0}`) or all inclusive (e.g. `{username:1, tag:1}`). |
    | subentitySelect | Object \| String \| List | Y        | {__v: 0} | Select certain fields of the Entity. Either all exclusive (e.g. `{password:0}`) or all inclusive (e.g. `{username:1, tag:1}`). |
- Desc: Finds a single `Entity` in Entity and User/Rest. Returns `null` if not found. 0-1: all, 0-0: user/rest only, 1-0/1: entity only.
- Returns: Promise<Entity>

### addEntity(data)
- Parameter:
    | Parameter | Type   | Optional | Default | Description |
    |-----------|--------|----------|---------|-|
    | data      | Object |          |         | Data of the entity to be created. |
- Desc: Creates an Entity and a corr. User/Rest.
- Returns: Promise<Entity>

### updateEntity(filter, data)
- Parameter: 
    | Parameter | Type   | Optional | Default | Description |
    |-----------|--------|----------|---------|-|
    | filter    | Object |          |         | Filter of the entity to be updated. |
    | data      | Object |          |         | Data of the entity to be updated. |
- Desc: Updates an Entity's info.
- Returns: Promise<{oldEntity, newEntity}>

### deleteEntity(filter)
- Parameter:
    | Parameter | Type   | Optional | Default | Description |
    |-----------|--------|----------|---------|-|
    | filter    | Object |          |         | Filter of the entity to be deleted. |
- Desc: Deletes an Entity and it's corr. User/Rest.
- Returns: Promise<{deletedEntity, deletedSubentity}>
