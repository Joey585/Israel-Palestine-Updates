import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import core from "../api/core";
import {getToken} from "../utils/auth";
import "../css/user.css";
import {User} from "../components/user/User";

export const UserPage = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(!id) return window.location.replace("/404?e=User does not exist!");
        if(!getToken()) return window.location.replace("/login");
        core.get("/user?id=" + id, {headers: {Authorization: `${getToken()}`}}).then((data) => {
            console.log(data.data);
            setUserData(data.data);
            setLoading(false);
        }).catch(() => {
            return window.location.replace("/404?e=User does not exist!");
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
        <User
            username={userData.username}
            avatarURL={userData.avatarURL}
            followers={userData.stats.followers}
            following={userData.stats.following}
            aboutMe={userData.aboutMe}
            isEditable={userData.isEditable}
            dateJoined={userData.dateJoined}
            recUsers={[{username: "joey586", aboutMe: "I am the sauce master", id: "82124730", avatarURL: "https://cdn.discordapp.com/avatars/811477909985558608/fde77e8ef0617e1bf6a6d8239585e68b.webp?size=160"}]}
            blogs={[]}></User>
    )
}
