import './detail-tour.css';
import Login from './login';
import Navbar from './navbar';
import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useQuery, useMutation} from 'react-query';
import {API} from '../config/api';
import jwt_decode from "jwt-decode"


function DetailTour (){
    const [login, setLogin] = useState(false);
    const history = useHistory();
    const localToken = localStorage.getItem('token')
    const token = localToken ? jwt_decode(localToken): "none"
    const tokenId = token ? token.id : "none"

    const toRupiah = (num) => {
        return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    }
    const params = useParams();

    const {data: trip} = useQuery("tripCache", async () => {
        const config = {
            method: "GET"
        }
        const response = await API().get(`/trips/${params.id}`, config)
        return response.data
    })

    let [totalPrice, setTotalPrice] = useState(trip?.price);
    let [qty, setQty] = useState(1);

    useEffect(() => {
        setTotalPrice(trip?.price)
    },[trip?.price])

    // ============== handle form =========================
    const [form, setForm] = useState({
        counterQty: qty,
        total: totalPrice,
        status: "waiting payment",
        attachment: "upload.jpg",
        tripId: trip?.id,
        userId: tokenId
    })
    useEffect(() => {
        setForm({
            ...form,
            tripId: trip?.id,
        })
    }, [trip?.id])
    useEffect(() => {
        setForm({
            ...form,
            total: totalPrice,
            counterQty: qty
        })
    }, [totalPrice])

    const handleSubmit = useMutation(async (e) => {
        e.preventDefault()
        if(localStorage.getItem('token') === null || undefined){
            setLogin(true);
        }else{
            try {
                const body = JSON.stringify(form)
                const config = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic " + localStorage.token
                    },
                    body
                }
                const response = await API().post('/transactions', config)
                if(response.status === "success"){
                    console.log("success")
                    // history.push(`/payment`)
                }else{
                    console.log("failed")
                }
            } catch (error) {
                console.log(error)
            }
            //===================== update trips.soldQty
            try {
                const body = JSON.stringify({soldQty: form.counterQty})
                const config = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic " + localStorage.token
                    },
                    body
                }
                const response = await API().patch(`/trips/${form.tripId}`, config)
                if(response.status === "success"){
                    console.log("success")
                    history.push('/payment')
                }else{
                    console.log("failed")
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
    
    return(
        <>
            {login && <Login setLogin={setLogin}/>}
            <Navbar/>
            <div className="detail-tour">
                <div className="content">
                    <h1 className="title">{trip?.title}</h1>
                    <p>{trip?.country}</p>
                    <img className="main-img" src={trip?.image[0]} alt="tour"/>
                    <div className="small-img">
                        <img className="img-1" src={trip?.image[1]} alt="tour"/>
                        <img className="img-2" src={trip?.image[2]} alt="tour"/>
                        <img className="img-3" src={trip?.image[3]} alt="tour"/>
                    </div>
                    <div>
                        <h2>Information Trip</h2>
                        <div className="tour-info">
                            <div>
                                <p>Accomodation</p>
                                <span>
                                    <div>
                                    <img src={require(`../assets/images/detail-tour/accomodation.png`).default} alt="tour"/>
                                    </div>
                                    <h3>{trip?.accomodation}</h3>
                                </span>
                            </div>
                            <div>
                                <p>Transportation</p>
                                <span>
                                    <div>
                                    <img src={require(`../assets/images/detail-tour/transportation.png`).default} alt="tour"/>
                                    </div>
                                    <h3>{trip?.transportation}</h3>
                                </span>
                            </div>
                            <div>
                                <p>Eat</p>
                                <span>
                                    <div>
                                    <img src={require(`../assets/images/detail-tour/eat.png`).default} alt="tour"/>
                                    </div>
                                    <h3>{trip?.eat}</h3>
                                </span>
                            </div>
                            <div>
                                <p>Duration</p>
                                <span>
                                    <div>
                                    <img src={require(`../assets/images/detail-tour/duration.png`).default} alt="tour"/>
                                    </div>
                                    <h3>{trip?.day} Days {trip?.night} Nights</h3>
                                </span>
                            </div>
                            <div>
                                <p>Date Trip</p>
                                <span>
                                    <div>
                                    <img src={require(`../assets/images/detail-tour/date.png`).default} alt="tour"/>
                                    </div>
                                    <h3>{trip?.dateTrip}</h3>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="description-title">Description</h2>
                        <p className="description-content">{trip?.description}</p>
                    </div>
                    <div className="detail-price">
                        <span>
                            <p className="nominal">{toRupiah(trip?.price)}</p>
                            <p>/ Person</p>
                        </span>
                        <span>
                            <button onClick={() => {
                                if(qty > 1) setQty(qty -= 1);
                                setTotalPrice(trip?.price * qty)
                            }}>-</button>
                            <p className="quantity">{qty}</p>
                            <button onClick={() => {
                                if(qty < trip?.quota) setQty(qty += 1);
                                setTotalPrice(trip?.price * qty);
                            }}>+</button>
                        </span>
                    </div>
                    <hr></hr>
                    <div className="total-price">
                        <p>Total:</p>
                        <p className="nominal">{toRupiah(totalPrice)}</p>
                    </div>
                    <hr></hr>
                    <div className="booking-btn">
                        <form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <button type="submit">BOOK NOW</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer">
                <p>Copyright @ 2021 Dewe Tour - Fadhil - All Rights Reserved</p>
            </div>
        </>
    )
}

export default DetailTour;