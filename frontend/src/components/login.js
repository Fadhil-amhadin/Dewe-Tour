import { useState } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { useMutation } from 'react-query';
import { API } from '../../src/config/api';
import { AuthContext } from '../contexts/authContext';
import jwt_decode from "jwt-decode"

function Login ({setLogin}){
    const history = useHistory();
    const [messageLog, setMessageLog] = useState(false);
    const {dispatch} = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const {email, password} = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = useMutation(async (e) => {
        e.preventDefault()
        try {
            const body = JSON.stringify(form)
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            }
            const response = await API().post('/login', config)

            if(response.status === "success"){
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data
                })

                const token = jwt_decode(localStorage.getItem('token'))

                if(token.status === "admin"){
                    history.push('/admin-dashboard')
                }else{
                    window.location.reload()
                }
            }
        } catch (error) {
            console.log(error)
        }
    })
    return(
        <div className="loginBackground">
            <div className="loginContainer">
                <div className="exitBtn">
                    <button onClick={() => {setLogin(false);
                                            setMessageLog(false);
                                            }}>x</button>
                </div>
                {messageLog ? <LoginMessage/> : null}
                <div className="loginTitle">
                    <h1>Login</h1>
                </div>
                <div className="loginBody">
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <div className="loginEmail">
                            <div><label>Email</label></div>
                            <input type="email" id="email" value={email} name="email" onChange={handleChange}></input>
                        </div>
                        <div className="loginPassword">
                            <div><label>Password</label></div>
                            <input type="password" id="password" value={password} name="password" onChange={handleChange}></input>
                        </div>
                        <input className="loginSubmit" type="submit"></input>
                    </form>
                </div>
                <div className="loginFooter">
                    <button><p>Don't have account? click here!</p></button>
                </div>
            </div>
        </div>
    )
}

function LoginMessage(){
    return(
        <div className="loginMessage">
            <p>your email or password is incorrect!</p>
        </div>
    )
}

export default Login;