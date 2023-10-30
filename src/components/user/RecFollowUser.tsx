export const RecFollowUser = (props: {username: string, aboutMe: string, avatarURL: string, id: string}) => {
    function handleClick(){
        window.location.replace(`/user/${props.id}`)
    }

    return (
        <div id={`recommended-user-${props.id}`} className="recommended-user">
            <div className="recommended-user-data" onClick={handleClick}>
                <img src={props.avatarURL} alt="profile-picture" className="recommended-user-avatar"/>
                <div className="flex-col flex">
                    <p className="recommended-username"><span className="recommended-user-symbol">@</span>{props.username}</p>
                    <p className="recommended-user-aboutMe">{props.aboutMe}</p>
                </div>
            </div>
            <div className="recommended-user-buttons">
                <button className="recommended-user-follow">Follow</button>
                <button className="recommended-user-ignore">Ignore</button>
            </div>
        </div>
    )
}
