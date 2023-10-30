export const NavBar = (props: {joinDate: string}) => {
    return(
        <div id="navbar-user">
            <div id="navbar-list">
                <a href="/src/pages" className="nav-link">Home</a>
                <a href="/map" className="nav-link">Map</a>
                <a href="/updates" className="nav-link">Live Updates </a>
                <p id="join-date">Joined {props.joinDate}</p>

            </div>
            <div id="separator-nav"></div>
        </div>


    )
}
