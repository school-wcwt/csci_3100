import React from 'react';
import { CssBaseline } from '@material-ui/core';

import { Loading, NavBar, global } from 'component'
import AddPost from './addPost'
/**
 * Asking User for Post's data
 * @returns Create Post Page
 */
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