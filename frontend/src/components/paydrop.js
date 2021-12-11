import { useQuery} from 'react-query';
import icon from '../assets/images/figma/Icon.png';
import { API } from '../config/api';
import jwt_decode from "jwt-decode";
import Navbar from "./navbar";

function Paydrop () {

    const token = jwt_decode(localStorage.getItem('token'))

    const toRupiah = (num) => {
        return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    }

    const {data: transactions} = useQuery("paydropCache", async () => {
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

    return (
        <>
            <Navbar/>
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
                                <p>{e?.trip.country.name}</p>
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
                                        <td><b>:  {e.counterQty}</b></td>
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

export default Paydrop;