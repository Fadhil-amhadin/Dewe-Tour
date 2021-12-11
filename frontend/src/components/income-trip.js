import Navbar from "./navbar"
import './income-trip.css';
import { API } from '../config/api';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

function IncomeTrip (){
    const history = useHistory();

    const toRupiah = (num) => {
        return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    }

    const {data: trips} = useQuery("incomingTripCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            }
        }
        const response = await API().get(`/trips`, config)
        return response.data
    })

    //delete
    const handleDelete = useMutation(async (e) => {
        try {
            const config = {
                method: "DELETE",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
            }
            const response = await API().delete(`/trips/${e}`, config)
            window.location.reload()
            return
        } catch (error) {
            console.log(error)
        }
    })
    return(
        <>
            <Navbar/>
            <div className="incoming-trip-title">
                <h1>Incoming Trip</h1>
                <div className="buffer"></div>
                <div className="incoming-trip-div">
                    <button onClick={() => {history.push(`/add-trip`)}}>Add Trip</button>
                    <button onClick={() => {history.push(`/add-country`)}}>Add Country</button>
                </div>
            </div>
            <div className="content">
            <div className="row">
                {
                    trips?.map((dataElm) => {
                        return(                      
                        <div /*onClick={() => {history.push(`/detail/${dataElm?.id}`)}}*/ className="card" key={dataElm?.id}>
                            <div className="image-container">
                                <img src={dataElm?.image[0]} alt="Avatar" style={{width: '22em'}}/>
                                <div className="quota-label"><h3>{`${dataElm.quota - dataElm.soldQty}/${dataElm.quota}`}</h3></div>
                            </div>
                            <div className="container">
                                <h2><b>{dataElm?.title}</b></h2>
                                <div>
                                    <p className="price"><b>{toRupiah(dataElm?.price)}</b></p>
                                    <button className="delete-trip" onClick={(e) => handleDelete.mutate(dataElm?.id)}>delete</button>
                                    <p>{dataElm?.country}</p>
                                </div>
                            </div>
                        </div>                      
                        )
                    })
                }

            </div>
            <div className="footer">
                <p>Copyright @ 2021 Dewe Tour - Fadhil - All Rights Reserved</p>
            </div>
        </div>
        </>
    )
}

export default IncomeTrip;