import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import core from "../api/core";
import {getToken} from "../utils/auth";
import "../css/user.css";
import {format} from "date-fns";

export const User = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(!id) return window.location.replace("/404?e=User does not exist!");
        if(!getToken()) return window.location.replace("/login");
        core.get("/user?id=" + id, {headers: {Authorization: `${getToken()}`}}).then((data) => {
            setUserData(data.data);
            setLoading(false);
        });
    }, [id]);

    if(loading){
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        )
    }

    return(
        <div>
            <div id="header">
                <img src={userData.avatarURL} className="avatar" alt="avatar"/>
                <p id="username"><span className="symbol">@</span>{userData.username}</p>
            </div>
            <div id="body">
                <p id="about-me">{userData.aboutMe}</p>
                <p>Joined {format(userData.dateJoined, "MMM d, yyyy")}</p>
            </div>

        </div>
    )
}
