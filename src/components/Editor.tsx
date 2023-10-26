import React, {createRef} from "react";

export const Editor = (props: {isEditable: boolean | any}) => {
    if(!props.isEditable) return null;
    const container = createRef<HTMLDivElement>();

    function onPencilClick(e: React.MouseEvent<HTMLDivElement>){
        container.current!.style.display = "flex";
    }

    function handleButton(e: React.MouseEvent<HTMLButtonElement>){
        let newData = {};

        const inputs = document.getElementsByTagName("input");
        for (const input of inputs){
            if(input.value) {
                Object.assign(newData, JSON.parse(`{"${input.id}": "${input.value}"}`))
            }
        }

        console.log(newData);
    }

    return (
        <div id="editor-container">
            <div id="edit-logo" onClick={onPencilClick}>
                <img src="/assets/pencil-svgrepo-com.svg" alt="pencil-icon"/>
            </div>
            <div id="editing-container" ref={container}>
                <h2>Edit Information</h2>
                <label htmlFor="username" id="username">Username</label>
                <input id="username"/>
                <label htmlFor="about-me" id="aboutMe">About Me</label>
                <input id="about-me"/>
                <br></br>
                <button type="submit" onClick={handleButton}>Edit</button>
            </div>

        </div>

    )
}