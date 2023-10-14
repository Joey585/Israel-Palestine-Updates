import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import remarkGfm from "remark-gfm";
import { format } from 'date-fns';


import useWebSocket, {ReadyState} from "react-use-websocket";
import ReactMarkdown from 'react-markdown';

export const WebSocketAPI = () => {
    const [socketURL] = useState('ws://localhost:5000');
    const [messageHistory, setMessageHistory] = useState<any[]>([]);

    const { lastMessage, readyState } = useWebSocket(socketURL);

    const announcementContainerRef = useRef(null);

    useEffect(() => {
        if (lastMessage !== null) {
            const lastMessageData = JSON.parse(lastMessage.data);
            console.log(lastMessageData)
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
        <div>
            <h1>Israeli - Palestinian updates</h1>
            <p className="status">{connectionStatus}</p>
            <div id="announcement-container" ref={announcementContainerRef}>
                {messageHistory.map((message, idx) => (
                    <div className="announcement" key={idx} id={message.id}>
                        <div className="header">
                            <h3>{message.author}:</h3>
                            <span className="timestamp">{format(message.date, "MM/dd HH:mm")}</span>
                        </div>

                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                        <div className="images">
                            {
                                message.attachments.map((image: string, idm: number) => (
                                    <img src={image} alt="" className="image" key={idm}/>
                                ))
                            }
                        </div>
                    </div>
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
