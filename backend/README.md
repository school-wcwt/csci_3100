# findEntity(filter, [entityOnly?], [populate?])
- Parameter: 
    - filter
        - type: Object
        - desc: Filter to search within Entity
    - entityOnly
        - type: Boolean
        - default: 0
        - desc: Whether to only find the Entity and not the User/Rest.
    - populate
        - type: Boolean
        - default: 1
        - desc: Whether to populate `entity` in User/Rest.
- Desc: Find single `Entity` in Entity and User/Rest. Returns `null` if not found.
- Returns: Promise<Entity>

# addEntity(data)
- Parameter:
    - data
        - type: Object
        - desc: The data to be created
- Desc: Create an Entity and a corr. User/Rest.
- Returns: Promise<Entity>

# updateEntity(filter, data)
- Parameter: 
    - filter
        - type: Object
        - desc: Filter to the entity to be searched within Entity.
    - data
        - type: Object
        - desc: The data to be modified
- Desc: Update an Entity's info.
- Returns: Promise<{oldEntity, newEntity}>



