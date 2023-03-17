import {useEffect, useState} from "react";
import {auth, logout} from '../src/libs/firebase/auth';
import NavBarLayout from "../src/components/NavBarLayout";
import {onAuthStateChanged} from "firebase/auth";
import { SignIn } from "../src/components/user/SignIn";
import {getSetting} from "../src/libs/firebase/firestorage";
import {SettingDataJson} from "../type";
import SettingForm from "../src/components/SettingForm";


export default  function Profile(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!auth.currentUser);
    const [formToggle,setFormToggle] = useState<boolean>(false);
    const [name, setName] = useState('유저');

    const getSettingUserName =  () =>{
        if (!auth.currentUser) return;
        return getSetting(auth.currentUser?.email as string).then((json)=> setName(json?.userName ?? auth.currentUser?.displayName)
        );
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

    const test = () =>{
        fetch('http://localhost:3000/api/setting').then(e=>e)
    }
    console.log(test())

    return(

    <NavBarLayout>
            <div className={`flex justify-center w-full`}>
                {formToggle && <SettingForm setFormToggle={setFormToggle}/>}
                {!isLoggedIn ? <SignIn/> : (
                    <div className={`w-full h-[100vh] ${formToggle ? 'popupOpen' : null}`}>
                        <span className={`block`}>{name}</span>
                        <span className={`block`}>{name}</span>
                        <span className={`block`}>{name}</span>
                        <span className={`block`}>{name}</span>

                        <span onClick={()=>setFormToggle(true)}>설정</span>
                        <button className={'border-blue p-3 hover:text-white hover:bg-blue-500'} onClick={logout}>로그아웃</button>
                    </div>
                    )}
            </div>
    </NavBarLayout>
    )
}

