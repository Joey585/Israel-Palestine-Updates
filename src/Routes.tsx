import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {InteractiveMap} from "./pages/InteractiveMap";
import App from "./App";
import {Login} from "./pages/Login";
import {Callback} from "./pages/Callback";
import {Error404} from "./pages/404";
import {UserPage} from "./pages/UserPage";
import {CreateBlog} from "./pages/CreateBlog";

export const Pages = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/map" element={<InteractiveMap/>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/callback" element={<Callback></Callback>}/>
                <Route path="/404" element={<Error404/>}/>
                <Route path="/user/:id" element={<UserPage></UserPage>}></Route>
                <Route path="/create/blog" element={<CreateBlog></CreateBlog>}></Route>
            </Routes>
        </Router>
    )
}
