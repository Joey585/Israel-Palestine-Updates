import "../css/login.css";
import core from "../api/core";
import config from "../config.json";

export const Login = () => {

    async function onClick(){
        core.get(`/oauth2?type=${config.dev ? "local" : "external"}`, {headers: {"Accept": "*/*",}}).then((res: any) => {
            window.location.href = res.data.d;
        }).catch((e) => {console.error(e)})
    }

    return(
        <div id="container">
            <div id="navbar">
                <ul>
                    <img src="/assets/logo.png" alt="logo"/>
                    <li className="link-nav">Home</li>
                    <li className="link-nav">Blogs</li>
                    <li className="link-nav">Map</li>
                </ul>
            </div>
            <div id="login-panel">
                <p>In order to login to post blog posts and updates, you have to login with discord!</p>
                <button onClick={onClick}> Login with discord</button>
            </div>
        </div>
    )
}
