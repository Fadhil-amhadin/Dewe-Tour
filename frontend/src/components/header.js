import './header.css';
import Login from './login';
import Register from './register';
import { useState } from 'react';
import { useMutation } from 'react-query';
import icon from '../assets/images/figma/Icon.png';
import image1 from '../assets/images/best-price.png';
import image2 from '../assets/images/traveller-love.png';
import image3 from '../assets/images/best-agent.png';
import image4 from '../assets/images/dedicated-support.png';
import {AdminIsLogin, UserIsLogin, UserNotLogin} from './avatar';
import jwt_decode from "jwt-decode"

function Header (props){
    const [login, setLogin] = useState(false);
    const [regist, setRegist] = useState(false);
    const localToken = localStorage.getItem('token')
    const token = localToken ? jwt_decode(localToken): "logout"

    // ============== handle form =================== //
    const [form, setForm] = useState({
        search: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = useMutation(async (e) => {
        e.preventDefault()
        props.changeWord(form.search)
    })
    return(
        <>  
            {login && <Login setLogin={setLogin}/>}
            {regist && <Register setRegist={setRegist}/>}

            <nav className="nav">
                <div className="transparent-layer">
                    <div className="nav-header">
                        <img src={icon} alt="dewe tour"></img>
                        <div>
                            {token.status === "user" ? <UserIsLogin/> : token.status === "admin" ? <AdminIsLogin/> : <UserNotLogin/>}
                        </div>
                    </div>
                    <div>
                        <div className="nav-title">
                            <h1>Explore</h1>
                            <p>your amazing city together</p>
                        </div>
                        <div>
                            <form onSubmit={e => handleSubmit.mutate(e)}>
                                <p className="search-label">find great places for holiday</p>
                                <div className="search-field">
                                    <input type="text" name="search" onChange={handleChange}></input>
                                    <button type="submit">search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="offer">
                <div className="card">
                    <img src={image1} alt="Avatar" style={{width: '14em'}}/>
                    <div className="container">
                        <h4><b>Best Price Guarantee</b></h4>
                        <p>A small river named Duren flows by their place and supplies</p>
                    </div>
                </div>
                <div className="card">
                    <img src={image2} alt="Avatar" style={{width: '14em'}}/>
                    <div className="container">
                        <h4><b>Travellers Love Us</b></h4>
                        <p>A small river named Duren flows by their place and supplies</p>
                    </div>
                </div>
                <div className="card">
                    <img src={image3} alt="Avatar" style={{width: '14em'}}/>
                    <div className="container">
                        <h4><b>Best Travel Agent</b></h4>
                        <p>A small river named Duren flows by their place and supplies</p>
                    </div>
                </div>
                <div className="card">
                    <img src={image4} alt="Avatar" style={{width: '14em'}}/>
                    <div className="container">
                        <h4><b>Our Dedicated Support</b></h4>
                        <p>A small river named Duren flows by their place and supplies</p>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Header;