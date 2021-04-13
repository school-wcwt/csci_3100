
/*
Extracted from 
my-app\src\pages\followers_page\entity.js

just focus on var fil =???
*/
 
const Filter_testing = () => {
  const [entity2, setEntity2] = useState(null);
  const grab_followers = () => {

    entityFn.entity_get(global.loginedUser.user.entityID).then(data => {
      //===========User type=============
      //fil for ALL users
      var fil1 = {
        'type': 'User'
      }

      //fil for following, User
      var fil = {
        '_id': { $in: data.followingUser },
        'type': 'User'
      }

      //fil for non-following, exclude myself, User
      var fil = {
        '_id': {
          $nin:
            data.followingUser.concat(global.loginedUser.user._id)
        },
        'type': 'User'
      }

      //===========Rest type=============
      //fil for ALL Rest
      var fil1 = {
        'type': 'Rest'
      }


      //fil for following rest
      var fil = {
        '_id': { $in: data.followingRest },
        'type': 'Rest'
      }

      //fil for non-following rest
      var fil = {
        '_id': { $nin: data.followingRest },
        'type': 'Rest'
      }


      //then will return the json array
      entityFn.entity_post(fil1).then(data => {
        console.log(data)
        console.log('hihi')
        setEntity2(data)
      })
    })
  }
  return (
    <div>
      <button onClick={() => { grab_followers() }}>get_entity
    </button>

      {entity2 == null ? '' :
        entity2.map(singEntity => {
          return (
            <>
              <h1>entityID ={singEntity != null ? singEntity.entityID : ''}</h1>
              <p>username ={singEntity != null ? singEntity.username : ''}</p>
              <p>profPhoto ={singEntity != null ? singEntity.profPhoto : ''}</p>
            </>
          )
        })
      }
    </div>
  )
}