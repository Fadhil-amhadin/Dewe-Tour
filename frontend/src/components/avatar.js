import './avatar.css';
import Login from './login';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Register from './register';
import { AuthContext } from '../contexts/authContext';
import { useQuery } from 'react-query';
import { API } from '../config/api';
import jwt_decode from "jwt-decode";

const UserDropDown = () => {
    const history = useHistory();
    const {dispatch} = useContext(AuthContext);

    return(
        <div className="userDropDown">
            <div  className="arrow-container">
                <div className="top-arrow"></div>
            </div>    
            <span onClick={() => {
                    history.push('/profile')
                }}>
                <div>
                    <img src={require(`../assets/images/avatar/profile.png`).default} alt="profile"></img>
                </div>
                <p>Profile</p>
            </span>
            <span onClick={() => history.push('/paydrop')}>
                <div>
                    <img src={require(`../assets/images/avatar/pay.png`).default} alt="profile"></img>
                </div>
                <p>Pay</p>
            </span>
            <span onClick={() => history.push('/complaint')}>
                <div className="complaint-image-div">
                    <img src={require(`../assets/images/avatar/complaint.png`).default} alt="profile"></img>
                </div>
                <p>Complaint</p>
            </span>
            <hr style={{color: "grey"}}></hr>
            <span onClick={() => {dispatch({type: "LOGOUT"})
                                    history.push('/');
                                 }}>
                <div>   
                    <img src={require(`../assets/images/avatar/logout.png`).default} alt="profile"></img>
                </div>
                <p>Logout</p>
            </span>
        </div>
    )
}

const AdminDropDown = () => {
    const history = useHistory();
    const {dispatch} = useContext(AuthContext);
    return(
        <div className="adminDropDown">
             <div  className="arrow-container">
                <div className="top-arrow"></div>
            </div> 
            <span onClick={() => history.push('/incoming-trip')}>
                <div>
                    <img src={require(`../assets/images/avatar/trip.png`).default} alt="profile"></img>
                </div>
                <p>Trip</p>
            </span>
            <span onClick={() => history.push('/complaint-admin')}>
                <div>
                    <img src={require(`../assets/images/avatar/complaint.png`).default} alt="profile"></img>
                </div>
                <p>Complaint</p>
            </span>
            <hr style={{color: "grey"}}></hr>
            <span onClick={() => {dispatch({type: "LOGOUT"})
                                    history.push('/');
                                 }}>
                <div>   
                    <img src={require(`../assets/images/avatar/logout.png`).default} alt="profile"></img>
                </div>
                <p>Logout</p>
            </span>
        </div>
    )
}

function UserIsLogin () {
    const [isDropdown, setDropdown] = useState(false);
    const localToken = localStorage.getItem('token')
    const token = localToken ? jwt_decode(localToken): null

    const {data: user} = useQuery("userAvatarCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            }
        }
        const response = await API().get(`/users/${token.id}`, config)
        return response.data
    })
    return(
    <div className="userLoginAvatar" onClick={() => {isDropdown ? setDropdown(false) : setDropdown(true)}}>
        <img className="userAvatar" src={`http://localhost:5000/uploads/${user?.photo}`} alt="user-avatar"></img>
        {isDropdown ? <UserDropDown/> : null}
    </div>
    )
}

function AdminIsLogin () {
    const [isDropdown, setDropdown] = useState(false);
    const localToken = localStorage.getItem('token')
    const token = localToken ? jwt_decode(localToken): null

    const {data: user} = useQuery("userAvatarCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            }
        }
        const response = await API().get(`/users/${token.id}`, config)
        return response.data
    })
    return(
        <div className="adminLoginAvatar" onClick={() => {isDropdown ? setDropdown(false) : setDropdown(true)}}>
            <img className="adminAvatar" src={`http://localhost:5000/uploads/${user?.photo}`} alt="admin-avatar"></img>
            {isDropdown ? <AdminDropDown/> : null}
        </div>
    )
}

function UserNotLogin () {
    const [login, setLogin] = useState(false);
    const [regist, setRegist] = useState(false);

    return(
    <div>
        {login && <Login setLogin={setLogin}/>}
        {regist && <Register setRegist={setRegist}/>}

        <button className="btn-login" onClick={() => {setLogin(true)}} >Login</button>
        <button className="btn-regist" onClick={() => {setRegist(true)}} >Register</button>
    </div>
    )
}

export {UserIsLogin, UserNotLogin, AdminIsLogin};