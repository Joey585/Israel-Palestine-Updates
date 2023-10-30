import {format} from "date-fns";

export const Blog = (props: {imageURL: string, title: string, description: string, likes: number, dislikes: number, timestamp: number, id: string}) => {
    return(
        <div id={"blog-"+props.id} className="flex-row">
            <img src={props.imageURL} alt={props.title}/>
            <div className="blog-text flex-col">
                <p className="blog-title">{props.title}</p>
                <p className="blog-description">{props.description}</p>
            </div>
            <div className="end-section flex-col">
                <div className="timestamp-and-action">
                    <p className="blog-time">Created {format(props.timestamp, "MM/dd/yyyy at h:mm aaaa")}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="33" viewBox="0 0 9 33" fill="none" className="blog-actions">
                        <circle cx="4.5" cy="4.5" r="4.5" fill="#D9D9D9"/>
                        <circle cx="4.5" cy="16.5" r="4.5" fill="#D9D9D9"/>
                        <circle cx="4.5" cy="28.5" r="4.5" fill="#D9D9D9"/>
                    </svg>
                </div>
                <div className="likes-dislikes flex-row">
                    <div className="likes flex-row">
                        <img src="/assets/thumbs-up.png" alt="thumbs-up"/>
                        <span>{props.likes}</span>
                    </div>
                    <div className="dislikes flex-row">
                        <img src="/assets/thumbs-down.png" alt="thumbs-down"/>
                        <span>{props.dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
