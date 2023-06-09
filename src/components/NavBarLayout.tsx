import NavBar from "./NavBar";
import React, {useEffect, useState} from "react";
import SEO from "./SEO/Head";
import {isWebView} from "../utils/MobileBridge";
import {useRouter} from "next/router";
import { webViewRouteType} from "../../type";
import {auth} from "../libs/firebase/auth";
import {setClearChatToggle} from "../../store/modules/ClearChatsSlice";
import {useDispatch} from "react-redux";

export default function NavBarLayout({children, styleAdd}:{children:React.ReactNode, styleAdd?:string}){
    const router = useRouter();
    const isMobile = typeof window !== 'undefined' ? isWebView() : false;
    const dispatch = useDispatch();

    useEffect(()=>{
        isMobile  ? (window as any).webviewNav = function(data:webViewRouteType) {
            switch (data){
                    case '': {
                        return router.push(`/${data}`);
                    }
                    case 'profile':{
                        return router.push(`/user/${data}`);
                    }
                    case 'information-info' :{
                        return router.push(`/information/${data}`)
                    }
                    case 'chat' : {
                        if(auth.currentUser !== null) {
                            return router.push(`/${data}`);
                        }else{
                            return false;
                        }
                    }
                    case 'delete' :{
                        localStorage.removeItem('previousChats');
                        return dispatch(setClearChatToggle())
                    }
                }


        } : null

    },[])


    return (
        <>
        <SEO title={'OA'}/>
        <main className={`h-screen flex flex-col`}>
            {isMobile ? null: <NavBar/>}
            <div className={`max-h-screen flex-1 flex justify-center ${styleAdd}`}>
                {children}
            </div>
        </main>
        </>)
}
