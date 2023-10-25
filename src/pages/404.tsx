import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const Error404 = () => {
    const [searchParams] = useSearchParams();
    const [errorCode, setError] = useState<any>("");

    useEffect(() => {
        setError(searchParams.get("e"));
    }, [searchParams]);

    return(
        <div>
            <h2>Whoops! 404 Error!</h2>
            <h4>Couldn't find the selected resource</h4>
            <p>Error: {errorCode ? errorCode : "Not Defined"}</p>
        </div>
    )
}
