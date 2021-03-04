import React from 'react';

const Reservation = ()=>{
    return (
        <div>
            Hello Worid it is Reservation page
            <form action="/reservation/create">
            <label>
                <p>author:</p>
                <input type="text" name="author" />
            </label>

            <label>
                <p>target: </p>
                <input type="text" name="target" />
            </label>
            
            <label>
                <p>time:</p>
                <input type="datetime-local" name="datetime"/>
            </label>

            <input type="submit" value="Submit" />
            </form>

        </div>
    )
}
{/*
var ResvSchema = mongoose.Schema({
    resvID: { type: String, required: true, unique: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true },
    target: { type: mongoose.Schema.Types.ObjectId, ref:'Entity', required: true },
    time:   { type: Date, required: true },
    status: { type: Number, required: true, default: 0},
    info:   { type: String },
});

*/}


export default Reservation;
