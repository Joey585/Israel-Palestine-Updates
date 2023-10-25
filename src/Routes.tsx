import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {InteractiveMap} from "./pages/InteractiveMap";
import App from "./App";
import {Login} from "./pages/Login";
import {Callback} from "./pages/Callback";
import {Error404} from "./pages/404";
import {User} from "./pages/User";

export const Pages = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/map" element={<InteractiveMap/>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/callback" element={<Callback></Callback>}/>
                <Route path="/404" element={<Error404/>}/>
                <Route path="/user/:id" element={<User></User>}></Route>
            </Routes>
        </Router>
    )
}
