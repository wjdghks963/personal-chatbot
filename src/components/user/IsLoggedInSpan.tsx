import {auth, withDrawlUser} from "../../libs/firebase/auth";
import {drawlUserDeleteSettingData} from "../../libs/firebase/firestorage";

export default function IsLoggedInSpan(){

    const withDrawlOnClick =  () =>{
        const result = withDrawlUser();
        console.log(result);
    }

    return (
        <div className={'flex-col space-y-12'}>
            <span className={`block font-semibold mt-8`}>{auth.currentUser?.email}</span>
            <span onClick={withDrawlOnClick} className={`block flex-end text-red-400 w-1/3 py-3 mx-auto`}>탈퇴하기</span>
        </div>
    )
}
