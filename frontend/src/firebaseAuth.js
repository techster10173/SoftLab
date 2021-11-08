import React, {createContext,useState, useEffect} from 'react';
import axios from 'axios'
import firebase from 'firebase/app';
import 'firebase/auth';


export const AuthContext= createContext({userPresent:false,user:null});

export default function FirebaseAuthContext(props){
    let [state,changeState] = useState({
        userDataPresent:false,
        user:null,
        listener:null
    });

    useEffect(()=>{
        if(state.listener==null) {
            changeState({...state,listener:firebase.auth().onAuthStateChanged((user)=>{
                
            if(user)
                changeState(oldState=>({...oldState,userDataPresent:true,user:user}));
                else
                changeState(oldState=>({...oldState,userDataPresent:true,user:null}));
            })});
        }

        return () => {
            if(state.listener)
                state.listener()
        }
    },[]);
  
    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function initInterceptor(){
    axios.interceptors.request.use(async config => {
        config.headers.authorization = await firebase.auth().currentUser.getIdToken();
        return config
    }, (error) => Promise.reject(error));
}
