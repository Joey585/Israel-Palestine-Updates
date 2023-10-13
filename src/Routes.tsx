import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {InteractiveMap} from "./pages/InteractiveMap";
import App from "./App";

export const Pages = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/map" element={<InteractiveMap/>}></Route>
            </Routes>
        </Router>
    )
}
