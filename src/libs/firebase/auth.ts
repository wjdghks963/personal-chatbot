import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    onAuthStateChanged,
    setPersistence,
    signInAnonymously,
    signInWithEmailAndPassword, signInWithPopup,
    signInWithRedirect
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

export const signInWithAnonymous = async ( )=>{
    try{
        return await signInAnonymously(auth);
    }catch (e:any){
        console.log(e);
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
        return await auth.currentUser?.delete();
    }catch (e:any){
        console.log(e)
        return {error:e};
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
        return {error:e};
    }
}

export const signInWithEmailPassword = async (email:string, password:string) =>{

    return setPersistence(auth, browserLocalPersistence).then(async()=>{
        try{
            return await signInWithEmailAndPassword(auth,email, password);
        }catch (error : any){
            console.log(error);
            return {error:error};
        }
    })

}
