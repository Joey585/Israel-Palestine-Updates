import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {InteractiveMap} from "./pages/InteractiveMap";
import App from "./App";
import {Login} from "./pages/Login";
import {Callback} from "./pages/Callback";

export const Pages = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/map" element={<InteractiveMap/>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/callback" element={<Callback></Callback>}/>
            </Routes>
        </Router>
    )
}
