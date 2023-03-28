import {
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    onAuthStateChanged,
    setPersistence,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithRedirect
} from "firebase/auth";
import {FireBaseApp} from "./Firebase"

export const auth = getAuth(FireBaseApp);

const GoogleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () =>{
   //await signInWithRedirect(auth, GoogleProvider);

    return setPersistence(auth, browserLocalPersistence).then(async()=>{
        try{
            // const result = await signInWithPopup(auth, GoogleProvider)
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const user = result?.user;
            // const idToken = credential?.idToken
            //
            // return {user, idToken}
            await signInWithRedirect(auth, GoogleProvider);
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

export const withDrawalUser =  () =>{
    return auth.currentUser?.delete()
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
    try{
       return await signInWithEmailAndPassword(auth,email, password);
    }catch (e:any){
        console.log(e);
        return {error:e};
    }
}
