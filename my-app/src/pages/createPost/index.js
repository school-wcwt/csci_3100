import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { Loading, NavBar, global } from 'component'
import AddPost from './addPost'

const CreatePost = () => {
    if (global.loginedUser.user == null) return <Loading/>
    return (
        <>
            <CssBaseline />
            <NavBar />
            <AddPost/>
        </>
    )
}
export default CreatePost;