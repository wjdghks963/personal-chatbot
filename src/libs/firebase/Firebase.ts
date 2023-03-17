import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()
const firebaseConfig = publicRuntimeConfig.firebaseConfig;


// @ts-ignore
const FireBaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const FireBaseAnalytics = async () =>  {
    let condition = await isSupported();
    if(condition){
       return  getAnalytics(FireBaseApp)
    }else{
        return null
    }
}

export {FireBaseApp, FireBaseAnalytics};