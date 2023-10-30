import {Blog} from "./Blog";

export const BlogContainer = (
    props: {blogs: Array<{imageURL: string, title: string, description: string, likes: number, dislikes: number, timestamp: number, id: string}>}) => {
    return(
        <div id="blog-container">
            {props.blogs.map((value, idx) => (
                <Blog imageURL={value.imageURL} title={value.title} description={value.description} likes={value.likes} dislikes={value.dislikes} timestamp={value.timestamp} id={value.id} key={idx}></Blog>
            ))}
        </div>
    )
}
