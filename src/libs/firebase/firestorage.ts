import {doc, getDoc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {FireBaseApp} from "./Firebase";
import {SettingDataJson} from "../../../type";
import {auth} from "./auth";

const db = getFirestore(FireBaseApp);

export const createSetting = async (settingDataJson:SettingDataJson) => {
    if(auth.currentUser){
        const email = auth.currentUser?.email ?? "unknown"
        const docRef = doc(db, 'users', email);
        await setDoc(docRef, {settingDataJson})
    }else{
        return alert("로그인이 필요합니다.")
    }


}


export const updateSetting = async (settingDataJson:SettingDataJson) =>{
    if(auth.currentUser) {
        const email = auth.currentUser?.email ?? "unknown"
        const docRef = doc(db,'users', email);
        await updateDoc(docRef, {settingDataJson})
    }else {
        return alert("로그인이 필요합니다.")
    }
}

export const getSetting = async (email:string) => {
        if(!email) return null
        const docRef = doc(db,'users', email);
         const documentDataDocumentSnapshot = await getDoc(docRef);
         if(documentDataDocumentSnapshot){
            return documentDataDocumentSnapshot.data();
         }else{
             return null
         }

}