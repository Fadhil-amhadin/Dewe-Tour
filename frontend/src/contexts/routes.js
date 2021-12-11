import jwt_decode from "jwt-decode"
import { Redirect, Route } from "react-router";

export const AuthRoute = ({component: Component, ...rest}) => {
    if(!localStorage.token){
        return <Redirect to='/'/>
    }
    return <Route {...rest} render={props => (<Component {...props}/>)}/>
}

export const PrivateRoute = ({component: Component, ...rest}) => {
    let cont = localStorage.getItem('token')
    let token = cont ? jwt_decode(cont) : null
    if(token === null || token.status !== 'admin'){
        console.log("unauthorized")
        return <Redirect to='/'/>
    }
    return <Route {...rest} render={props => (<Component {...props}/>)}/>
}