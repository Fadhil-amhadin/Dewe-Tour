import { createContext, useReducer } from "react";

const authValue = {
    isLogin : false,
    user: {}
}

function reducer (state, action){
    const {type, payload} = action;
    switch(type){
        case "LOGIN_SUCCESS":
            localStorage.setItem('token', payload.token)
            return{
                isLogin: true,
                user: payload
            }
        case "LOGOUT":
            localStorage.removeItem('token')
            return{
                isLogin: false,
                user: {}
            }
        default:
            throw new Error();
    }
}

export const AuthContext = createContext();

function AuthContextProvider({children}){
    const [state, dispatch] = useReducer(reducer, authValue);
    
    return(
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;