import React from 'react';
import {LoadBackend}  from "../../component/load_backend/load_backend.js";

 class Followers extends LoadBackend{
    constructor(props) {
        super(props);
        this.state = {
          value: '{"entityID": "jon-rest-3413"}',
          entity: '',
          userID:'hihi',
          followID:'byebye',
          input_data:'{"username": "here"}',
      };
    }
    render() {
      let textInput = React.createRef();

        return (

        <div>
          

          <h1>Fetch all entities</h1>
          <button type="button" onClick={() => this.handleSubmit('{}')}> Submit </button>



          <h1>Follow entity</h1>
            <label> 
              UserID:
              <input id="userID" type="text" value={this.state.userID} onChange={(event)=>this.handleChange2(event)} />
            </label>

            <label> 
              FollowID:
              <input id="followID" type="text" value={this.state.followID} onChange={(event)=>this.handleChange2(event)} />
            </label>
            <button type="button" onClick={()=>this.follow(this.state.userID, this.state.followID)}> Submit </button>



            <h1>Change entity</h1>
            <label> 
              entityID:
              <input id="userID" type="text" value={this.state.userID} onChange={(event)=>this.handleChange2(event)} />
            </label>

            <label> 
              data to change(~JSON format):
              <input id="input_data" type="text" value={this.state.input_data} onChange={(event)=>this.handleChange2(event)} />
            </label>
            <button type="button" onClick={()=>this.edit_entity(this.state.userID, this.state.input_data)}> Submit </button>



          <h1> Input query filter</h1>
            <label> 
              Query (~Json format):
              <input ref={textInput} type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button type="button" onClick={()=>this.handleSubmit(this.state.value)}> Submit </button>
            <h1>Clear</h1>
            <button type="button" onClick={()=>this.setState({entity:''})}> Clear </button>
          <div>{this.printAll(this.state.entity)}</div>


          </div>
        );
      }
    }


 export default Followers;
 //  <button type="button" onClick={this.handleSubmit}> Submit </button>

 /*
     render(){
        return(
        <div> 
            <NameForm />    
        </div>);
    }
 }
 */