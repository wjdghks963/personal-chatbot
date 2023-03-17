import {SettingDataJson} from "../../type";

interface ApiFetch<G> {
    url:string,
    json:G,
}

export default async function fetchPost<T, G>(params: ApiFetch<G>){
    try {
        const response = await fetch(`/api/${params.url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params.json),
        });

        const data = await response.json();

        if (response.status !== 200) {
            throw data.error || new Error(`Request failed with status ${response.status}`);
        }

        return data as T

    }catch(error:any) {
        console.error(error);
        alert(error.message);
    }


}