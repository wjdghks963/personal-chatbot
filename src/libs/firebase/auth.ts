import {
    getAuth,
    GoogleAuthProvider,
    getRedirectResult, signInWithPopup,
    signOut, onAuthStateChanged, User
} from "firebase/auth";
import {FireBaseApp} from "./Firebase"

export const auth = getAuth(FireBaseApp);
const GoogleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () =>{
   //await signInWithRedirect(auth, GoogleProvider);

    try{
        const result = await signInWithPopup(auth, GoogleProvider)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result?.user;

        localStorage.setItem("userEmail", JSON.stringify(user?.email))

        return {user, token}
    }catch (error : any){
        const errorCode = error.code;
        const errorMessage = error.message;

        return {errorCode, errorMessage}
    }
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



export const logout = () =>{
    return auth.signOut();
}

export const isAuthLoggedIn = () =>{
     onAuthStateChanged(auth, (user)=>{
        return user;
    })
}

// const actionCodeSettings = {
//     url: 'https://personal-chat-ba010.firebaseapp.com',
//     iOS:{
//         bundleId:'com.learnopenai.ios'
//     },
//     android:{
//         packageName:'com.learnopenai.android',
//         installApp:true,
//         minimumVersion: '12'
//     },
//     handleCodeInApp: true,
//     dynamicLinkDomain: "learnopenai.page.link"
// }
//
// export const loginWithExistEmail = async (email:string) =>{
//     await sendSignInLinkToEmail(auth, email, actionCodeSettings);
// }

