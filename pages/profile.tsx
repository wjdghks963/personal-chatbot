import {useEffect, useState} from "react";
import {auth, logout} from '../src/libs/firebase/auth';
import NavBarLayout from "../src/components/NavBarLayout";
import {onAuthStateChanged} from "firebase/auth";
import { SignIn } from "../src/components/user/SignIn";
import {getSetting} from "../src/libs/firebase/firestorage";
import SettingForm from "../src/components/SettingForm";
import {SettingDataJson} from "../type";


export default  function Profile(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!auth.currentUser);
    const [formToggle,setFormToggle] = useState<boolean>(false);
    const [name, setName] = useState('유저');

    const getSettingUserName = async () =>{
        const localSettingData:SettingDataJson | ""= JSON.parse(localStorage.getItem('settingDataJson') ?? '{}');

        if(auth.currentUser){
           try{
               const result= await getSetting(auth.currentUser?.email ?? '');
               if(result?.userName === "") {
                   setName(auth.currentUser.displayName!)
               }else{
                   setName(result?.userName);
               }
           }catch (e:any){
               // @ts-ignore
               setName(localSettingData.userName ?? "유저");
           }
        }

    }


    useEffect( ()=>{
        onAuthStateChanged(auth, user=>{
            if(user){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false)
            }
        })
        getSettingUserName();
    },[auth.currentUser, isLoggedIn,name])

    return(

    <NavBarLayout>
        {formToggle && <SettingForm setFormToggle={setFormToggle}/>}
            <div className={`flex w-full h-full ${formToggle ? 'popupOpen' : null} `}>
                {!isLoggedIn ? <SignIn/> : (
                    <div className={`w-full flex-col space-y-36 text-center flex-grow my-32 `}>
                        <div className={'flex-col flex-none'}>
                            <span className={`block font-semibold`}>{name}</span>
                            <span className={`block font-semibold`}>{auth.currentUser?.email}</span>
                        </div>
                        <div className={'flex-col space-y-3'}>
                            <span className={'block border-blue mx-auto p-3 hover:text-white hover:bg-blue-500 w-1/3'} onClick={()=>setFormToggle(true)}>설정</span>
                            <button className={'block border-blue mx-auto p-3 hover:text-white hover:bg-blue-500 w-1/3'} onClick={logout}>로그아웃</button>
                        </div>
                    </div>
                    )}
            </div>
    </NavBarLayout>
    )
}

