import temporaryJson from "../assets/settingDataJson.json";

export const getSettingDataJson = () =>{
    return JSON.parse(localStorage.getItem('settingDataJson') ?? JSON.stringify(temporaryJson))
}
export const setSettingDataJson = (json:any) =>{
    return localStorage.setItem('settingDataJson', JSON.stringify(json));
}
