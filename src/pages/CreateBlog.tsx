import {useEffect, useState} from "react";
import {getToken} from "../utils/auth";

export const CreateBlog = () => {

    useEffect(() => {
        if(!getToken() || !localStorage.getItem("id")){
            return window.location.replace("/login")
        }
    }, []);


    return(
        <div id="create-blog">
            <h1>Create a Blog!</h1>
            <input id="blog-image" type="file" accept="image/*"/>
        </div>
    )
}
