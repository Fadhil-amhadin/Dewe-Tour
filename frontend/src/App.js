import './App.css';
import { useState } from 'react';
import Header from './components/header';
import Profile from './components/profile';
import Payment from './components/payment';
import Paydrop from './components/paydrop';
import AddTrip from './components/add-trip';
import Content from './components/front-content';
import IncomeTrip from './components/income-trip';
import DetailTour from './components/detail-tour';
import AdminApprove from './components/admin-approve';
import PaymentPending from './components/payment-pending';
import ListTransaction from './components/list-transaction';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './contexts/routes';
import AdminDashboard from './components/admin-dashboard';
import ComplaintAdmin from './components/complaint-admin';
import Complaint from './components/complaint';
import AddCountry from './components/add-country';

function App() {
  const [searchField, setSearchField] = useState(null);
  return (
      <Router>
        <Switch>
          <Route exact path='/'>
            <div className="App">
              <Header changeWord={word => setSearchField(word)}/>
              <Content searchField={searchField}/>
            </div>
          </Route>
          <Route exact path='/detail/:id' component={DetailTour}/>
          <AuthRoute exact path='/profile' component={Profile}/>
          <AuthRoute exact path='/paydrop' component={Paydrop}/>
          <AuthRoute exact path='/payment' component={Payment}/>
          <AuthRoute exact path='/complaint' component={Complaint}/>
          <AuthRoute exact path='/complaint-admin' component={ComplaintAdmin}/>
          <AuthRoute exact path='/payment-pending/:id' component={PaymentPending}/>
          <PrivateRoute exact path='/add-trip' component={AddTrip}/>
          <PrivateRoute exact path='/add-country' component={AddCountry}/>
          <PrivateRoute exact path='/incoming-trip' component ={IncomeTrip}/>
          <PrivateRoute exact path='/admin-approve/:id' component={AdminApprove}/>
          <PrivateRoute exact path='/list-transaction' component={ListTransaction}/>
          <PrivateRoute exact path='/admin-dashboard' component={AdminDashboard}/>
        </Switch>
      </Router>
  );
}

export default App;
