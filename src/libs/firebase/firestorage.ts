import {doc, getDoc, getFirestore, setDoc, updateDoc, runTransaction} from "firebase/firestore";
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
        await updateDoc(docRef, {...settingDataJson})
    }else {
        return alert("로그인이 필요합니다.")
    }
}


export const settingTransaction = async (email:string, settingDataJson:SettingDataJson) =>{

    try {
        const docRef = doc(db,'users', email);

        await runTransaction(db,async (transaction)=>{
            const userDoc = await transaction.get(docRef);
            if(!userDoc.exists()){
                transaction.set(docRef,{...settingDataJson})
            }
            transaction.update(docRef,{...settingDataJson})
        })
    }catch (error:any){
        return handleFirebaseStorageError(error)
    }
}

export const getSetting = async (email:string) => {
        if(!email) return null
    try{
        const docRef = doc(db,'users', email);
         const documentDataDocumentSnapshot = await getDoc(docRef);
         if(documentDataDocumentSnapshot){
            return documentDataDocumentSnapshot.data();
         }else{
             return null
         }

    }catch (error:any){
            return handleFirebaseStorageError(error);
    }

}


export const drawlUserDeleteSettingData = async (email:string) => {
    const docRef = doc(db,'users', email);

    try {
        await runTransaction(db,async (transaction)=>{
            const userDoc = await transaction.get(docRef);
            if(!userDoc.exists()){
                return;
            }
            transaction.delete(docRef);
        })
    }catch (error:any){
        return handleFirebaseStorageError(error)
    }
}


const handleFirebaseStorageError = (error:any) => {
    let errorMessage = "";
    switch (error.code) {
        case "storage/unauthorized":
            errorMessage = "인증되지 않은 사용자입니다.";
            break;
        case "storage/canceled":
            errorMessage = "사용자에 의해 업로드가 취소되었습니다.";
            break;
        case "storage/unknown":
            errorMessage = "알 수 없는 오류가 발생했습니다.";
            break;
        case "storage/invalid-argument":
            errorMessage = "잘못된 인수가 제공되었습니다.";
            break;
        case "storage/invalid-checksum":
            errorMessage = "전송된 파일이 손상되었습니다.";
            break;
        case "storage/invalid-event-name":
            errorMessage = "올바르지 않은 이벤트 이름이 제공되었습니다.";
            break;
        case "storage/invalid-url":
            errorMessage = "올바르지 않은 URL이 제공되었습니다.";
            break;
        case "storage/no-default-bucket":
            errorMessage = "기본 버킷을 찾을 수 없습니다.";
            break;
        case "storage/object-not-found":
            errorMessage = "해당 파일을 찾을 수 없습니다.";
            break;
        case "storage/project-not-found":
            errorMessage = "해당 프로젝트를 찾을 수 없습니다.";
            break;
        case "storage/quota-exceeded":
            errorMessage = "사용 가능한 저장소 공간이 부족합니다.";
            break;
        case "storage/retry-limit-exceeded":
            errorMessage = "파일 업로드 시 재시도 제한을 초과했습니다.";
            break;
        default:
            errorMessage = "알 수 없는 오류가 발생했습니다.";
            break;
    }
    return { error: errorMessage };
};
