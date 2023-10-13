import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Content} from "./components/content";
import useWebSocket, {ReadyState} from "react-use-websocket";

export const WebSocketAPI = () => {
    const [socketURL] = useState('wss://socket.voidedsky.net:9585/');
    const [messageHistory, setMessageHistory] = useState<any[]>([]);

    const { lastMessage, readyState } = useWebSocket(socketURL);

    const announcementContainerRef = useRef(null);

    useEffect(() => {
        document.title = 'Updates';
    }, []);

    useEffect(() => {
        if (lastMessage !== null) {
            const lastMessageData = JSON.parse(lastMessage.data);
            switch (lastMessageData.op){
                case 4:
                    setMessageHistory((prev) => prev.concat({content: lastMessageData.d.content, author: lastMessageData.d.author, date: lastMessageData.d.date, attachments: lastMessageData.d.attachments, id: lastMessageData.d.id}))
                    break;
                case 0:
                    lastMessageData.d.forEach((messageObject: {content: string, author: string, date: string, attachments: Array<string>, id: string}) => {
                        setMessageHistory((prev) => prev.concat(messageObject));
                    });
                    break;
                case 5:
                    const oldMessage = document.getElementById(lastMessageData.d.id);
                    if(oldMessage){
                        // @ts-ignore
                        oldMessage.querySelector("p").innerText = lastMessageData.d.content
                    }
                    break;
                case 6:
                    // @ts-ignore
                    document.getElementById(lastMessageData.d.id).remove();
                    break;
            }
        }
    }, [lastMessage, setMessageHistory]);

    useEffect(() => {
        const announcementContainer: any = announcementContainerRef.current;
        if (announcementContainer && announcementContainer.scrollHeight > 0) {
            announcementContainer.scrollTop = announcementContainer.scrollHeight;
        }
    }, [messageHistory]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Live',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Offline (Refresh)',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];


    return (
        <div className="bg-[#121212]">
            <div className="fixed bg-black w-full">
                <h1 className="text-green-700 top-3 relative text-center text-4xl">Israeli - Palestinian updates</h1>
                <p className="text-red-800 text-5xl top-2 relative inline-block">•</p><p className="text-red-800 text-left font-bold text-2xl inline-block">{connectionStatus}</p>
            </div>
            <div id="announcement-container" ref={announcementContainerRef}>
                {messageHistory.map((message, idx) => (
                    // <div className="announcement bg-green-50 border-8 border-amber-50" key={idx} id={message.id}>
                    //     <div className="header">
                    //         <h3 className="author">{message.author}:</h3>
                    //         <span className="timestamp">{format(message.date, "MM/dd HH:mm")}</span>
                    //     </div>
                    //
                    //     <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                    //     <div className="images">
                    //         {
                    //             message.attachments.map((image: string, idm: number) => (
                    //                 <img src={image} alt="" className="image" key={idm}/>
                    //             ))
                    //         }
                    //     </div>
                    // </div>
                    <Content announcement={message.content} images={message.attachments} author={message.author} timestamp={message.date} idx={idx} id={message.id}/>
                ))}
            </div>
        </div>
    );
}

function App() {

  return (
      <div className="App">
        <WebSocketAPI></WebSocketAPI>
      </div>
  );
}

export default App;
