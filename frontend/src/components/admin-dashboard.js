import Navbar from "./navbar";
import './admin-dashboard.css';
import Charts from "./charts";
import { useHistory } from 'react-router';

function AdminDashboard (){
    const history = useHistory()
    return(
        <>
            <Navbar/>
            <div className="dashboard-container">
                <h1>Admin Dashboard</h1>
                <div className="btn-group">
                    <button className="transaction-btn" onClick={() => history.push('/list-transaction')}>Transaction</button>
                    <button className="trips-btn" onClick={() => history.push('/incoming-trip')}>Trips</button>
                    <button className="complaint-btn" onClick={() => history.push('/complaint-admin')}>Complaint</button>
                    <div className="empty-div"></div>
                </div>
                <div className="chart-container">
                    <Charts/>
                </div>
            </div>
            <div className="footer">
                <p>Copyright @ 2021 Dewe Tour - Fadhil - All Rights Reserved</p>
            </div>
        </>
    )
}

export default AdminDashboard;