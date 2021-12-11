import './front-content.css';
import {useHistory} from 'react-router-dom';
import {useQuery} from 'react-query';
import {API} from '../config/api';

function Content (props){
    const history = useHistory();

    const toRupiah = (num) => {
        return new Intl.NumberFormat("en-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    }
    const {data: trips} = useQuery("tripsCache", async () => {
        const config = {
            method: "GET"
        }
        const response = await API().get('/trips', config)
        return response.data
    })
    return(
        <div className="content">
            <h1 style={{textAlign: 'center'}}>Group Tour</h1>
            <div className="row">
                {
                    trips?.filter(e => !props.searchField ? true : e.title.toLowerCase().includes(props.searchField.toLowerCase()) || e.country.toLowerCase().includes(props.searchField.toLowerCase()))
                          .map((dataElm) => {
                        return(                      
                        <div onClick={() => {history.push(`/detail/${dataElm.id}`)}} className="card" key={dataElm.id}>
                            <div className="image-container">
                                <img src={dataElm.image[0]} alt="Avatar" style={{width: '22em'}}/>
                                <div className="quota-label"><h3>{`${dataElm.quota - dataElm.soldQty}/${dataElm.quota}`}</h3></div>
                            </div>
                            <div className="container">
                                <h2><b>{dataElm.title}</b></h2>
                                <div>
                                    <p className="price"><b>{toRupiah(dataElm.price)}</b></p>
                                    <p>{dataElm.country}</p>
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
    )
}

export default Content;