import {
    getAuth,
    GoogleAuthProvider,
    getRedirectResult, signInWithPopup,
    onAuthStateChanged,  browserLocalPersistence, setPersistence,
    signInAnonymously
} from "firebase/auth";
import {FireBaseApp} from "./Firebase"

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

            return {errorCode, errorMessage}
        }
    })

}

export const signInWithGoogleResult = async ()=>{
    try{
        const result = await getRedirectResult(auth);

        if (result) {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result?.user;
            return {user, token}
        }

    }catch (error : any){
        const errorCode = error.code;
        const errorMessage = error.message;

        return {errorCode, errorMessage}
    }
}


export const signInWithAnonymous = async ( )=>{
    try{
        await signInAnonymously(auth);
    }catch (e:any){
        console.log(e);
    }
}

export const signAnonymousToGooglePermanent =  (idToken:string) =>{

    return GoogleAuthProvider.credential(idToken);
}

export const logout = () =>{
    if(auth.currentUser?.isAnonymous){
        return auth.currentUser.delete();
    }
    return auth.signOut();
}

export const withDrawalUser =  () =>{
    return auth.currentUser?.delete()
}

export const isAuthLoggedIn = () =>{
     onAuthStateChanged(auth, (user)=>{
        return user;
    })
}
