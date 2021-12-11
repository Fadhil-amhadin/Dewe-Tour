import './navbar.css';
import Login from './login';
import { useState } from 'react';
import Register from './register';
import icon from '../assets/images/figma/Icon.png';
import {AdminIsLogin, UserIsLogin, UserNotLogin} from './avatar';
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function Navbar () {
    const history = useHistory();
    const [login, setLogin] = useState(false);
    const [regist, setRegist] = useState(false);
    const localToken = localStorage.getItem('token')
    const token = localToken ? jwt_decode(localToken): "logout"

    const backHome = () => {
        if(token.status === 'admin'){
            history.push('/admin-dashboard')
        }else{
            history.push('/')
        }
    }
    return (
        <>
            {login && <Login setLogin={setLogin}/>}
            {regist && <Register setRegist={setRegist}/>}

            <nav className="navbar">
                <div className="navbar-header">
                    <img src={icon} alt="dewe tour" onClick={backHome}></img>
                    {token.status === "user" ? <UserIsLogin/> : token.status === "admin" ? <AdminIsLogin/> : <UserNotLogin/>}
                </div>
            </nav>
        </>
    )
}

export default Navbar;