import { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../../src/config/api';
function Register ({setRegist}){
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        photo: "avatar.png",
        gender: "male"
    })
    const {fullName, email, password, phone, address} = form

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
            const response = await API().post('/register', config)
            if(response.status === "success"){
                console.log("success")
                setForm({
                    fullName: "",
                    email: "",
                    password: "",
                    phone: "",
                    address: "",
                    photo: "avatar.png",
                    gender: "male"
                })
                setRegist(false)
            }else{
                console.log("failed")
            }
        } catch (error) {
            console.log(error)
        }
    })
    return(
        <div className="registBackground">
            <div className="registContainer">
                <div className="exitBtn">
                    <button onClick={() => {setRegist(false)}}>x</button>
                </div>
                <div className="registTitle">
                    <h1>Register</h1>
                </div>
                <div className="registBody">
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                         <div className="registName">
                            <div><label>Full Name</label></div>
                            <input type="text" value={fullName} name="fullName" onChange={handleChange}></input>
                        </div>
                        <div className="registEmail">
                            <div><label>Email</label></div>
                            <input type="email" value={email}  name="email" onChange={handleChange}></input>
                        </div>
                        <div className="registPassword">
                            <div><label>Password</label></div>
                            <input type="password" id="registPassword" value={password} name="password" onChange={handleChange}></input>
                        </div>
                        <div className="registPhone">
                            <div><label>Phone</label></div>
                            <input type="number" value={phone} name="phone" onChange={handleChange}></input>
                        </div>
                        <div className="registAddress">
                            <div><label>Address</label></div>
                            <textarea type="text" value={address} name="address" onChange={handleChange}></textarea>
                        </div>
                        <input className="registSubmit" type="submit"></input>
                    </form>
                </div>
                <div className="registFooter">
                    <button><p>Already have an account? login here!</p></button>
                </div>
            </div>
        </div>
    )
}

export default Register;