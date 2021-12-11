import Navbar from "./navbar";
import { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../../src/config/api';

function AddCountry () {
    const [form, setForm] = useState({
        name: "",
    })
    const {name} = form

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
                    Authorization: "Basic " + localStorage.token,
                    "Content-Type": "application/json"
                },
                body
            }
            const response = await API().post('/countries', config)
            if(response.status === "success"){
                console.log("success")
                setForm({
                    name: "",
                })
            }else{
                console.log("failed")
            }
        } catch (error) {
            console.log(error)
        }
    })
    return(
        <>
            <div className="add-trip-background" style={{height : "100vh"}}>
                <Navbar/>
                <h1 className="add-title">Add Country</h1>
                <div className="add-trip-container">
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <div className="add-child">
                            <p>Country Name</p>
                            <input type="text" name="name"  value={name} onChange={handleChange}></input>
                        </div>
                        <div className="add-child-button">
                            <input type="submit" className="button-add" value="Add Country"></input>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCountry;