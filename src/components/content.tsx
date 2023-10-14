import React, {useEffect, useRef, useState} from "react";
import {format} from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Content = (props: {announcement: string, images: Array<string>, author: string, timestamp: number, idx: number, id: string}) => {
    interface contentObj {
        header: string,
        content: string,
        images: Array<string>
    }


    const [allContent, setContent] = useState<contentObj | null>(null);
    const [isLoading, setLoading] = useState(true);
    const componentRef = useRef<any>(null);


    function parseContent(props: {announcement: string, images: Array<string>, author: string, timestamp: number, idx: number, id: string}){
        const matches = [...props.announcement.matchAll(/# (.+)|(.+)/g)];

        let contentArr: Array<string> = [];

        for(const match of matches){
            if(!match[0].includes("#")){
                contentArr.push(match[0]);
            }
        }

        setContent({header: matches[0] ? matches[0][1] : contentArr[0], content: contentArr.join("\n"), images: props.images.length > 0 ? props.images : []})
        setLoading(false)
    }

    useEffect(() => {
        parseContent(props)
    }, [props])





    if(isLoading){
        return (
            <p></p>
        )
    }

    function handleClick(e: React.MouseEvent<HTMLParagraphElement>,props: {announcement: string, images: Array<string>, author: string, timestamp: number, idx: number, id: string}){
        const children = document.getElementById("announcement-container")!.children;
        for(const child of children){
            const result = child.querySelector(".moreContent")
            if(result){
                result.id !== props.id.concat("-content") ? result.className = "hide moreContent" : result.className = "shown moreContent"
            }
        }
    }



    return (
        <div className="announcement bg-green-50 border-8 border-amber-50" key={props.idx} id={props.id}>
            <div className="header">
                <h3 className="author">{props.author}:</h3>
                <span className="timestamp">{format(props.timestamp, "MM/dd HH:mm")}</span>
            </div>
            <div onClick={(e) => handleClick(e, props)} className="headline">
                <ReactMarkdown>{allContent!.header ? allContent!.header : "No Headline"}</ReactMarkdown>
            </div>
            <div id={props.id.concat("-content")} ref={componentRef} className="moreContent hidden">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{allContent!.content ? allContent!.content : "No more message"}</ReactMarkdown>
            </div>
            {/*<div className="images">*/}
            {/*    {*/}
            {/*        allContent!.images.map((image: string, idm: number) => (*/}
            {/*            <img src={image} alt="" className="image" key={idm}/>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}
