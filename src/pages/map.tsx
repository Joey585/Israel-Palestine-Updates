import React from "react";
import ReactDOM from "react-dom/client";
import {InteractiveMap} from "./InteractiveMap";

const map = ReactDOM.createRoot(document.getElementById("map") as HTMLElement)

map.render(
    <React.StrictMode>
        <InteractiveMap></InteractiveMap>
    </React.StrictMode>
);
