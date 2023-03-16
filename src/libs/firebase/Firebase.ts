import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = process.env.firebaseConfig ?? ""

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