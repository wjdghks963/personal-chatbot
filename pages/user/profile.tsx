import {useEffect, useState} from "react";
import {auth, logout} from '../../src/libs/firebase/auth';
import NavBarLayout from "../../src/components/NavBarLayout";
import {onAuthStateChanged} from "firebase/auth";
import { SignIn } from "../../src/components/user/SignIn";
import {getSetting} from "../../src/libs/firebase/firestorage";
import SettingForm from "../../src/components/SettingForm";
import temporaryJson from "../../src/assets/settingDataJson.json"
import IsLoggedInSpan from "../../src/components/user/IsLoggedInSpan";
import {getSettingDataJson, setSettingDataJson} from "../../src/utils/localStorage";
import {ReduxSliceState, SettingDataJson} from "../../type"
import AlertDialog from "../../src/components/AlertDialog";
import {useSelector} from "react-redux";

export default  function Profile(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!auth.currentUser);
    const [formToggle,setFormToggle] = useState<boolean>(false);
    // @ts-ignore
    const [data, setData] = useState<SettingDataJson>(temporaryJson);

    const alertDialogSelector= useSelector((state:ReduxSliceState) => state.alertDialogReducer);
    let isAlertDialogOpen = alertDialogSelector.alertName === "익명 로그인" && alertDialogSelector.toggle;


    const getAuthSettingData = async (email:string|null) => {
        try{
            const settingData = await getSetting(email ?? "");
            if(settingData?.userName === "") {
                setData(prev=>({...prev, userName:auth.currentUser?.displayName!}));
            }else{
                setData(prev=>({...prev, userName:settingData?.userName}));
            }
            if(settingData === undefined) return temporaryJson
            return settingData
        } catch (e:any){
            console.log(e)
            setData(prev=>({...prev, userName:"유저"}));
            return temporaryJson
        }

    }


    useEffect( ()=>{
        onAuthStateChanged(auth, user=>{
            if(user){
                setFormToggle(true)
                if(!user.isAnonymous){
                    getAuthSettingData(user.email).then(settingData=>{
                        setSettingDataJson(settingData);
                    })
                }
                return setIsLoggedIn(true);
            }else{
                return setIsLoggedIn(false)
            }
        })
    },[auth.currentUser, isLoggedIn])

    useEffect(()=>{
        const localData = getSettingDataJson();
        setData(localData);
    },[formToggle])

    return(

    <NavBarLayout styleAdd={'flex-col items-center justify-center'}>
        { isAlertDialogOpen ? <AlertDialog okText={"확인"} falseText={"취소"} text={"익명 로그인은 미접속 7일 후 계정이 삭제됩니다."}/> : null}
        {formToggle && <SettingForm setFormToggle={setFormToggle}/>}
            <div className={`flex w-full h-full ${formToggle ? 'popupOpen' : null} `}>
                {!isLoggedIn ? <SignIn/> : (
                    <div className={`w-full flex-col space-y-12 text-center flex-grow my-32 `}>
                        <div className={'flex-col flex-none space-y-3'}>
                            <span className={`block font-semibold`}>내 이름은 {data.userName}</span>
                            <span className={`block font-semibold`}>AI의 이름은 {data.aiName}</span>
                            <span className={`block font-semibold`}>AI의 역할은 {data.concepts}</span>
                            <IsLoggedInSpan/>
                        </div>
                        <div className={'flex-col space-y-3'}>
                            <span className={'block border-blue mx-auto p-3 hover:text-white hover:bg-blue-500 w-1/3'} onClick={()=>setFormToggle(true)}>설정</span>
                            <button className={'block border-blue mx-auto p-3 hover:text-white hover:bg-blue-500 w-1/3'} onClick={logout}>로그아웃</button>
                        </div>
                    </div>
                    )}
            </div>
        <span className={`block w-full text-center mx-10 text-slate-400 pb-3 ${formToggle ? 'popupOpen' : null}`}>
            도움이 필요하시다면 chsw000@gmail.com 로 연락해주세요
        </span>
    </NavBarLayout>
    )
}

