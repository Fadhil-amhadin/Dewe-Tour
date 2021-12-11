import Navbar from "./navbar";
import './list-transaction.css';
import { useHistory } from 'react-router';
import {API} from '../config/api';
import {useQuery} from 'react-query';

function ListTransaction () {
    const history = useHistory();
    let no = 0;

    const {data: transactions} = useQuery("listTransactionsCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token
            }
        }
        const response = await API().get(`/transactions`, config)
        console.log(response)
        return response.data
    })

    return(
        <>
            <Navbar/>
            <div className="list-container">
                <h1>Incoming Transaction</h1>
                <div className="list-content">
                    <table className="list-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>User</th>
                                <th>Trip</th>
                                <th>Transfer Proof</th>
                                <th>Payment Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions?.map(e => {
                                const statuStyling = `${e?.status}-admin`;
                                no++;
                                
                                return(
                                    <tr key={e?.id}>
                                        <td>{no}</td>
                                        <td>{e?.user.fullName}</td>
                                        <td>{e?.trip.title}</td>
                                        <td>{e?.attachment}</td>
                                        <td><p className={statuStyling}>{e?.status}</p></td>
                                        <td onClick={() => history.push(`/admin-approve/${e?.id}`)}><img src={require(`../assets/images/mag-glasses.png`).default} alt="img" style={{width : "40px"}}></img></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="footer" style={{marginTop : "6em"}}>
                <p>Copyright @ 2021 Dewe Tour - Fadhil - All Rights Reserved</p>
            </div>
        </>
    )
}

export default ListTransaction;