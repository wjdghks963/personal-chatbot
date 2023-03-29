import {useEffect, useState} from "react";
import {auth, logout} from '../../src/libs/firebase/auth';
import NavBarLayout from "../../src/components/NavBarLayout";
import {onAuthStateChanged} from "firebase/auth";
import { SignIn } from "../../src/components/user/SignIn";
import {getSetting} from "../../src/libs/firebase/firestorage";
import SettingForm from "../../src/components/SettingForm";
import temporaryJson from "../../src/assets/settingDataJson.json"
import IsLoggedInSpan from "../../src/components/user/IsLoggedInSpan";

export default  function Profile(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!auth.currentUser);
    const [formToggle,setFormToggle] = useState<boolean>(false);
    const [name, setName] = useState('유저');




    const getAuthSettingData = async (email:string|null) => {
        try{
            const settingData = await getSetting(email ?? "");
            if(settingData?.userName === "") {
                setName(auth.currentUser?.displayName!)
            }
            if(settingData === undefined) return temporaryJson
        return settingData
        } catch (e:any){
            console.log(e)
            setName("유저")
            return temporaryJson
        }

    }


    useEffect( ()=>{

        onAuthStateChanged(auth, user=>{
            if(user){
                if(user.isAnonymous){
                    setName('익명')
                    localStorage.setItem('settingDataJson', JSON.stringify(temporaryJson));
                }else{
                    getAuthSettingData(user.email).then(settingData=>{
                        const json = JSON.stringify(settingData)
                         localStorage.setItem('settingDataJson',json)
                    })
                }
                return setIsLoggedIn(true);
            }else{
                return setIsLoggedIn(false)
            }
        })
    },[auth.currentUser, isLoggedIn,name])

    return(

    <NavBarLayout styleAdd={'flex-col items-center justify-center'}>
        {formToggle && <SettingForm setFormToggle={setFormToggle}/>}
            <div className={`flex w-full h-full ${formToggle ? 'popupOpen' : null} `}>
                {!isLoggedIn ? <SignIn/> : (
                    <div className={`w-full flex-col space-y-12 text-center flex-grow my-32 `}>
                        <div className={'flex-col flex-none'}>
                            <span className={`block font-semibold`}>{name}</span>
                            {/*{isAnonymous ? <Link href={'/sign-in'}><span className={'block mt-3'}>가입하기</span></Link> : <span className={`block font-semibold`}>{auth.currentUser?.email}</span>}*/}
                            <IsLoggedInSpan/>
                        </div>
                        <div className={'flex-col space-y-3'}>
                            <span className={'block border-blue mx-auto p-3 hover:text-white hover:bg-blue-500 w-1/3'} onClick={()=>setFormToggle(true)}>설정</span>
                            <button className={'block border-blue mx-auto p-3 hover:text-white hover:bg-blue-500 w-1/3'} onClick={logout}>로그아웃</button>
                        </div>
                    </div>
                    )}
            </div>
        <span className={`block text-center mx-10 text-slate-400 mb-3`}>
            도움이 필요하시다면 chsw000@gmail.com 로 연락해주세요
        </span>
    </NavBarLayout>
    )
}

