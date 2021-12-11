import { useMutation, useQuery } from 'react-query';
import { API } from '../../src/config/api';
import { useHistory } from 'react-router';
import { useState } from "react";
import Navbar from "./navbar";
import './add-trip.css';
 
function AddTrip(){
    const history = useHistory();

    const {data: countries} = useQuery("countriesCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            }
        }
        const response = await API().get(`/countries`, config)
        return response.data
    })
    // =========== handle form =============== //
    const [form, setForm] = useState({
        title: "",
        countryId: "",
        accomodation: "",
        transportation: "",
        eat: "",
        day: "",
        night: "",
        dateTrip: "",
        price: "",
        quota: "",
        description: "",
        image: "",
        soldQty: 1
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        e.preventDefault();
        try {
            const body = form
            console.log(body)
            const formData = new FormData();
            for(let i = 0; i < form?.image.length; i++){
                formData.append("image", form?.image[i], form?.image[i].name)
            }
            formData.set("title", form.title);
            formData.set("countryId", form.countryId);
            formData.set("accomodation", form.accomodation);
            formData.set("transportation", form.transportation);
            formData.set("eat", form.eat);
            formData.set("day", form.day);
            formData.set("night", form.night);
            formData.set("dateTrip", form.dateTrip);
            formData.set("price", form.price);
            formData.set("quota", form.quota);
            formData.set("description", form.description);
            formData.set("soldQty", form.soldQty)

            console.log(formData)

            const config = {
                method: "POST",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
                body: formData
              };

              await API().post("/trips", config);
              history.push("/incoming-trip")
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <>
        <div className="add-trip-background">
            <Navbar/>
            <h1 className="add-title">Add Trip</h1>
            <div className="add-trip-container">
                <form encType='multipart/form-data' onSubmit={(e) => handleSubmit.mutate(e)}>
                        <div className="add-child">
                            <p>Title Trip</p>
                            <input type="text" name="title" onChange={handleChange}></input>
                        </div>
                        <div className="add-child">
                            <p>Country</p>
                            <select name="countryId" onChange={handleChange} required>
                                <option disabled>Select Country</option>
                                {countries?.map(e => {
                                    return(
                                        <option key={e.id} value={e.id}>{e.name}</option>
                                    )
                                })}
                                
                            </select>
                        </div>
                        <div className="add-child">
                            <p>Accomodation</p>
                            <input type="text" name="accomodation" onChange={handleChange}></input>
                        </div>
                        <div className="add-child">
                            <p>Transportation</p>
                            <input type="text" name="transportation" onChange={handleChange}></input>
                        </div>
                        <div className="add-child">
                            <p>Eat</p>
                            <input type="text" name="eat" onChange={handleChange}></input>
                        </div>
                        <div className="add-child">
                            <p>Duration</p>
                            <div className="duration-child">
                                <span>
                                    <input type="text" name="day" onChange={handleChange}></input>
                                    <p>day</p>
                                </span>
                                <span>
                                    <input type="text" name="night" onChange={handleChange}></input>
                                    <p>night</p>
                                </span>
                            </div>
                        </div>
                        <div className="add-child">
                            <p>Date Trip</p>
                            <input type="text" name="dateTrip" onChange={handleChange}></input>
                        </div>
                        <div className="add-child">
                            <p>Price</p>
                            <input type="text" name="price" onChange={handleChange}></input>
                        </div>
                        <div className="add-child">
                            <p>Quota</p>
                            <input type="number" name="quota" onChange={handleChange}></input>
                        </div>
                        <div className="add-child">
                            <p>Description</p>
                            <textarea name="description" onChange={handleChange}></textarea>
                        </div>
                        <div className="add-child">
                            <p>Upload Image</p>
                            <input type="file" multiple name="image" onChange={handleChange}/> 
                        </div>
                        <input type="hidden" name="soldQty" value={0} onChange={handleChange}/>
                        <div className="add-child-button">
                            <input type="submit" className="button-add" value="Add Trip"></input>
                        </div>
                </form>
            </div>
        </div>
        <div className="footer" style={{marginTop : "0"}}>
            <p>Copyright @ 2021 Dewe Tour - Fadhil - All Rights Reserved</p>
        </div>
        </>
    )
}

export default AddTrip;