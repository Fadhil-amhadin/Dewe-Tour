import { useQuery, useMutation } from 'react-query';
import icon from '../assets/images/figma/Icon.png';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { API } from '../config/api';
import Navbar from "./navbar";
import './profile.css';

function Profile () {
    const token = jwt_decode(localStorage.getItem('token'))

    const toRupiah = (num) => {
        return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    }

    const {data: transactions} = useQuery("profileCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            }
        }
        const response = await API().get(`/transactions`, config)
        const cont = response.data.filter(e => e.user.id === token.id)
        return cont
    })

    const {data: user} = useQuery("userProfilChache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            }
        }
        const response = await API().get(`/users/${token.id}`, config)
        return response.data
    })
    // ================ handle form ======================= //
    const [preview, setPreview] = useState(null)

    const [form, setForm] = useState({
        photo: "",
      });

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
    
        if (e.target.type === "file") {
          let url = URL.createObjectURL(e.target.files[0]);
          setPreview(url);
        }
      }

      const handleSubmit = useMutation(async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.set("photo", form.photo[0], form.photo[0].name)
    
          const config = {
            method: "PATCH",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
            body: formData,
          };
          const response = await API().patch(`/users/${token.id}`, config);
          console.log(response);
          window.location.reload()
        } catch (error) {
          console.log(error);
        }
      });
    return (

        <>
            <Navbar/>
            <div className="profile-container">
                <form className="imageChangeForm" onSubmit={e => handleSubmit.mutate(e)}>
                    <div className="personal-info">
                        <div className="info">
                            <h1>Personal Info</h1>
                        </div>
                        <div  className="info">
                            <span className="info-img">
                                <img src={require(`../assets/images/profile/name.png`).default} alt="img"></img>
                            </span>
                            <span>
                                <h6>{user === undefined ? null : user?.fullName}</h6>
                                <p>Full Name</p>
                            </span>
                        </div>
                        <div  className="info">
                            <span className="info-img">
                                <img src={require(`../assets/images/profile/email.png`).default} alt="img"></img>
                            </span>
                            <span>
                                <h6>{user === undefined ? null : user?.email}</h6>
                                <p>Email</p>
                            </span>
                        </div>
                        <div  className="info">
                            <span className="info-img">
                                <img src={require(`../assets/images/profile/phone.png`).default} alt="img"></img>
                            </span>
                            <span>
                                <h6>{user === undefined ? null : user?.phone}</h6>
                                <p>Mobile Phone</p>
                            </span>
                        </div>
                        <div className="info">
                            <span className="info-img">
                                <img src={require(`../assets/images/profile/address.png`).default} alt="img"></img>
                            </span>
                            <span>
                                <h6>{user === undefined ? null : user?.address}</h6>
                                <p>Address</p>
                            </span>
                        </div>
                    </div>
                    <div className="profile-photo">
                        <label htmlFor="change-profile">
                            {preview ? <img src={preview} alt="img"></img>: user === undefined ? null : <img src={`http://localhost:5000/uploads/${user?.photo}`} alt="img"></img>}          
                        </label>
                        <input type="file" name="photo" id="change-profile" className="change-profile" onChange={handleChange}/>
                        <div>
                            <button type="submit">Change Photo Profile</button>
                        </div>
                    </div>
                </form>
            </div>
            {/* ===================================== Payment ===================================== */}
            <div className="history-trip">
                <h1>History Trip</h1>
            </div>
            {transactions?.map(e => {
                
                return (
                    <div className="payment-container" key={e?.id}>
                    <div className="payment-content">
                        <div className="payment-content-header">
                            <img src={icon} alt="dewe tour"></img>
                            <div className="header-child">
                                <h1 className="booking">Booking</h1>
                                <p><b>Saturday</b>, 26 October 2021</p>
                            </div>
                        </div>
                        <div className="payment-content-body">
                            <div className="child1">
                                <h1>{e?.trip.title}</h1>
                                <p>{}</p>
                                <div className="approved-payment-div">
                                    <p className={`${e?.status}-payment`}>{e?.status} payment</p>
                                </div>
                            </div>
                            <div className="child2">
                                <div>
                                    <h3>Date Trip</h3>
                                    <p>{e?.trip.dateTrip}</p>
                                </div>
                                <div>
                                    <h3>Accomodation</h3>
                                    <p>{e?.trip.accomodation}</p>
                                </div>
                            </div>
                            <div className="child3">
                                <div>
                                    <h3>Duration</h3>
                                    <p>{e?.trip.day} Days {e?.trip.night} Nights</p>
                                </div>
                                <div>
                                    <h3>Transportation</h3>
                                    <p>{e?.trip.transportation}</p>
                                </div>
                            </div>
                            <div className="child4">
                                <img src={require(`../assets/images/profile/qr-code.png`).default} alt="payment" style={{border : "none"}} alt="qr-img"></img>
                                <h2 style={{marginTop : "10px"}}>TCK0101</h2>
                            </div>
                        </div>
                        <div className="transaction-table">
                            <table>
                                <thead>
                                    <tr className="table-head">
                                        <th>No</th>
                                        <th>Full Name</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>{e?.user.fullName}</td>
                                        <td>Male</td>
                                        <td>{e?.user.phone}</td>
                                        <td><b>Qty</b></td>
                                        <td><b>:  {e?.counterQty}</b></td>
                                    </tr>
                                    <tr className="last-child-table">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><b>Total</b></td>
                                        <td><b style={{color : "red"}}>:  {toRupiah(e?.total)}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                )
            })}

            <div className="footer" style={{marginTop : "6em"}}>
                <p>Copyright @ 2021 Dewe Tour - Fadhil - All Rights Reserved</p>
            </div>
        </>
    )
}

export default Profile;