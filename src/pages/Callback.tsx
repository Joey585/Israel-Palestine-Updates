import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import core from "../api/core";
import config from "../config.json";

export const Callback  = () => {
    const [searchParams] = useSearchParams();
    const [code, setCode] = useState(null);

    useEffect(() => {
        core.post(`/auth`, {code: searchParams.get("code"), local: config.dev}).then((res) => {
            setCode(res.data.access_token);
            localStorage.setItem("access_token", res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
        }).catch(() => {
            window.location.replace("/login")
        })
    }, [searchParams]);

    useEffect(() => {
        /*
        token format =
        id . nonce . date.now
        encoded in base 64 for each section
        nonce = random letter and number 6 long

         */

        if(code !== null){
            core.get(`/verify?accessToken=${code}`).then((data) => {
                if(data.data.code !== 200) return;
                localStorage.setItem("token", data.data.token);
                console.log(data.data)
                // window.location.replace("/user/" + data.data.id);
            });
        }
    }, [code]);


    return(
        <div>
            <p id="status">Logging in...</p>
        </div>
    )

}
