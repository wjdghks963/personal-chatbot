import {auth, withDrawalUser} from "../../libs/firebase/auth";

export default function IsLoggedInSpan(){

    const withDrawlOnClick = () =>{

        withDrawalUser()
    }

    return (
        <div className={'flex-col space-y-12'}>
            <span className={`block font-semibold mt-8`}>{auth.currentUser?.email}</span>
            <span onClick={withDrawlOnClick} className={`block flex-end text-red-400 w-1/3 py-3 mx-auto`}>탈퇴하기</span>
        </div>
    )
}