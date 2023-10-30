import {NavBar} from "./NavBar";
import {format} from "date-fns";
import {RecFollowContainer} from "./RecFollowContainer";
import {BlogContainer} from "./BlogContainer";

export const User = (props: {
    username: string,
    avatarURL: string,
    followers: Number,
    following: Number,
    aboutMe: string,
    isEditable: boolean,
    dateJoined: number,
    recUsers: Array<{username: string, aboutMe: string, avatarURL: string, id: string}>,
    blogs: Array<{imageURL: string, title: string, description: string, likes: number, dislikes: number, timestamp: number, id: string}>
}) => {
    if(props.isEditable){
        return (
            <div id="user">
                <NavBar joinDate={format(props.dateJoined, "MMMM d, yyyy")}></NavBar>
                <div id="user-header">
                    <div id="user-data">
                        <img src={props.avatarURL} id="avatar" alt="avatar"/>
                        <div id="stats">
                            <p id="username"><span className="symbol">@</span>{props.username}</p>
                            <div id="followers">
                                <p className="follow-label"><span className="follower-number">{props.followers.toString()}</span> Followers</p>
                                <p className="follow-label"><span className="follower-number">{props.following.toString()}</span> Following</p>
                            </div>
                        </div>
                        <p id="about-me">{props.aboutMe}</p>
                    </div>
                    <RecFollowContainer users={props.recUsers}></RecFollowContainer>
                </div>
                <div className="flex-row">
                    <BlogContainer blogs={props.blogs}></BlogContainer>
                </div>


            </div>
        )
    }
    return (
        <p>Hey buddy, this isn't your account!</p>
    )
}
