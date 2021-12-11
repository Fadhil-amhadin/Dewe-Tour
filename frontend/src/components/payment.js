import { useHistory} from 'react-router';
import icon from '../assets/images/figma/Icon.png';
import {useQuery, useMutation} from 'react-query';
import {useState} from 'react';
import {API} from '../config/api';
import Navbar from "./navbar";
import './payment.css';

function Payment (){

    const history = useHistory();

    const toRupiah = (num) => {
        return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    }

    const {data: transaction} = useQuery("paymentCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            }
        }
        const response = await API().get(`/transactionLast`, config)
        return response.data
    })

    const [form, setForm] = useState({
        attachment: "",
        status: "pending"
    })

    const [preview, setPreview] = useState(null)

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
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.set("attachment", form.attachment[0], form.attachment[0].name)
            formData.set("status", form.status)

            const config = {
                method: "PATCH",
                headers: {
                    Authorization: "Basic " + localStorage.token
                },
                body: formData
            }
            const response = await API().patch(`/transactions/${transaction?.id}`, config)
            if(response.status === "success"){
                console.log("success")
                history.push(`/payment-pending/${transaction.id}`)
            }else{
                console.log("failed")
            }
        } catch (error) {
            console.log(error)
        }
    })

    return(
        <>
            <Navbar/>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <div className="payment-container">
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
                                <h1>{transaction?.trip.title}</h1>
                                <p>{transaction?.trip.country.name}</p>
                                <div className="status-payment-div">
                                    <p className="status-payment">{transaction?.status}</p>
                                </div>
                            </div>
                            <div className="child2">
                                <div>
                                    <h3>Date Trip</h3>
                                    <p>{transaction?.trip.dateTrip}</p>
                                </div>
                                <div>
                                    <h3>Accomodation</h3>
                                    <p>{transaction?.trip.accomodation}</p>
                                </div>
                            </div>
                            <div className="child3">
                                <div>
                                    <h3>Duration</h3>
                                    <p>{transaction?.trip.day} Days {transaction?.trip.night} Nights</p>
                                </div>
                                <div>
                                    <h3>Transportaion</h3>
                                    <p>{transaction?.trip.transportation}</p>
                                </div>
                            </div>
                            <div className="child4">
                                <label htmlFor="payment-proof">
                                    {preview ? <img src={preview} alt="img"></img>: transaction === undefined ? null : <img src={`http://localhost:5000/uploads/${transaction?.attachment}`} alt="img"></img>} 
                                    <p>upload payment proof</p>
                                </label>
                                <input type="file" name="attachment" id="payment-proof" className="payment-proof" onChange={handleChange}/>
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
                                        <td>{transaction?.user.fullName}</td>
                                        <td>Male</td>
                                        <td>{transaction?.user.phone}</td>
                                        <td><b>Qty</b></td>
                                        <td><b>: {transaction?.counterQty}</b></td>
                                    </tr>
                                    <tr className="last-child-table">
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><b>Total</b></td>
                                        <td><b style={{color : "red"}}>:  {toRupiah(transaction?.total)}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="payment-content-button"> 
                        <button type="submit">PAY</button>
                    </div>
                </div>
                <div className="footer">
                    <p>Copyright @ 2021 Dewe Tour - Fadhil - All Rights Reserved</p>
                </div>
            </form>
        </>
    )
}

export default Payment;