import {useRouter} from "next/router";
import { useState} from "react";
import {useDispatch} from "react-redux";
import {setToggle} from "../../store/modules/clearChats";
import {auth} from "../libs/firebase/auth";

export default function NavBar(){
    const router = useRouter();
    const nowLocation = router.pathname;
    const [isMenuBarOpen, setIsMenubarOpen] = useState<boolean | null>(null);

    const dispatch = useDispatch();


    const goToPath = (path:string) => {
        if(auth.currentUser === null) return;
        if(nowLocation !== path){
            return router.push(`${path}`);
        }else{
            return;
        }
    }

    const clearChats = () =>{
        localStorage.removeItem('previousChats');
        dispatch(setToggle())
        setIsMenubarOpen(pre=>!pre)
        return
    }

    const toggleMenuBar = () => {
        setIsMenubarOpen(pre=>{if(pre===null) {return true} return !pre})
    }


    return (
        <div className={'relative '}>
            <nav className="flex w-full items-center justify-between flex-wrap bg-blue-500 p-3 z-2">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <svg className={'h-8 w-8 mr-2'} fill="white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"></path>
                    </svg>


                    <span className="font-semibold text-xl tracking-tight">OA</span>
                </div>
                <div className="block" onClick={toggleMenuBar}>
                    <button
                        className="flex items-center px-3 py-2 border rounded border-white text-white hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                        </svg>
                    </button>
                </div>
            </nav>
            <div className={`w-1/3 absolute pb-5 px-3 right-0 z-20 bg-blue-500 transition-all origin-right ${isMenuBarOpen === null && 'hidden' } ${isMenuBarOpen ? 'animate-slideOpenAnim' : 'animate-slideCloseAnim'} text-white hover:text-white`}>
                <div className="text-sm pl-3 space-y-7 ">
                    <div onClick={()=>goToPath('/chat')} className={`gap-2 cursor-pointer flex mt-4 text-blue-200 hover:text-white mr-4`}>
                        <svg className={`w-6`} fill="white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"></path>
                        </svg>
                        <span className={`text-center font-semibold`}>채팅</span>
                    </div>
                    <div onClick={()=>clearChats()} className={`gap-2 cursor-pointer flex text-blue-200 hover:text-white mr-4`}>
                        <svg className={'w-6'} fill="white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                        </svg>
                        <span className={`text-center font-semibold`}>지우기</span>
                    </div>
                    <div onClick={()=>goToPath('/user/profile')} className={`gap-2 cursor-pointer flex text-blue-200 hover:text-white mr-4`}>
                        <svg className={'w-6'} fill="white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                        </svg>
                        <span className={`text-center font-semibold`}>프로필</span>
                    </div>
                    <div onClick={()=>goToPath('/information-info')} className={`gap-2 cursor-pointer flex text-blue-200 hover:text-white mr-4`}>
                        <svg className={'w-6'} fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
                        </svg>
                        <span className={`text-center font-semibold`}>정보 및 문제</span>
                    </div>

                </div>
            </div>
        </div>

    )
}
