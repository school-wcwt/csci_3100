import React from 'react';
import MediaCard from './component/cardMedia/cardMedia';
import {Auth} from '../services/authService';

const DiscoverPage = ()=>{
    Auth();
    return (
        <MediaCard/>

    );
}

export default DiscoverPage;
