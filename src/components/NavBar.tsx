import {useRouter} from "next/router";
import { useState} from "react";

export default function NavBar(){
    const router = useRouter();
    const nowLocation = router.pathname;
    const [isMenuBarOpen, setIsMenubarOpen] = useState<boolean | null>(null);

    const goToPath = (path:string) => {
        if(nowLocation !== path){
            return router.push(`${path}`);
        }else{
            return;
        }
    }

    const toggleMenuBar = () => {
        setIsMenubarOpen(pre=>{if(pre===null) {return true} return !pre})
    }



    return (
        <>
            <nav className="flex relative w-full items-center justify-between flex-wrap bg-blue-500 p-3 z-2">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
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
            <div className={`w-1/3 absolute px-3 h-full right-0 z-20 bg-blue-500 transition-all origin-right ${isMenuBarOpen === null && 'hidden' } ${isMenuBarOpen ? 'animate-slideOpenAnim' : 'animate-slideCloseAnim'} text-white hover:text-white`}>
                <div className="text-sm pl-3 space-y-7 ">
                    <div onClick={()=>goToPath('/chat')} className={`gap-2 cursor-pointer flex mt-4 text-blue-200 hover:text-white mr-4`}>
                        <svg className={`w-6`} fill="white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"></path>
                        </svg>
                        <span className={`text-center font-semibold`}>채팅</span>
                    </div>
                    <div onClick={()=>goToPath('/profile')} className={`gap-2 cursor-pointer flex text-blue-200 hover:text-white mr-4`}>
                        <svg className={'w-6'} fill="white" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                        </svg>
                        <span className={`text-center font-semibold`}>프로필</span>
                    </div>
                </div>
            </div>
        </>

    )
}