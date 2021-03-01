import React from 'react';
import './main.css';
import './resources/css/style.css';
import logo from '../../image/logo.png';
import TitleBar from './component/titlebar/';

const TopHead = () => {
    return (
    <header class = "header_main">
        <nav>
            <div class="row">
                <img src={logo} alt="OmniFood logo" class="logo"/>
                <ul class="main-nav">
                    <li><a href="#">Recommanded food</a></li>
                    <li><a href="#how-it-work">What is mATE</a></li>
                    <li><a href="#our-city"></a></li>
                    <li><a href="#sign_up_section">Sign up</a></li>
                </ul>
            </div>
        </nav>

        <div class="hero-text-box">
            <h1>Goodbye junk food<br/>Hello super healthy meals</h1>
            <a class="btn btn-full" href="#Food">I am hungry</a>
            <a class="btn btn-ghost" href="#More">Show me more</a>
        </div>
    </header>
    )
};

const Main = ()=>{
    return (
        <div>
            <TopHead/>
        </div>        
    )
}

export default Main;
