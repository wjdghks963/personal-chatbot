import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    setPersistence,
    signInAnonymously,
    signInWithEmailAndPassword, signInWithPopup, UserCredential,
} from "firebase/auth";
import {FireBaseApp} from "./Firebase"
import {drawlUserDeleteSettingData} from "./firestorage";

export const auth = getAuth(FireBaseApp);

const GoogleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () =>{
   //await signInWithRedirect(auth, GoogleProvider);

    return setPersistence(auth, browserLocalPersistence).then(async()=>{
        try{
            const result = await signInWithPopup(auth, GoogleProvider)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result?.user;
            const idToken = credential?.idToken

            return {user, idToken}
        }catch (error : any){
            const errorCode = error.code;
            const errorMessage = error.message;
            return handleFirebaseAuthError(error)
            return {errorCode, errorMessage}
        }
    })

}

export const signInWithAnonymous = async ( )=>{
    try{
        return await signInAnonymously(auth);
    }catch (e:any){
        console.log(e);
        return {error:e, errorCode:e.code};
    }
}

export const logout = () =>{
    if(auth.currentUser?.isAnonymous){
        return auth.currentUser.delete();
    }
    return auth.signOut();
}

export const withDrawlUser = async () =>{
    try{
        drawlUserDeleteSettingData(auth.currentUser?.email as string);
        return await auth.currentUser?.delete();
    }catch (e:any){
        console.log(e)
        return {error:e, errorCode:e.code};
    }
}

export const isAuthLoggedIn = () =>{
     onAuthStateChanged(auth, (user)=>{
        return user;
    })
}


export const createUser = async (email:string, password:string) =>{
    try{
        return await createUserWithEmailAndPassword(auth, email, password);
    }catch (e:any){
        console.log(e);
        return handleFirebaseAuthError(e)
    }
}

export const signInWithEmailPassword = async (email:string, password:string)  =>{

    return setPersistence(auth, browserLocalPersistence).then(async()=>{
        try{
            return await signInWithEmailAndPassword(auth,email, password);
        }catch (e : any){
            console.log(e);
            return handleFirebaseAuthError(e)
        }
    })

}




const handleFirebaseAuthError = (error:any) => {
    let errorMessage = "";
    switch (error.code) {
        case "auth/invalid-email":
            errorMessage = "유효하지 않은 이메일 주소입니다.";
            break;
        case "auth/user-disabled":
            errorMessage = "사용이 비활성화된 계정입니다.";
            break;
        case "auth/user-not-found":
            errorMessage = "사용자를 찾을 수 없습니다.";
            break;
        case "auth/wrong-password":
            errorMessage = "잘못된 비밀번호입니다.";
            break;
        case "auth/email-already-in-use":
            errorMessage = "이미 사용 중인 이메일 주소입니다.";
            break;
        case "auth/operation-not-allowed":
            errorMessage = "허용되지 않은 작업입니다.";
            break;
        case "auth/weak-password":
            errorMessage = "약한 비밀번호입니다.";
            break;
        case "auth/requires-recent-login":
            errorMessage = "보안을 위해 최근에 로그인한 사용자만 이 작업을 수행할 수 있습니다.";
            break;
        default:
            errorMessage = "알 수 없는 오류가 발생했습니다.";
            break;
    }
    return {error:errorMessage};
}
