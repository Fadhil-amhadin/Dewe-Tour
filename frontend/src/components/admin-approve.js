import icon from '../assets/images/figma/Icon.png';
import { useParams } from 'react-router';
import Navbar from "./navbar";
import './admin-approve.css';
import { API } from '../config/api';
import { useQuery, useMutation } from 'react-query';

function AdminApprove () {
    const params = useParams();

    const toRupiah = (num) => {
        return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    }
    const {data: transaction} = useQuery("adminApproveCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            }
        }
        const response = await API().get(`/transactions/${params.id}`, config)
        return response.data
    })

    const handleCancel = useMutation(async (e) => {
        e.preventDefault()
        try {
            const body = JSON.stringify({status : "cancel"})
            const config = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + localStorage.token
                },
                body
            }
            const response = await API().patch(`/transactionsAdmin/${params.id}`, config)
            if(response.status === "success"){
                console.log("success")
                window.location.reload()
            }else{
                console.log("failed")
            }
        } catch (error) {
            console.log(error)
        }  
    })
    const handleApproved = useMutation(async (e) => {
        e.preventDefault()
        try {
            const body = JSON.stringify({status : "approved"})
            const config = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic " + localStorage.token
                },
                body
            }
            const response = await API().patch(`/transactionsAdmin/${params.id}`, config)
            if(response.status === "success"){
                console.log("success")
                window.location.reload()
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
                                <p className={`${transaction?.status}-payment`}>{transaction?.status} payment</p>
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
                                <h3>Transportation</h3>
                                <p>{transaction?.trip.transportation}</p>
                            </div>
                        </div>
                        <div className="child4">
                            <img src={`http://localhost:5000/uploads/${transaction?.attachment}`} alt="payment"></img>
                            <p>upload payment proof</p>
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
                                    <td><b>:  {transaction?.counterQty}</b></td>
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
                <div className="admin-approve-button">
                    {transaction?.status !== "cancel" && transaction?.status !== "approved" ? <button className="cancel-btn" onClick={(e) => handleCancel.mutate(e)}>Cancel</button>  : null}
                    {transaction?.status !== "cancel" && transaction?.status !== "approved" ? <button className="approve-btn" onClick={(e) => handleApproved.mutate(e)}>Approve</button>   : null}      
                </div>
            </div>
            <div className="footer">
                <p>Copyright @ 2021 Dewe Tour - Fadhil - All Rights Reserved</p>
            </div>
        </>
    )
}

export default AdminApprove;