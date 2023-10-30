import {RecFollowUser} from "./RecFollowUser";

export const RecFollowContainer = (props: {users: Array<{username: string, aboutMe: string, avatarURL: string, id: string}>}) => {
    return (
        <div id="RecFollowContainer">
            {props.users.map((value, idx) => (
                <RecFollowUser username={value.username} aboutMe={value.aboutMe} avatarURL={value.avatarURL} id={value.id} key={idx}></RecFollowUser>
            ))}
        </div>
    )
}
