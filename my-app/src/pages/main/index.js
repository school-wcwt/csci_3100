import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CssBaseline, Typography } from '@material-ui/core';
import { Loading, NavBar, Posts, global } from 'component'

/**
 * Generate Main Page and Posts for followed user
 * @return Main Page UI
 */

const Main = (props) => {
    if (global.loginedUser.user == null) return <Loading />
    else return (
        <>
            <CssBaseline />
            <NavBar />
            <Posts filter={{
                $and: [
                    {$or: [
                        {target: {$in: global.loginedUser.user.followingRest}},
                        {author: {$in: global.loginedUser.user.followingUser}}
                    ]},
                    {type: 1}
                ]
            }}/> 
        </>
    )
}
export default Main;