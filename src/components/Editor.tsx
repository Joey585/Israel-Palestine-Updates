import React, {createRef} from "react";
import core from "../api/core";
import {getToken} from "../utils/auth";

export const Editor = (props: {isEditable: boolean | any}) => {
    if(!props.isEditable) return null;
    const container = createRef<HTMLDivElement>();

    function onPencilClick(e: React.MouseEvent<HTMLDivElement>){
        if(container.current?.style.display === "flex"){
            container.current!.style.display = "none";
            document.body.style.backgroundColor = "white";
            document.getElementById("avatar")!.style.filter = "brightness(100%)";
            return;
        }

        container.current!.style.display = "flex";
        document.body.style.backgroundColor = "grey";
        document.getElementById("avatar")!.style.filter = "brightness(50%)";
    }

    function handleButton(e: React.MouseEvent<HTMLButtonElement>){
        let newData = {};

        const inputs = document.getElementsByTagName("input");
        for (const input of inputs){
            if(input.value) {
                Object.assign(newData, JSON.parse(`{"${input.id}": "${input.value}"}`))
            }
        }

        core.post("/edit-user", {id: localStorage.getItem("id"), d: newData}, {headers: {Authorization: getToken()}}).then((r) => {
            if(r.data === 200){
                window.location.reload();
            }
        }).catch((reason) => {
            console.log(reason)
            // window.location.replace("/login");
        });
    }

    return (
        <div id="editor-container">
            <div id="edit-logo" onClick={onPencilClick}>
                <img src="/assets/pencil-svgrepo-com.svg" alt="pencil-icon"/>
            </div>
            <div id="editing-container" ref={container}>
                <h2>Edit Information</h2>
                <label htmlFor="username">Username</label>
                <input id="username"/>
                <label htmlFor="aboutMe">About Me</label>
                <input id="aboutMe"/>
                <br></br>
                <button type="submit" onClick={handleButton}>Edit</button>
            </div>

        </div>

    )
}
